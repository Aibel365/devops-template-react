import type { RedirectRequest } from "@azure/msal-browser";
import axios from "axios";
import { injectBearerTokenMiddleware } from "./interceptors/injectBearerTokenMiddleware";

const graphRequest: RedirectRequest = {
    scopes: [`https://graph.microsoft.com/.default`]
};

export const graphClient = axios.create({
    baseURL: "https://graph.microsoft.com/v1.0"
});

graphClient.interceptors.request.use((e) => injectBearerTokenMiddleware(e, graphRequest));
