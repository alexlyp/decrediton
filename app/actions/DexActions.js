import * as sel from "selectors";
import { ipcRenderer } from "electron";
import { getWalletPath } from "main_dev/paths";
import {
  addAllowedExternalRequest
} from "./SettingsActions";
import { EXTERNALREQUEST_DEXC } from "main_dev/externalRequests";

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
    const res = ipcRenderer.sendSync("check-init-dexc");
    if (res instanceof Error) {
      throw res;
    }
    dispatch({ type: DEXC_CHECKINIT_SUCCESS, res });
  } catch (error) {
    dispatch({ type: DEXC_CHECKINIT_FAILED, error });
    return;
  }
}


export const DEXC_STOPPED = "DEXC_STOPPED";

export const stopDexc = () => (dispatch, getState) => {
  if (!sel.dexActive(getState())) {
    return;
  }

  ipcRenderer.send("stop-dexc");
  dispatch({ type: DEXC_STOPPED });
};

export const DEXC_INIT_ATTEMPT = "DEXC_INIT_ATTEMPT";
export const DEXC_INIT_SUCCESS = "DEXC_INIT_SUCCESS";
export const DEXC_INIT_FAILED = "DEXC_INIT_FAILED";

export const initDexc = () => (dispatch, getState) => {
  dispatch({ type: DEXC_INIT_ATTEMPT });
  dispatch(addAllowedExternalRequest(EXTERNALREQUEST_DEXC));
  if (!sel.dexActive(getState())) {
    dispatch({ type: DEXC_INIT_FAILED, error: "Dexc isn't active" });
    return;
  }

  dispatch({ type: DEXC_INIT_SUCCESS });
};

export const DEXC_LOGIN_ATTEMPT = "DEXC_LOGIN_ATTEMPT";
export const DEXC_LOGIN_SUCCESS = "DEXC_LOGIN_SUCCESS";
export const DEXC_LOGIN_FAILED = "DEXC_LOGIN_FAILED";

export const loginDexc = () => (dispatch, getState) => {
  dispatch({ type: DEXC_LOGIN_ATTEMPT });
  if (!sel.dexActive(getState())) {
    dispatch({ type: DEXC_LOGIN_FAILED, error: "Dexc isn't active" });
    return;
  }

  dispatch({ type: DEXC_LOGIN_SUCCESS });
};

export const DEXC_REGISTER_ATTEMPT = "DEXC_REGISTER_ATTEMPT";
export const DEXC_REGISTER_SUCCESS = "DEXC_REGISTER_SUCCESS";
export const DEXC_REGISTER_FAILED = "DEXC_REGISTER_FAILED";

export const registerDexc = () => (dispatch, getState) => {
  dispatch({ type: DEXC_REGISTER_ATTEMPT });
  if (!sel.dexActive(getState())) {
    dispatch({ type: DEXC_REGISTER_FAILED, error: "Dexc isn't active" });
    return;
  }

  dispatch({ type: DEXC_REGISTER_SUCCESS });
};

export const DEXC_LAUNCH_WINDOW_ATTEMPT = "DEXC_LAUNCH_WINDOW_ATTEMPT";
export const DEXC_LAUNCH_WINDOW_SUCCESS = "DEXC_LAUNCH_WINDOW_SUCCESS";
export const DEXC_LAUNCH_WINDOW_FAILED = "DEXC_LAUNCH_WINDOW_FAILED";

export const launchDexcWindow = () => (dispatch, getState) => {
  dispatch({ type: DEXC_LAUNCH_WINDOW_ATTEMPT });
  if (!sel.dexActive(getState())) {
    dispatch({ type: DEXC_LAUNCH_WINDOW_FAILED, error: "Dexc isn't active" });
    return;
  }

  dispatch({ type: DEXC_LAUNCH_WINDOW_SUCCESS });
};
