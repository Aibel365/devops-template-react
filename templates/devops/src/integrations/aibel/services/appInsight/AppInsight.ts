import type { PublicClientApplication } from "@azure/msal-browser";
import type { ICustomProperties } from "@microsoft/applicationinsights-web";
import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import type { NitroRuntimeConfig } from "nitro/types";

let ai: ApplicationInsights | undefined;

export async function initApplicationInsight(msalInstance: PublicClientApplication | undefined, config: NitroRuntimeConfig) {
    try {
        if (!msalInstance) return config;

        const account = msalInstance.getActiveAccount();
        if (!account) return config;

        if (config.AZURE_APP_INSIGHT && account.localAccountId) {
            const $appInsights = new ApplicationInsights({
                config: {
                    connectionString: config.AZURE_APP_INSIGHT,
                    enableResponseHeaderTracking: true,
                    enableAjaxErrorStatusText: true,
                    enableUnhandledPromiseRejectionTracking: true,
                    enableAutoRouteTracking: true
                }
            });

            $appInsights.loadAppInsights();
            $appInsights.trackPageView();
            // so we dont get wrong user count..
            $appInsights.setAuthenticatedUserContext(account.localAccountId);
            $appInsights.addTelemetryInitializer((ctx) => {
                if (ctx.tags) {
                    ctx.tags["ai.cloud.role"] = location.host;
                }
            });
            ai = $appInsights;
        } else {
            console.error("Missing insight config");
        }
    } catch (err) {
        console.error("ApplicationInsight", err);
    }
}

export const appInsights = {
    trackException: (props: { exception: Error; customProperties?: ICustomProperties }) => {
        try {
            if (ai) {
                ai.appInsights.trackException(props);
            } else {
                console.info("ApplicationInsight not initialized - trackException error:", props);
            }
        } catch (e) {
            console.error("ApplicationInsight", e);
        }
    },
    trackEvent: (props: { name: string; properties: { [key: string]: string } }) => {
        try {
            if (ai) {
                ai.appInsights.trackEvent(props);
            } else {
                console.info("ApplicationInsight not initialized - trackEvent");
            }
        } catch (e) {
            console.error("ApplicationInsight", e);
        }
    }
};
