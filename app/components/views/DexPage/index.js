import DexConnectPage from "./ConnectPage";
import DexView from "./DexView";
import { useDex } from "./hooks";
import { StandalonePage } from "layout";


const DexPage = () => {
  const { dexcActive, dexcInit } = useDex();
  console.log(dexcActive, dexcInit);
  return (
    <StandalonePage>
      {dexcActive && dexcInit ? 
        <DexView/> : (
          dexcActive ?
          <DexConnectPage/> :
          dfasdfsdf
        )
      }
    </StandalonePage>
  );
};

export default DexPage;
