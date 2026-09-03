import * as i18n from "i18next";
import { initReactI18next } from "react-i18next";
import globalEn from "./en/global.json";
import globalNo from "./no/global.json";

const resources = {
    en: {
        global: globalEn
    },
    no: {
        global: globalNo
    }
} as const;

i18n.use(initReactI18next).init({
    debug: import.meta.env.DEV,
    fallbackLng: "en",
    resources: resources,
    returnNull: false
});

export default i18n;
