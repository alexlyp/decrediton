import InitPage from "./InitPage";
import RegisterPage from "./RegisterPage";
//import DexView from "./DexView";
import { useDex } from "./hooks";
import { StandalonePage } from "layout";
import CreateWalletPage from "./CreateWalletPage";
import LoginPage from "./LoginPage";


const DexPage = () => {
  const { 
    dexcActive,
    dexcInit,
    loggedIn
  } = useDex();
  if (dexcActive) {
    if (dexcInit) {
      if (!loggedIn) {
        return <LoginPage/>;
      } else {
        // Some wallet created check?
        return <CreateWalletPage/>;
        // else RegisterPage
      }
    } else {
      return <InitPage/>;
    }
  } else {
    <StandalonePage>
      ERROR! DEXC NOT RUNNING
    </StandalonePage>
  }
};

export default DexPage;
