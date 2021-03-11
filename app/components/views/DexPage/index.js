import InitPage from "./InitPage";
//import RegisterPage from "./RegisterPage";
//import DexView from "./DexView";
import { useDex } from "./hooks";
import { StandalonePage } from "layout";
import CreateWalletPage from "./CreateWalletPage";
import LoginPage from "./LoginPage";


const DexPage = () => {
  const { dexcActive, dexcInit } = useDex();
  console.log(dexcActive, dexcInit);
  return (
    <StandalonePage>
      {dexcActive && dexcInit ? 
        <LoginPage/> : (
          dexcActive ?
          <InitPage/> :
          dfasdfsdf
        )
      }
    </StandalonePage>
  );
};

export default DexPage;
