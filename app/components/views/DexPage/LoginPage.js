import { useDex } from "./hooks";
import { PassphraseModalButton } from "buttons";
import { FormattedMessage as T } from "react-intl";

const LoginPage = () => {
  const {
    onLoginDexc,
    loginAttempt
  } = useDex();

  return (
    <PassphraseModalButton
      disabled={loginAttempt}
      modalTitle={
        <T id="dex.initPassphrase" m="Enter Dexc App Passphrase" />
      }
      loading={loginAttempt}
      onSubmit={onLoginDexc}
      buttonLabel={<T id="dex.initPassphraseButton" m="Login" />}
    />
  );
};

export default LoginPage;