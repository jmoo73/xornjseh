import axios from 'axios';
import { authURL, fetchGglIDURL } from '../../URL.json';
import * as actionTypes from './actionTypes';

export const authStart = () => {
   return {
      type: actionTypes.AUTH_START,
   };
};

export const authSuccess = (token, userId, email) => {
   return {
      type: actionTypes.AUTH_SUCCESS,
      idToken: token,
      userId: userId,
      email: email,
   };
};

export const authFail = error => {
   return {
      type: actionTypes.AUTH_FAIL,
      error: error,
   };
};

export const logout = () => {
   return {
      type: actionTypes.AUTH_LOGOUT,
   };
};

export const gglIdFetchSuccess = (
   ggleID,
   statsGglID,
   location,
   locationID,
   lastYearGglID
) => {
   return {
      type: actionTypes.GGL_ID_FETCH_SUCCESS,
      ggleID,
      statsGglID,
      location,
      locationID,
      lastYearGglID,
   };
};

export const auth = (email, password) => {
   return dispatch => {
      dispatch(authStart());
      const authData = {
         email: email,
         password: password,
         returnSecureToken: true,
      };

      let authUrl = authURL;

      axios
         .post(authUrl, authData)
         .then(response1 => {
            let fetchGglIDUrl = fetchGglIDURL;
            let locName = email.split('@')[0];
            axios
               .get(fetchGglIDUrl)
               .then(response2 => {
                  let locData = response2.data[locName];
                  dispatch(
                     gglIdFetchSuccess(
                        locData.thisYear.ggleSheetID,
                        locData.stats.ggleSheetID,
                        locData.location,
                        locData.locationID,
                        locData.lastYear.ggleSheetID,
                     )
                  );
                  dispatch(
                     authSuccess(
                        response1.data.idToken,
                        response1.data.localId,
                        email
                     )
                  );
               })
               .catch(err => {
                  console.log(
                     'Issues in fetching GoogleSheet ID from firebase.'
                  );
               });
         })
         .catch(err => {
            dispatch(authFail(err.response.data.error));
         });
   };
};
