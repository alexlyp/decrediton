import { useDex } from "./hooks";
import { PassphraseModalButton } from "buttons";
import { StandalonePage } from "layout";
import { FormattedMessage as T } from "react-intl";

const LoginPage = () => {
  const {
    onLoginDexc,
    loginAttempt
  } = useDex();

  return (
    <StandalonePage>
      <PassphraseModalButton
        disabled={loginAttempt}
        modalTitle={
          <T id="dex.initPassphrase" m="Enter Dexc App Passphrase" />
        }
        loading={loginAttempt}
        onSubmit={onLoginDexc}
        buttonLabel={<T id="dex.initPassphraseButton" m="Login" />}
      />
    </StandalonePage>
  );
};

export default LoginPage;