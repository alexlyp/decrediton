import DexConnectPage from "./ConnectPage";
import DexPage from "./DexPage";
import { useDex } from "./hooks";


const Dex = () => {
  const { dexcActive, dexcInit } = useDex();
  return (
    <StandalonePageBody>
      {dexcActive && dexcInit ? 
        <DexPage/> : (
          dexcActive ?
          <DexConnectPage/> :
          dfasdfsdf
        )
      }
    </StandalonePageBody>
  );
};

export default Dex;
