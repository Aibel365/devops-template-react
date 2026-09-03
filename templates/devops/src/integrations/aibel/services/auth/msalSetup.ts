import type { AuthenticationResult, EventMessage } from "@azure/msal-browser";
import { EventType, PublicClientApplication } from "@azure/msal-browser";
import type { NitroRuntimeConfig } from "nitro/types";
import { getTokenResponse } from "./getTokenResponse";
import { apiRequest, msalConfig } from "./msalConfig";

let msalInstance: PublicClientApplication | undefined;

export async function getMsalInstance(config?: NitroRuntimeConfig) {
    if (msalInstance) {
        return msalInstance;
    }

    if (!config) {
        console.error("no config");
        return;
    }

    // check if we are missing expected env, so dev see it faster...

    let missing_expected_env = false;

    if (!config.API_BASE_URL || config.API_BASE_URL === "xyz") {
        console.error("missing API_BASE_URL");
        missing_expected_env = true;
    }

    if (!config.API_CLIENT_ID || config.API_CLIENT_ID === "xyz") {
        console.error("missing API_CLIENT_ID");
        missing_expected_env = true;
    }
    if (!config.CLIENT_ID || config.CLIENT_ID === "xyz") {
        console.error("missing CLIENT_ID");
        missing_expected_env = true;
    }
    if (!config.TENANT_ID || config.TENANT_ID === "xyz") {
        console.error("missing TENANT_ID");
        missing_expected_env = true;
    }

    if (missing_expected_env) {
        return;
    }

    msalInstance = new PublicClientApplication(msalConfig(config));
    await msalInstance.initialize();

    msalInstance.addEventCallback((event: EventMessage) => {
        if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
            const payload = event.payload as AuthenticationResult;
            const account = payload.account;

            msalInstance!.setActiveAccount(account);
        }

        // so we set correct account when switching..
        if (event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS && event.payload) {
            const payload = event.payload as AuthenticationResult;
            const account = payload.account;

            msalInstance!.setActiveAccount(account);
        }
    });

    await msalInstance.handleRedirectPromise().then(async (response) => {
        if (!response) {
            const account = msalInstance?.getActiveAccount();
            if (account && msalInstance) {
                const tokenResponse = await getTokenResponse(
                    msalInstance,
                    {
                        ...apiRequest(config),
                        ...account,
                        forceRefresh: true
                    },
                    apiRequest(config)
                );
                return tokenResponse;
            } else {
                await msalInstance?.loginRedirect(apiRequest(config));
            }
        }
    });

    const account = msalInstance.getActiveAccount();

    if (account) {
        msalInstance.setActiveAccount(account);
    }

    return msalInstance;
}
