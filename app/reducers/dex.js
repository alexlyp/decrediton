import {
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
  DEXC_CHECKINIT_SUCCESS
} from "../actions/DexActions";

export default function ln(state = {}, action) {
  switch (action.type) {
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
    case DEXC_INIT_ATTEMPT:
      return {
        ...state,
        initAttempt: true,
        init: false,
        registerError: null
      };
    case DEXC_INIT_FAILED:
      return {
        ...state,
        initAttempt: false,
        init: false,
        initError: action.error
      };
    case DEXC_INIT_SUCCESS:
      return {
        ...state,
        initAttempt: false,
        init: true,
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
        dexcInitAttempt: true,
        dexcInitError: null
      };
    case DEXC_CHECKINIT_FAILED:
      return {
        ...state,
        dexcInitAttempt: false,
        dexcInit: false,
        dexcInitError: action.error
      };
    case DEXC_CHECKINIT_SUCCESS:
      return {
        ...state,
        dexcInitAttempt: false,
        dexcInit: action.res,
        dexcInitError: null
      };
    default:
      return state;
  }
}
