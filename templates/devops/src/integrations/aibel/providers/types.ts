/** Local storage key used to persist decoded user information from JWT payload. */
export const USER_LS_VALUE = "USER_LS_VALUE";
/** Local storage key reserved for persisted auth/environment config values. */
export const CONFIG_LS_VALUE = "CONFIG_LS_VALUE";
/** Local storage key used to persist user profile photo from Microsoft Graph. */
export const USER_IMAGE_LS_VALUE = "USER_IMAGE_LS_VALUE";

/**
 * Configuration values used by MSAL and related provider integrations.
 */
export interface MsalConfiguration {
    CLIENT_ID?: string;
    TENANT_ID?: string;
    API_CLIENT_ID?: string;
    APP_INSIGHT?: string;
    OCP_APIM_SUBSCRIPTION_KEY?: string;
    API_VERSION: string;
}

/** User information decoded from JWT payload and persisted to local storage. */
export interface UserData {
    id: string;
    name: string;
    employeeId: string | undefined;
    email: string;
    ofsName: string | undefined;
}
