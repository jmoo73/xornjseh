import * as actionTypes from './actionTypes';
import { readSheet } from '../../shared/GgleIO';
import { date } from '../../shared/refData';

export const statSaveStart = () => {
   return { type: actionTypes.STAT_SAVE_START };
};

export const statSaveFinish = () => {
   return { type: actionTypes.STAT_SAVE_FINISH };
};

export const statLoadStart = () => {
   return { type: actionTypes.STAT_LOAD_START };
};

export const statLoadFinish = () => {
   return { type: actionTypes.STAT_LOAD_FINISH };
};

export const statLogout = () => {
   return { type: actionTypes.STAT_LOGOUT };
};

export const whenActivityClicked = activity => {
   return {
      type: actionTypes.SET_CURRENT_ACTIVITY,
      currActivity: activity,
   };
};

export const updateActivity = (gglStats, currActivity, number) => {
   return {
      type: actionTypes.UPDATE_ACTIVITY,
      currActivity,
      number,
      gglStats,
   };
};

export const initActivity = () => {
   return {
      type: actionTypes.INIT_ACTIVITY,
   };
};

export const whenActivitySubmitClicked = (currActivity, number) => {
   return async dispatch => {
      dispatch(statSaveStart());
      let gglStats = await readSheet(2);
      dispatch(updateActivity(gglStats, currActivity, number));
      dispatch(statSaveFinish());
   };
};

export const buildStats = (dailyStat, keyList) => {
   return {
      type: actionTypes.STAT_LOAD_SUCCESS,
      dailyStat,
      keyList,
   };
};

export const buildStatsMiddle = gglStats => {
   return async dispatch => {
      let dailyStat = {};
      let keyList = [];
      for (let row = 0; row < gglStats.length; row++) {
         if (gglStats[row].Date === date) {
            keyList = [...gglStats[row]._sheet.headerValues];
            keyList.splice(0, 1);
            for (let key of keyList) {
               if (!gglStats[row][key]) {
                  dailyStat[key] = '0';
                  gglStats[row][key] = '0';
               } else {
                  dailyStat[key] = gglStats[row][key];
               }
            }
            await gglStats[row].save();
            break;
         }
      }
      dispatch(buildStats(dailyStat, keyList));
   };
};

export const fetchStat = () => {
   return async dispatch => {
      dispatch(statLoadStart());

      // Build stats.
      const gglStats = await readSheet(2);
      dispatch(buildStatsMiddle(gglStats));

      dispatch(statLoadFinish());
   };
};
