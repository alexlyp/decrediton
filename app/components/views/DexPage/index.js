
import RegisterPage from "./RegisterPage";
//import DexView from "./DexView";
import { useDex } from "./hooks";
import { StandalonePage, StandaloneHeader } from "layout";
import { CreateWalletPageContent, CreateWalletPageHeader } from "./CreateWalletPage";
import { InitPageContent, InitPageHeader } from "./InitPage";
import { LoginPageContent, LoginPageHeader } from "./LoginPage";


const DexPage = () => {
  let Page, Header;
  const { 
    dexcActive,
    dexcInit,
    loggedIn
  } = useDex();
  if (dexcActive) {
    if (dexcInit) {
      if (!loggedIn) {
        Page = <LoginPageContent />;
        Header = <LoginPageHeader />;
      } else {
        // Some wallet created check?
        Page = <CreateWalletPageContent />;
        Header = <CreateWalletPageHeader />;
        // else RegisterPage
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

export const DexViewHeader = () => (
  <StandaloneHeader
    title={<T id="dex.createWallet.title" m="Dex" />}
    iconType={LN_ICON}
  />
);

export default DexPage;
