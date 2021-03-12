import { useSelector, useDispatch, useStore  } from "react-redux";
import { useCallback } from "react";
import * as sel from "selectors";
import * as da from "actions/DexActions";

export const useDex = () => {
  const dispatch = useDispatch();
  const dexcActive = useSelector(sel.dexcActive);
  const dexcInit = useSelector(sel.dexcInit);
  const initDexcAttempt = useSelector(sel.initDexcAttempt);
  const registerDexcAttempt = useSelector(sel.registerDexcAttempt);
  const createWalletDexcAttempt = useSelector(sel.createWalletDexcAttempt);
  const loginDexcAttempt = useSelector(sel.loginDexcAttempt);
  const user = useSelector(sel.dexcUser);
  const loggedIn = useSelector(sel.loggedInDexc);
  const dexcAddr = useSelector(sel.dexcAddr);
  const dexcFee = useSelector(sel.dexcFee);

  const onInitDexc = useCallback(
    (passphrase) => dispatch(da.initDexc(passphrase)),
    [dispatch]
  );

  const onRegisterDexc = useCallback(
    (passphrase) => dispatch(da.registerDexc(passphrase)),
    [dispatch]
  );

  const onCreateWalletDexc = useCallback(
    (passphrase) => dispatch(da.createWalletDexc(passphrase)),
    [dispatch]
  );

  const onLoginDexc = useCallback(
    (passphrase) => dispatch(da.loginDexc(passphrase)),
    [dispatch]
  );

  return {
    dexcActive,
    dexcInit,
    onInitDexc,
    initDexcAttempt,
    onRegisterDexc,
    registerDexcAttempt,
    onCreateWalletDexc,
    createWalletDexcAttempt,
    onLoginDexc,
    loginDexcAttempt,
    user,
    loggedIn,
    dexcAddr,
    dexcFee
  };
};
