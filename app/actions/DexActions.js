import * as sel from "selectors";
import { ipcRenderer } from "electron";

export const DEXC_STARTUP_ATTEMPT = "DEXC_STARTUP_ATTEMPT";
export const DEXC_STARTUP_FAILED = "DEXC_STARTUP_FAILED";
export const DEXC_STARTUP_SUCCESS = "DEXC_STARTUP_SUCCESS";

export const startDexc = () => (dispatch, getState) => {
  dispatch({ type: DEXC_STARTUP_FAILED });
  const isTestnet = sel.isTestNet(getState());

  try {
    const res = ipcRenderer.sendSync(
      "start-dex",
      isTestnet
    );
    if (typeof res === "string" || res instanceof Error) {
      throw res;
    }
  } catch (error) {
    dispatch({ type: DEXC_STARTUP_FAILED });
    return;
  }
};

export const DEXC_STOPPED = "DEXC_STOPPED";

export const stopDcrlnd = () => (dispatch, getState) => {
  if (!sel.dexAction(getState())) {
    return;
  }

  ipcRenderer.send("stop-dexc");
  dispatch({ type: DEXC_STOPPED });
};

/*
const waitForDexcSynced = (lnClient) => async () => {
  const sleepMs = 3000;
  const sleepCount = 60 / (sleepMs / 1000);
  const sleep = () => new Promise((resolve) => setTimeout(resolve, sleepMs));

  for (let i = 0; i < sleepCount; i++) {
    const info = await ln.getInfo(lnClient);
    if (info.serverActive) {
      await sleep(); // Final sleep to let subsystems catch up.
      return;
    }
    await sleep();
  }

  throw new Error("dcrlnd wallet not synced after 60 seconds");
};
*/
