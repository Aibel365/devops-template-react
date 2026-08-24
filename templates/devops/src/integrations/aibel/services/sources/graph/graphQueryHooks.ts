import { useQuery } from "@tanstack/react-query";
import { graphApi } from "./graphApi";

/**
 * gets photo using msal graph api
 * @param username if this is blank we will not call api
 * @param size
 * @returns
 */
export function useQueryGraphPhotoMe(username = "") {
    return useQuery<string>({
        queryKey: ["graph/photo/" + username],
        queryFn: () => {
            // since we call this outside authenticated router
            // we want to skip calling backend if there is not username
            if (!username) {
                return "";
            }

            return graphApi.getPhoto();
        }
    });
}
