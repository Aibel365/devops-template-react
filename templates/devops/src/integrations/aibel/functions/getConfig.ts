import { createServerFn } from "@tanstack/react-start";
import { useRuntimeConfig } from "nitro/runtime-config";

export const getPublicConfig = createServerFn({ method: "GET" }).handler(async () => {
    // This runs strictly on the server
    const config = useRuntimeConfig();
    return config.aibelEnvReactApp;
});
