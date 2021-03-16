import * as sel from "selectors";
import { ipcRenderer } from "electron";
import { getWalletPath } from "main_dev/paths";
import {
  addAllowedExternalRequest
} from "./SettingsActions";
import { EXTERNALREQUEST_DEXC } from "main_dev/externalRequests";
import * as configConstants from "constants/config";

export const DEXC_ENABLE_ATTEMPT = "DEXC_ENABLE_ATTEMPT";
export const DEXC_ENABLE_FAILED = "DEXC_ENABLE_FAILED";
export const DEXC_ENABLE_SUCCESS = "DEXC_ENABLE_SUCCESS";

export const enableDexc = () => (dispatch, getState) => {
  dispatch({ type: DEXC_ENABLE_ATTEMPT });
  const {daemon: { walletName }} = getState();

  try {
    walletConfig.set(configConstants.ENABLE_DEX, true);
    dispatch(addAllowedExternalRequest(EXTERNALREQUEST_DEXC));
    dispatch({ type: DEXC_ENABLE_SUCCESS });
    dispatch(closeWalletRequest());
  } catch (error) {
    dispatch({ type: DEXC_ENABLE_FAILED, error });
    return;
  }
};

export const DEXC_STARTUP_ATTEMPT = "DEXC_STARTUP_ATTEMPT";
export const DEXC_STARTUP_FAILED = "DEXC_STARTUP_FAILED";
export const DEXC_STARTUP_SUCCESS = "DEXC_STARTUP_SUCCESS";

export const startDexc = () => (dispatch, getState) => {
  dispatch({ type: DEXC_STARTUP_ATTEMPT });
  const isTestnet = sel.isTestNet(getState());
  const {
    daemon: { walletName }
  } = getState();
  const walletPath = getWalletPath(isTestnet, walletName);

  try {
    const res = ipcRenderer.sendSync(
      "start-dexc",
      walletPath,
      isTestnet
    );
    if (typeof res === "string" || res instanceof Error) {
      throw res;
    }
    dispatch({ type: DEXC_STARTUP_SUCCESS });
    dispatch(dexcCheckInit());
  } catch (error) {
    dispatch({ type: DEXC_STARTUP_FAILED, error });
    return;
  }
};

export const DEXC_CHECKINIT_ATTEMPT = "DEXC_CHECKINIT_ATTEMPT";
export const DEXC_CHECKINIT_FAILED = "DEXC_CHECKINIT_FAILED";
export const DEXC_CHECKINIT_SUCCESS = "DEXC_CHECKINIT_SUCCESS";

export const dexcCheckInit = () => (dispatch, getState) => {
  dispatch({ type: DEXC_CHECKINIT_ATTEMPT });
  try {
    let res = ipcRenderer.sendSync("check-init-dexc");
    if (res instanceof Error) {
      throw res;
    }
    if ( typeof res === "string" ) {
      res = res == "true" ? true : false;
    }
    dispatch({ type: DEXC_CHECKINIT_SUCCESS, res });
  } catch (error) {
    dispatch({ type: DEXC_CHECKINIT_FAILED, error });
    return;
  }
}


export const DEXC_STOPPED = "DEXC_STOPPED";

export const stopDexc = () => (dispatch, getState) => {
  if (!sel.dexcActive(getState())) {
    return;
  }

  ipcRenderer.send("stop-dexc");
  dispatch({ type: DEXC_STOPPED });
};

export const DEXC_INIT_ATTEMPT = "DEXC_INIT_ATTEMPT";
export const DEXC_INIT_SUCCESS = "DEXC_INIT_SUCCESS";
export const DEXC_INIT_FAILED = "DEXC_INIT_FAILED";

export const initDexc = (passphrase) => (dispatch, getState) => {
  dispatch({ type: DEXC_INIT_ATTEMPT });
  if (!sel.dexcActive(getState())) {
    dispatch({ type: DEXC_INIT_FAILED, error: "Dexc isn't active" });
    return;
  }
  try {
    const res = ipcRenderer.sendSync("init-dexc",
      passphrase
    );
    if (res instanceof Error) {
      throw res;
    } else if (typeof res === "string") {
      if (res.indexOf("error", 0) > -1) {
        throw res
      }
    }  
    dispatch({ type: DEXC_INIT_SUCCESS });
    // Request current user information
    dispatch(userDexc());
    dispatch(getFeeDexc());
  } catch (error) {
    dispatch({ type: DEXC_INIT_FAILED, error });
    return;
  }
};

export const DEXC_LOGIN_ATTEMPT = "DEXC_LOGIN_ATTEMPT";
export const DEXC_LOGIN_SUCCESS = "DEXC_LOGIN_SUCCESS";
export const DEXC_LOGIN_FAILED = "DEXC_LOGIN_FAILED";

export const loginDexc = (passphrase) => (dispatch, getState) => {
  dispatch({ type: DEXC_LOGIN_ATTEMPT });
  if (!sel.dexcActive(getState())) {
    dispatch({ type: DEXC_LOGIN_FAILED, error: "Dexc isn't active" });
    return;
  }
  try {
    const res = ipcRenderer.sendSync("login-dexc",
      passphrase
    );
    if (res instanceof Error) {
      throw res;
    } else if (typeof res === "string") {
      if (res.indexOf("error", 0) > -1) {
        throw res
      }
    }
    dispatch({ type: DEXC_LOGIN_SUCCESS });
    // Request current user information
    dispatch(userDexc());
    dispatch(getFeeDexc());
  } catch (error) {
    dispatch({ type: DEXC_LOGIN_FAILED, error });
    return;
  }
};

export const DEXC_CREATEWALLET_ATTEMPT = "DEXC_CREATEWALLET_ATTEMPT";
export const DEXC_CREATEWALLET_SUCCESS = "DEXC_CREATEWALLET_SUCCESS";
export const DEXC_CREATEWALLET_FAILED = "DEXC_CREATEWALLET_FAILED";

export const createWalletDexc = (passphrase) => (dispatch, getState) => {
  dispatch({ type: DEXC_CREATEWALLET_ATTEMPT });
  if (!sel.dexcActive(getState())) {
    dispatch({ type: DEXC_CREATEWALLET_FAILED, error: "Dexc isn't active" });
    return;
  }
  try {
    const isTestnet = sel.isTestNet(getState());
    const {
      daemon: { walletName },
      walletLoader: { dexRpcSettings }
    } = getState();
    const rpcCreds = dexRpcSettings;
    const walletPath = getWalletPath(isTestnet, walletName);
    const appPassphrase = "p1";
    const account = "dex";
    const rpcuser = rpcCreds.rpcUser;
    const rpcpass= rpcCreds.rpcPass;
    const rpclisten = rpcCreds.rpcListen;
    const rpccert = rpcCreds.rpcCert;
    const res = ipcRenderer.sendSync("create-wallet-dexc",
      passphrase,
      appPassphrase,
      account,
      rpcuser,
      rpcpass,
      rpclisten,
      rpccert
    );
    if (res instanceof Error) {
      throw res;
    } else if (typeof res === "string") {
      if (res.indexOf("error", 0) > -1) {
        throw res
      }
    }
    dispatch({ type: DEXC_CREATEWALLET_SUCCESS });
    // Request current user information
    dispatch(userDexc());
  } catch (error) {
    dispatch({ type: DEXC_CREATEWALLET_FAILED, error });
    return;
  }
};

export const DEXC_USER_ATTEMPT = "DEXC_USER_ATTEMPT";
export const DEXC_USER_SUCCESS = "DEXC_USER_SUCCESS";
export const DEXC_USER_FAILED = "DEXC_USER_FAILED";

export const userDexc = () => (dispatch, getState) => {
  dispatch({ type: DEXC_USER_ATTEMPT });
  if (!sel.dexcActive(getState())) {
    dispatch({ type: DEXC_USER_FAILED, error: "Dexc isn't active" });
    return;
  }
  try {
    const res = ipcRenderer.sendSync("user-dexc");
    if (res instanceof Error) {
      throw res;
    } else if (typeof res === "string") {
      if (res.indexOf("error", 0) > -1) {
        throw res
      }
    }
    const resJson = JSON.parse(res);
    dispatch({ type: DEXC_USER_SUCCESS, user: resJson });
  } catch (error) {
    dispatch({ type: DEXC_USER_FAILED, error });
    return;
  }
};

export const DEXC_GETFEE_ATTEMPT = "DEXC_GETFEE_ATTEMPT";
export const DEXC_GETFEE_SUCCESS = "DEXC_GETFEE_SUCCESS";
export const DEXC_GETFEE_FAILED = "DEXC_GETFEE_FAILED";

export const getFeeDexc = () => (dispatch, getState) => {
  dispatch({ type: DEXC_GETFEE_ATTEMPT });
  if (!sel.dexcActive(getState())) {
    dispatch({ type: DEXC_GETFEE_FAILED, error: "Dexc isn't active" });
    return;
  }
  try {
    const addr = "dex-test.ssgen.io:7232"
    const res = ipcRenderer.sendSync("get-fee-dexc",
      addr
    );
    if (res instanceof Error) {
      throw res;
    } else if (typeof res === "string") {
      if (res.indexOf("error", 0) > -1) {
        throw res
      }
    }
    dispatch({ type: DEXC_GETFEE_SUCCESS, fee: res, addr });
  } catch (error) {
    dispatch({ type: DEXC_GETFEE_FAILED, error });
    return;
  }
};

export const DEXC_REGISTER_ATTEMPT = "DEXC_REGISTER_ATTEMPT";
export const DEXC_REGISTER_SUCCESS = "DEXC_REGISTER_SUCCESS";
export const DEXC_REGISTER_FAILED = "DEXC_REGISTER_FAILED";

export const registerDexc = (passphrase) => (dispatch, getState) => {
  dispatch({ type: DEXC_REGISTER_ATTEMPT });
  if (!sel.dexcActive(getState())) {
    dispatch({ type: DEXC_REGISTER_FAILED, error: "Dexc isn't active" });
    return;
  }
  const {
    dex: { fee, addr }
  } = getState();
  try {
    const res = ipcRenderer.sendSync("register-dexc",
      passphrase,
      addr,
      fee
    );
    if (res instanceof Error) {
      throw res;
    } else if (typeof res === "string") {
      if (res.indexOf("error", 0) > -1) {
        throw res
      }
    }  
    dispatch({ type: DEXC_REGISTER_SUCCESS });
    // Request current user information
    dispatch(userDexc());
  } catch (error) {
    dispatch({ type: DEXC_REGISTER_FAILED, error });
    return;
  }
};

export const DEXC_LAUNCH_WINDOW_ATTEMPT = "DEXC_LAUNCH_WINDOW_ATTEMPT";
export const DEXC_LAUNCH_WINDOW_SUCCESS = "DEXC_LAUNCH_WINDOW_SUCCESS";
export const DEXC_LAUNCH_WINDOW_FAILED = "DEXC_LAUNCH_WINDOW_FAILED";

export const launchDexcWindow = () => (dispatch, getState) => {
  dispatch({ type: DEXC_LAUNCH_WINDOW_ATTEMPT });
  if (!sel.dexcActive(getState())) {
    dispatch({ type: DEXC_LAUNCH_WINDOW_FAILED, error: "Dexc isn't active" });
    return;
  }

  dispatch({ type: DEXC_LAUNCH_WINDOW_SUCCESS });
};
