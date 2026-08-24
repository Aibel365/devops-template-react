import type { AuthenticationResult, AuthError, PublicClientApplication, RedirectRequest, SilentRequest } from "@azure/msal-browser";
import { communicationFailedMiddleware } from "../client/interceptors/communicationFailedMiddleware";

const GRAPH_ERROR_COUNT_STORAGE_KEY = "graph-error-count";

export async function getTokenResponse(msalInstance: PublicClientApplication, acquireTokenSilent: SilentRequest, acquireTokenRedirect?: RedirectRequest) {
    return await msalInstance
        .acquireTokenSilent(acquireTokenSilent)
        .then(function (accessTokenResponse: AuthenticationResult) {
            // reset error counter
            localStorage.setItem(GRAPH_ERROR_COUNT_STORAGE_KEY, "0");

            // Acquire token silent success
            return accessTokenResponse;
        })
        .catch((err: AuthError) => {
            // we need to count/check how many times we get errors
            // just incase we are in a endless loop
            // reason for this is usaually when requesting scope that does not exist
            // easy way to test this is to go into graphClient and add a letter to .default
            const errorRetries = parseInt(localStorage.getItem(GRAPH_ERROR_COUNT_STORAGE_KEY) || "0");
            if (errorRetries > 1) {
                // reset error counter
                localStorage.setItem(GRAPH_ERROR_COUNT_STORAGE_KEY, "0");

                // log to console so user/devloper can see whats wrong
                console.error(err);
                console.error("Looks like we are in a endless loop, check your msal config");

                communicationFailedMiddleware(err);
                return;
            } else {
                localStorage.setItem(GRAPH_ERROR_COUNT_STORAGE_KEY, (errorRetries + 1).toString());
            }

            if (err.errorCode === "invalid_grant" || err.errorCode === "interaction_required") {
                // needed if not requesting default like "ChatMessage.Send,Chat.ReadWrite"
                // atm the permissions above requires somehow additional admin concent even though the permissions should need it...

                msalInstance.acquireTokenRedirect(acquireTokenRedirect || acquireTokenSilent);
                return;
            }

            if (err.errorCode === "no_tokens_found") {
                // this will most likely happen to a new app service
                msalInstance.loginRedirect();
                return;
            }

            // this will happend if somethig like API scope is wrong
            // show error dialog/print error so its easier to debug
            // easy way to test this is to just set scope in .env to something wrong
            console.error(err);
            communicationFailedMiddleware(err);
        });
}
