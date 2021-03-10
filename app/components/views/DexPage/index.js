import InitPage from "./InitPage";
import RegisterPage from "./RegisterPage";
//import DexView from "./DexView";
import { useDex } from "./hooks";
import { StandalonePage } from "layout";


const DexPage = () => {
  const { dexcActive, dexcInit } = useDex();
  console.log(dexcActive, dexcInit);
  return (
    <StandalonePage>
      {dexcActive && dexcInit ? 
        <RegisterPage/> : (
          dexcActive ?
          <InitPage/> :
          dfasdfsdf
        )
      }
    </StandalonePage>
  );
};

export default DexPage;
