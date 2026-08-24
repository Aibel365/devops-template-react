import type { AxiosInstance } from "axios";
import axios from "axios";
import type { NitroRuntimeConfig } from "nitro/types";
import { apiRequest } from "../auth";
import { injectBearerTokenMiddleware } from "./interceptors/injectBearerTokenMiddleware";

let apiClientInstance: AxiosInstance | undefined;

export const initApiClient = (config: NitroRuntimeConfig) => {
    if (!apiClientInstance) {
        apiClientInstance = axios.create({
            baseURL: config.API_BASE_URL,
            headers: { patch: { "content-type": "application/json-patch+json" } }
        });
        apiClientInstance.interceptors.request.use((e) => injectBearerTokenMiddleware(e, apiRequest(config)));
    }
};

export const apiClient = () => apiClientInstance;
