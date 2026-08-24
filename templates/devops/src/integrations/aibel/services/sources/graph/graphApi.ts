import { graphClient } from "../../client/graphClient";

export const graphApi = {
    getPhoto(): Promise<string> {
        return new Promise((resolve, reject) => {
            try {
                graphClient
                    .get<Blob>(`me/photo/$value`, {
                        responseType: "blob"
                    })
                    .then((result) => {
                        const reader = new FileReader();
                        reader.onload = function () {
                            resolve(this.result as string);
                        };
                        reader.readAsDataURL(result.data);
                    });
            } catch (e) {
                reject(e);
            }
        });
    }
};
