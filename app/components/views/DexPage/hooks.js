import { useSelector, useDispatch, useStore } from "react-redux";
import { useCallback } from "react";
import * as sel from "selectors";
import * as da from "actions/DexActions";

export const useDex = () => {
  const dispatch = useDispatch();
  const dexcEnabled = useSelector(sel.dexcEnabled);
  const dexcActive = useSelector(sel.dexcActive);
  const dexcInit = useSelector(sel.dexcInit);
  const initDexcAttempt = useSelector(sel.initDexcAttempt);
  const registerDexcAttempt = useSelector(sel.registerDexcAttempt);
  const createWalletDexcAttempt = useSelector(sel.createWalletDexcAttempt);
  const loginDexcAttempt = useSelector(sel.loginDexcAttempt);
  const loggedIn = useSelector(sel.loggedInDexc);
  const dexcAddr = useSelector(sel.dexcAddr);
  const dexcFee = useSelector(sel.dexcFee);
  const dexRegistered = useSelector(sel.dexRegistered);
  const dexConnected = useSelector(sel.dexcConnected);
  const dexDCRWalletRunning = useSelector(sel.dexDCRWalletRunning);
  const dexBTCWalletRunning = useSelector(sel.dexBTCWalletRunning);
  const user = useSelector(sel.dexcUser);
  const enableDexAttempt = useSelector(sel.enableDexAttempt);
  const dexAccount = useSelector(sel.dexAccount);
  const dexAccountAttempt = useSelector(sel.dexAccountAttempt);
  const defaultServerAddress = useSelector(sel.defaultDEXServer);

  const onLaunchDexWindow = useCallback(() => dispatch(da.launchDexcWindow()), [
    dispatch
  ]);

  const onInitDexc = useCallback(
    (passphrase) => dispatch(da.initDexc(passphrase)),
    [dispatch]
  );

  const onRegisterDexc = useCallback(
    (passphrase) => dispatch(da.registerDexc(passphrase)),
    [dispatch]
  );

  const onCreateWalletDexc = useCallback(
    (passphrase, appPassphrase, account) =>
      dispatch(da.createWalletDexc(passphrase, appPassphrase, account)),
    [dispatch]
  );

  const onBTCCreateWalletDexc = useCallback(
    (passphrase, appPassphrase, walletname) =>
      dispatch(da.btcCreateWalletDexc(passphrase, appPassphrase, walletname)),
    [dispatch]
  );

  const onUpdateBTCConfig = useCallback(
    (rpcuser, rpcpassword, rpcport, rpcbind) =>
      dispatch(da.updateBTCConfig(rpcuser, rpcpassword, rpcport, rpcbind)),
    [dispatch]
  );

  const onCheckBTCConfig = useCallback(
    (fileLocation) => dispatch(da.checkBTCConfig(fileLocation)),
    [dispatch]
  );

  const onLoginDexc = useCallback(
    (passphrase) => dispatch(da.loginDexc(passphrase)),
    [dispatch]
  );

  const onCreateDexAccount = useCallback(
    (passphrase, name) => dispatch(da.createDexAccount(passphrase, name)),
    [dispatch]
  );

  const onEnableDexc = useCallback(() => dispatch(da.enableDexc()), [dispatch]);

  const onGetFee = useCallback((address) => dispatch(da.getFeeDexc(address)), [
    dispatch
  ]);

  return {
    dexcEnabled,
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
    loggedIn,
    dexcAddr,
    dexcFee,
    dexRegistered,
    dexConnected,
    dexDCRWalletRunning,
    dexBTCWalletRunning,
    onEnableDexc,
    enableDexAttempt,
    onGetFee,
    user,
    onLaunchDexWindow,
    onCheckBTCConfig,
    onUpdateBTCConfig,
    onBTCCreateWalletDexc,
    onCreateDexAccount,
    dexAccount,
    dexAccountAttempt,
    defaultServerAddress
  };
};
