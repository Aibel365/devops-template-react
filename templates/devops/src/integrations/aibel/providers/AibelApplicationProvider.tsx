import type { IPublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import type { NitroRuntimeConfig } from "nitro/types";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { initApplicationInsight } from "../services/appInsight/AppInsight";
import { getMsalInstance } from "../services/auth";
import { initApiClient } from "../services/client/apiClient";

/**
 * Root application provider for authentication, data fetching, and routing.
 *
 * Responsibilities:
 * - Persist incoming environment/auth config to local storage.
 * - Initialize MSAL instance and Application Insights on mount.
 * - Provide `MsalProvider` and `QueryClientProvider` once MSAL is ready.
 * - Optionally render an authenticated router when routes are provided.
 *
 * Render behavior:
 * - The provider tree is rendered only after MSAL initialization completes.
 * - `children` are rendered inside the auth/query provider context.
 * - Route rendering is optional and only enabled when `routes` has entries.
 */
export const AibelApplicationProvider = ({ children, config }: { children: ReactNode; config: NitroRuntimeConfig }) => {
    const [pca, setPca] = useState<IPublicClientApplication | undefined>(undefined);

    useEffect(() => {
        getMsalInstance(config).then((msalInstance) => {
            initApplicationInsight(msalInstance, config).then(() => {
                initApiClient(config);
                setPca(msalInstance);
            });
        });
    }, [pca]);

    return <>{pca && <MsalProvider instance={pca}>{children}</MsalProvider>}</>;
};
