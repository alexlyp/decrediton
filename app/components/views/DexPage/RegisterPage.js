import { useDex } from "./hooks";
import { PassphraseModalButton } from "buttons";
import { StandaloneHeader } from "layout";
import { FormattedMessage as T } from "react-intl";
import { LN_ICON } from "constants";
import "style/ConnectPage.css";

export const RegisterPageContent = () => {
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

export const RegisterPageHeader = () => (
  <StandaloneHeader
    title={<T id="dex.loginPage.title" m="DEX Server Payment" />}
    description={
      <T
        id="dex.loginPage.description"
        m={"Register your wallet with the DEX Server"}
      />
    }
    iconType={LN_ICON}
  />
);
