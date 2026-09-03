import "i18next";
import type globalEn from "./en/global.json";

// Strongly typed locales: https://www.i18next.com/overview/typescript
declare module "i18next" {
    interface CustomTypeOptions {
        returnNull: false;
        resources: {
            global: typeof globalEn;
        };
    }
}
