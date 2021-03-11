import { useDex } from "./hooks";
import { PassphraseModalButton } from "buttons";
import { StandalonePage } from "layout";
import { FormattedMessage as T } from "react-intl";

const RegisterPage = () => {
  const {
    onRegisterDexc,
    registerDexcAttempt
  } = useDex();

  return (
    <StandalonePage>
      <PassphraseModalButton
        disabled={registerDexcAttempt}
        modalTitle={
          <T id="dex.initPassphrase" m="Register new wallet" />
        }
        loading={registerDexcAttempt}
        onSubmit={onRegisterDexc}
        buttonLabel={<T id="dex.initPassphraseButton" m="Register" />}
      />
    </StandalonePage>
  );
};

export default RegisterPage;