import {
  DEXC_ENABLE_ATTEMPT,
  DEXC_ENABLE_FAILED,
  DEXC_ENABLE_SUCCESS,
  DEXC_STARTUP_ATTEMPT,
  DEXC_STARTUP_FAILED,
  DEXC_STARTUP_SUCCESS,
  DEXC_INIT_ATTEMPT,
  DEXC_INIT_SUCCESS,
  DEXC_INIT_FAILED,
  DEXC_LOGIN_ATTEMPT,
  DEXC_LOGIN_SUCCESS,
  DEXC_LOGIN_FAILED,
  DEXC_REGISTER_ATTEMPT,
  DEXC_REGISTER_SUCCESS,
  DEXC_REGISTER_FAILED,
  DEXC_LAUNCH_WINDOW_ATTEMPT,
  DEXC_LAUNCH_WINDOW_SUCCESS,
  DEXC_LAUNCH_WINDOW_FAILED,
  DEXC_CHECKINIT_ATTEMPT,
  DEXC_CHECKINIT_FAILED,
  DEXC_CHECKINIT_SUCCESS,
  DEXC_USER_ATTEMPT,
  DEXC_USER_FAILED,
  DEXC_USER_SUCCESS,
  DEXC_CREATEWALLET_ATTEMPT,
  DEXC_CREATEWALLET_FAILED,
  DEXC_CREATEWALLET_SUCCESS,
  DEXC_GETFEE_ATTEMPT,
  DEXC_GETFEE_FAILED,
  DEXC_GETFEE_SUCCESS
} from "../actions/DexActions";

export default function ln(state = {}, action) {
  switch (action.type) {
    case DEXC_ENABLE_ATTEMPT:
      return {
        ...state,
        enableDexAttempt: true,
        enabledDex: false,
        enabledError: null
      };
    case DEXC_ENABLE_FAILED:
      return {
        ...state,
        enableDexAttempt: false,
        enabledDex: false,
        enabledError: action.error
      };
    case DEXC_ENABLE_SUCCESS:
      return {
        ...state,
        enableDexAttempt: false,
        enabledDex: true,
        enabledError: null
      };
    case DEXC_STARTUP_ATTEMPT:
      return {
        ...state,
        startAttempt: true,
        active: false,
        client: null
      };
    case DEXC_STARTUP_FAILED:
      return {
        ...state,
        startAttempt: false,
        startupStage: null
      };
    case DEXC_STARTUP_SUCCESS:
      return {
        ...state,
        startAttempt: false,
        exists: true,
        active: true,
        startupStage: null
      };
    case DEXC_LOGIN_ATTEMPT:
      return {
        ...state,
        loginAttempt: true,
        loggedIn: false,
        loginError: null
      };
    case DEXC_LOGIN_FAILED:
      return {
        ...state,
        loginAttempt: false,
        loggedIn: false,
        loginError: action.error
      };
    case DEXC_LOGIN_SUCCESS:
    return {
      ...state,
      loginAttempt: false,
      loggedIn: true,
      loginError: null
      };
    case DEXC_REGISTER_ATTEMPT:
      return {
        ...state,
        registerAttempt: true,
        registered: false,
        registerError: null
      };
    case DEXC_REGISTER_FAILED:
      return {
        ...state,
        registerAttempt: false,
        registered: false,
        registerError: action.error
      };
    case DEXC_REGISTER_SUCCESS:
      return {
        ...state,
        registerAttempt: false,
        registered: true,
        registerError: null
      };
    case DEXC_CREATEWALLET_ATTEMPT:
      return {
        ...state,
        createWalletAttempt: true,
        createWalletError: null
      };
    case DEXC_CREATEWALLET_FAILED:
      return {
        ...state,
        createWalletAttempt: false,
        createWalletError: action.error
      };
    case DEXC_CREATEWALLET_SUCCESS:
      return {
        ...state,
        createWalletAttempt: false,
        createWalletError: null
      };
    case DEXC_USER_ATTEMPT:
      return {
        ...state,
        userAttempt: true,
        user: null,
        userError: null
      };
    case DEXC_USER_FAILED:
      return {
        ...state,
        userAttempt: false,
        userError: action.error
      };
    case DEXC_USER_SUCCESS:
      return {
        ...state,
        userAttempt: false,
        user: action.user,
        userError: null
      };
    case DEXC_INIT_ATTEMPT:
      return {
        ...state,
        initAttempt: true,
        registerError: null
      };
    case DEXC_INIT_FAILED:
      return {
        ...state,
        initAttempt: false,
        initError: action.error
      };
    case DEXC_INIT_SUCCESS:
      return {
        ...state,
        initAttempt: false,
        dexcInit: true,
        loggedIn: true,
        registerError: null
      };
    case DEXC_LAUNCH_WINDOW_ATTEMPT:
      return {
        ...state,
        launchWindowAttempt: true,
        launchWindow: false,
        launchWinodwError: null
      };
    case DEXC_LAUNCH_WINDOW_FAILED:
      return {
        ...state,
        launchWindowAttempt: false,
        launchWindow: true,
        launchWinodwError: action.error
      };
    case DEXC_LAUNCH_WINDOW_SUCCESS:
      return {
        ...state,
        launchWindowAttempt: false,
        launchWindow: true,
        launchWinodwError: null
      };
    case DEXC_CHECKINIT_ATTEMPT:
      return {
        ...state,
        dexcCheckInitAttempt: true,
        dexcInitError: null
      };
    case DEXC_CHECKINIT_FAILED:
      return {
        ...state,
        dexcCheckInitAttempt: false,
        dexcInit: false,
        dexcInitError: action.error
      };
    case DEXC_CHECKINIT_SUCCESS:
      return {
        ...state,
        dexcCheckInitAttempt: false,
        dexcInit: action.res,
        dexcInitError: null
      };
    case DEXC_GETFEE_ATTEMPT:
      return {
        ...state,
        getFeeAttempt: true,
        fee: null,
        addr: null,
        getFeeError: null
      };
    case DEXC_GETFEE_FAILED:
      return {
        ...state,
        getFeeAttempt: false,
        fee: null,
        addr: null,
        getFeeError: action.error
      };
    case DEXC_GETFEE_SUCCESS:
      return {
        ...state,
        getFeeAttempt: false,
        fee: action.fee,
        addr: action.addr,
        getFeeError: null
      };
    default:
      return state;
  }
}
