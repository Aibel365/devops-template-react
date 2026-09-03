import { Alert } from "@aibel365/devops-designsystem";
import axios from "axios";
import i18next from "i18next";

export function communicationFailedMiddleware(error: any) {
    if ((axios.isAxiosError(error) && error.code === "ERR_NETWORK") || error.code === "ERR_CANCELED") {
        console.error({
            title: i18next.t("global:noConnectionDialog.title"),
            description: i18next.t("global:noConnectionDialog.description"),
            content: <Alert data-color="warning">{i18next.t("global:noConnectionDialog.content")}</Alert>
        });
    }

    // msal issue, will happend if you type in wrong scope and end up in endless loop
    if (error.errorCode) {
        console.error({
            title: i18next.t("global:clientError.title"),
            description: i18next.t("global:clientError.status") + " (MSAL)",
            content: <Alert data-color="danger">{i18next.t("global:clientError.subtitle")}</Alert>
        });
    }
}
