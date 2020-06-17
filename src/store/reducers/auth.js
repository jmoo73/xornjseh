import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: "/authHome",
  email: null,
  ggleID: null,
  statsGglID: null,
  location: null,
  locationID: null,
  lastYearGglID: null,
};

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false,
    email: action.email,
  });
};

const gglIdFetchSuccess = (state, action) => {
  return updateObject(state, {
    ggleID: action.ggleID,
    statsGglID: action.statsGglID,
    location: action.location,
    locationID: action.locationID,
    lastYearGglID: action.lastYearGglID,
    error: null,
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    userId: null,
    email: null,
    ggleID: null,
    location: null,
    locationID: null,
    lastYearGglID: null,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.GGL_ID_FETCH_SUCCESS:
      return gglIdFetchSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
