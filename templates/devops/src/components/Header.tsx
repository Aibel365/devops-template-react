import { getMsalInstance } from "#/integrations/aibel/services/auth";
import { useQueryGraphPhotoMe } from "#/integrations/aibel/services/sources/graph/graphQueryHooks";
import { HeaderBar } from "@aibel365/devops-designsystem";
import { useAccount } from "@azure/msal-react";

export const Header = ({ title }: { title?: string }) => {
    const account = useAccount();
    const username = account?.name;
    const userEmail = account?.username;
    const { data } = useQueryGraphPhotoMe(userEmail);

    const onLogOut = async () => {
        const instance = await getMsalInstance();
        if (instance) {
            await instance.logoutRedirect({ account });
        }
    };

    return (
        <header>
            <HeaderBar
                handleLogout={onLogOut}
                title={title}
                userImage={data}
                userName={username}
                userEmail={userEmail}
            />
        </header>
    );
};
