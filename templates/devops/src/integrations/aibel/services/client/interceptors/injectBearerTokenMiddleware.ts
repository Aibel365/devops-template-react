import type { RedirectRequest } from "@azure/msal-browser";
import type { InternalAxiosRequestConfig } from "axios";
import { getMsalInstance, getTokenResponse } from "../../auth";

/**
 * This middleware checks if there's an access token available in local storage,
 * and appends it to the request headers if available.
 *
 * @param config
 */
export async function injectBearerTokenMiddleware(config: InternalAxiosRequestConfig, request: RedirectRequest) {
    const msalInstance = await getMsalInstance();

    if (!msalInstance) return config;

    const account = msalInstance.getActiveAccount();
    if (!account) return config;

    const response = await getTokenResponse(msalInstance, { ...request, account });

    if (response == null) return config;

    if (response.accessToken) {
        config.headers["Authorization"] = `Bearer ${response.accessToken}`;
    }

    return config;
}
