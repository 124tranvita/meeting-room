import { FC, useCallback } from "react";
import { useMsal } from "@azure/msal-react";
import { IPublicClientApplication } from "@azure/msal-browser";
import { Button } from "../../common/components";

const SignInButton: FC = () => {
  const { instance } = useMsal();

  const signInClickHandler = useCallback(
    (instance: IPublicClientApplication) => {
      instance.loginRedirect();
    },
    []
  );
  return (
    <>
      <Button
        type="submit"
        label="Sign In"
        variant="primary"
        onClick={() => signInClickHandler(instance)}
      />
    </>
  );
};

export default SignInButton;
