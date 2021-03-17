
import { RegisterPageContent, RegisterPageHeader } from "./RegisterPage";
import { ConnectExchangePageContent, ConnectExchangePageHeader } from "./ConnectExchangePage";
import { DexViewContent, DexViewHeader } from "./DexView";
import { useDex } from "./hooks";
import { StandalonePage, StandaloneHeader } from "layout";
import { CreateWalletPageContent, CreateWalletPageHeader } from "./CreateWalletPage";
import { EnablePageContent, EnablePageHeader } from "./EnablePage";
import { InitPageContent, InitPageHeader } from "./InitPage";
import { LoginPageContent, LoginPageHeader } from "./LoginPage";


const DexPage = () => {
  let Page, Header;
  const { 
    dexcActive,
    dexcInit,
    loggedIn,
    dexcAddr,
    dexcFee,
    dexRegistered,
    dexDCRWalletRunning,
    dexcEnabled,
    dexConnected,
    user
  } = useDex();
  if (!dexcEnabled) {
    Page = <EnablePageContent />;
    Header = <EnablePageHeader />;
  } else if (dexcActive) {
    if (dexcInit) {
      if (!loggedIn) {
        Page = <LoginPageContent />;
        Header = <LoginPageHeader />;
      } else {
        if (dexRegistered && dexDCRWalletRunning) {
          Page = <DexViewContent />;
          Header = <DexViewHeader />;
        } else if (dexDCRWalletRunning) {
          Page = <RegisterPageContent/>;
          Header = <RegisterPageHeader />;
        } else if (!dexDCRWalletRunning) {
          Page = <CreateWalletPageContent />;
          Header = <CreateWalletPageHeader />;
        }
      }
    } else {
      Page = <InitPageContent />;
      Header = <InitPageHeader />;
    }
  } else {
    Page = <div>ERROR! DEXC NOT RUNNING</div>;
    Header =  <ErrorHeader />; 
  }
  return (
    <StandalonePage header={Header}>
      {Page}
    </StandalonePage>
  );

};

const ErrorHeader = () => {
  <StandaloneHeader
    title={<T id="dex.error.title" m="Dexc Error" />}
    description={
      <T
        id="dex.error.description"
        m={"Dex not running"}
      />
    }
    iconType={LN_ICON}
  />
};

export default DexPage;
