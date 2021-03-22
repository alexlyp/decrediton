import { useDex } from "./hooks";
import { PassphraseModalButton } from "buttons";
import { StandaloneHeader } from "layout";
import { FormattedMessage as T } from "react-intl";
import { LN_ICON } from "constants";
import "style/ConnectPage.css";

export const ConnectExchangePageContent = () => {
  const { onRegisterDexc, registerDexcAttempt } = useDex();

  return <div>EXCHANGE NOT CONNECTED... AWAITING FURTHER INSTRUCTIONS</div>;
};

export const ConnectExchangePageHeader = () => (
  <StandaloneHeader
    title={<T id="dex.loginPage.title" m="DEX Server not connected" />}
    description={
      <T
        id="dex.loginPage.description"
        m={"Please try to connect to the DEX Server again"}
      />
    }
    iconType={LN_ICON}
  />
);
