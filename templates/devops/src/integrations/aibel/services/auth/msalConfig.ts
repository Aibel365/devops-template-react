import type { Configuration, RedirectRequest } from "@azure/msal-browser";
import type { NitroRuntimeConfig } from "nitro/types";

// Config object to be passed to Msal on creation
export const msalConfig = (config: NitroRuntimeConfig): Configuration => {
    return {
        auth: {
            clientId: config.CLIENT_ID,
            authority: `https://login.microsoftonline.com/${config.TENANT_ID}`,
            redirectUri: "/",
            postLogoutRedirectUri: "/"
        },
        cache: {
            // depends if you need to share between tabs,
            // if you have iframe and need to open new window, then you want local storage
            // cacheLocation: BrowserCacheLocation.LocalStorage // BrowserCacheLocation.SessionStorage // "sessionStorage"
        }
    };
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const apiRequest = (config: NitroRuntimeConfig): RedirectRequest => {
    return {
        scopes: [`api://${config.API_CLIENT_ID}/access_as_user`]
    };
};
