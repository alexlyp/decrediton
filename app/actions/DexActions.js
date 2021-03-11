import * as sel from "selectors";
import { ipcRenderer } from "electron";
import { getWalletPath } from "main_dev/paths";
import {
  addAllowedExternalRequest
} from "./SettingsActions";
import { EXTERNALREQUEST_DEXC } from "main_dev/externalRequests";
import { checkInitDexcAttempt } from "../selectors";

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
  dispatch(addAllowedExternalRequest(EXTERNALREQUEST_DEXC));
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
    }  
    dispatch({ type: DEXC_INIT_SUCCESS });
    dispatch({ type: dexcCheckInit() });
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
    console.log("action", passphrase);
    const res = ipcRenderer.sendSync("login-dexc",
      passphrase
    );
    if (res instanceof Error) {
      throw res;
    }
    dispatch({ type: DEXC_LOGIN_SUCCESS });
    // Request current user information
    dispatch(userDexc());
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
    const appPassphrase = "p1";
    const account = "dex";
    const rpcuser = "user";
    const rpcpass= "password";
    const rpccert = "/home/user/.config/decrediton/wallets/testnet/split tx/rpc.cert";
    const rpclisten = "127.0.0.1:19110";
    const res = ipcRenderer.sendSync("create-wallet-dexc",
      passphrase,
      appPassphrase,
      account,
      rpcuser,
      rpcpass,
      rpccert,
      rpclisten
    );
    if (res instanceof Error) {
      throw res;
    }  
    dispatch({ type: DEXC_CREATEWALLET_SUCCESS });
  } catch (error) {
    dispatch({ type: DEXC_CREATEWALLET_FAILED, error });
    return;
  }

  dispatch({ type: DEXC_CREATEWALLET_SUCCESS });
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
    } 
    console.log(res);
    dispatch({ type: DEXC_USER_SUCCESS, user: res });
  } catch (error) {
    dispatch({ type: DEXC_USER_FAILED, error });
    return;
  }

  dispatch({ type: DEXC_USER_SUCCESS });
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
  try {
    const res = ipcRenderer.sendSync("register-dexc",
    );
    if (res instanceof Error) {
      throw res;
    }  
    dispatch({ type: DEXC_REGISTER_SUCCESS });
  } catch (error) {
    dispatch({ type: DEXC_REGISTER_FAILED, error });
    return;
  }
  dispatch({ type: DEXC_REGISTER_SUCCESS });
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
