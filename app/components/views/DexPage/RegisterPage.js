import { useDex } from "./hooks";
import { PassphraseModalButton } from "buttons";
import { FormattedMessage as T } from "react-intl";

const RegisterPage = () => {
  const {
    onRegisterDexc,
    registerDexcAttempt
  } = useDex();

  return (
    <PassphraseModalButton
      disabled={registerDexcAttempt}
      modalTitle={
        <T id="dex.initPassphrase" m="Register new wallet" />
      }
      loading={registerDexcAttempt}
      onSubmit={onRegisterDexc}
      buttonLabel={<T id="dex.initPassphraseButton" m="Register" />}
    />
  );
};

export default RegisterPage;