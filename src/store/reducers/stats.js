import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import { date } from '../../shared/refData';

const initialState = {
   keyList: [], // [ 'Afterschool', .... 'Class6' ]
   dailyStat: {}, // { 'AfterSchool': '3', ... }
   currActivity: null,
   saving: false,
   loading: false,
   dataLoaded: false,
};

const statLoadStart = (state, action) => {
   return updateObject(state, { loading: true });
};

const statLoadFinish = (state, action) => {
   return updateObject(state, { loading: false, dataLoaded: true });
};

const statLoadSuccess = (state, action) => {
   delete action.type;
   return updateObject(state, { ...action });
};

const statLogout = (state, action) => {
   return updateObject(state, initialState);
};

const statSaveStart = (state, action) => {
   return updateObject(state, { saving: true });
};

const statSaveFinish = (state, action) => {
   return updateObject(state, { saving: false });
};

const resetActivity = (state, action) => {
   return updateObject(state, { currActivity: null });
};

const whenActivityClicked = (state, action) => {
   return updateObject(state, {
      currActivity: action.currActivity,
   });
};

const whenActivitySubmitClicked = (state, action) => {
   let dailyStat = state.dailyStat;
   dailyStat[state.currActivity] = action.number;

   let gglStats = action.gglStats;
   gglStats.forEach(async row => {
      if (row.Date === date) {
         row[action.currActivity] = action.number;
         await row.save();
      }
   });

   return updateObject(state, {
      currActivity: null,
      dailyStat,
   });
};

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case actionTypes.STAT_LOAD_START:
         return statLoadStart(state, action);
      case actionTypes.STAT_LOAD_SUCCESS:
         return statLoadSuccess(state, action);
      case actionTypes.STAT_LOAD_FINISH:
         return statLoadFinish(state, action);
      case actionTypes.STAT_SAVE_START:
         return statSaveStart(state, action);
      case actionTypes.STAT_SAVE_FINISH:
         return statSaveFinish(state, action);
      case actionTypes.STAT_LOGOUT:
         return statLogout(state, action);
      case actionTypes.SET_CURRENT_ACTIVITY:
         return whenActivityClicked(state, action);
      case actionTypes.UPDATE_ACTIVITY:
         return whenActivitySubmitClicked(state, action);
      case actionTypes.INIT_ACTIVITY:
         return resetActivity(state, action);
      default:
         return state;
   }
};

export default reducer;
