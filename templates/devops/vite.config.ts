import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import dns from "node:dns";
import { defineConfig } from "vite";

dns.setDefaultResultOrder("verbatim");

const config = defineConfig({
    resolve: { tsconfigPaths: true },
    plugins: [devtools(), nitro({ rollupConfig: { external: [/^@sentry\//] } }), tailwindcss(), tanstackStart(), viteReact()],
    nitro: {
        runtimeConfig: {
            aibelEnvReactApp: {
                API_BASE_URL: "http://localhost:5002/v1",
                API_SCOPE: "",
                API_CLIENT_ID: "f6435aff-53cf-4c7b-a68c-6be77bf628b2",
                CLIENT_ID: "fbf32816-d74c-4b3b-805c-469aee84ce43",
                TENANT_ID: "306bb27f-a230-403b-a436-2e5cd45b8ec0",
                DEVEXTREME_LICENSE: "",
                OCP_APIM_SUBSCRIPTION_KEY: "",
                API_VERSION: "v1",
                AZURE_APP_INSIGHT:
                    "InstrumentationKey=45090e3d-0e6a-4e7d-94c3-711ade3ef74d;IngestionEndpoint=https://westeurope-5.in.applicationinsights.azure.com/;LiveEndpoint=https://westeurope.livediagnostics.monitor.azure.com/;ApplicationId=9947581d-81d2-42d8-9e02-2be14cb319fe",
                DISPLAY_NAME: "Aibel"
            }
        }
    }
});

export default config;
