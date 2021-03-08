import { useSelector } from "react-redux";
import * as sel from "selectors";
import * as da from "actions/DexActions";

export const useDex = () => {
  const dexcActive = useSelector(sel.dexcActive);
  const dexcInit = useSelector(sel.dexcInit);
  const initDexcAttempt = useSelector(sel.initDexcAttempt);

  const onInitDexc = useCallback(
    (passphrase) => dispatch(da.initDexc(passphrase)),
    [dispatch]
  );

  return {
    dexcActive,
    dexcInit,
    onInitDexc,
    initDexcAttempt
  };
};
