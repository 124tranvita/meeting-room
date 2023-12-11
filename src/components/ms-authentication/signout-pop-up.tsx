import { FC, useCallback } from "react";
import { useMsal } from "@azure/msal-react";
import { IPublicClientApplication } from "@azure/msal-browser";
import { Button } from "../../common/components";

const SignOutButton: FC = () => {
  // useMsal hook will return the PublicClientApplication instance you provided to MsalProvider
  const { accounts, instance } = useMsal();
  const homeAccountId = accounts[0].homeAccountId;

  const signOutClickHandler = useCallback(
    (instance: IPublicClientApplication) => {
      const logoutRequest = {
        account: instance.getAccountByHomeId(homeAccountId),
        mainWindowRedirectUri: "your_app_main_window_redirect_uri",
        postLogoutRedirectUri: "your_app_logout_redirect_uri",
      };
      instance.logoutPopup(logoutRequest);
    },
    [homeAccountId]
  );

  return (
    <>
      <Button
        type="submit"
        label="Sign Out"
        variant="primary"
        onClick={() => signOutClickHandler(instance)}
      />
    </>
  );
};

export default SignOutButton;
