import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import { date, makeMonthlyDataList, thisYear } from '../../shared/refData';

const initialState = {
   classTable: {}, // { Monday: [[ 'Class1', 'White and Yellow'], ... ], ... }
   classNameTable: {}, // { Monday: [ 'Tiger Tot', 'White and Yellow', ... }
   classToday: [], // [ [ 'Class1', 'Tiger Tot'], ... ]
   classAttender: {}, // { y: [ ["Black", 109],... ], ... }
   currClass: null, // 'Tiger Tot'
   currClassID: null, // 'Class1'
   currBelt: 'White',
   persons: [], // [ { ... }, ... ]
   loading: false,
   saving: false,
   dataLoaded: false,
   error: null,
   attenderTouched: false,
   gglThisYear: null,
   gglLastYear: null,
   personalAttendance: [],
};

const gglLoadStart = (state, action) => {
   return updateObject(state, { loading: true });
};

const gglLoadFinish = (state, action) => {
   return updateObject(state, { loading: false, dataLoaded: true });
};

const gglSaveStart = (state, action) => {
   return updateObject(state, { saving: true });
};

const gglSaveFinish = (state, action) => {
   return updateObject(state, { saving: false });
};

const gglLoadSuccess = (state, action) => {
   delete action.type;
   return updateObject(state, { ...action });
};

const gglLogout = (state, action) => {
   return updateObject(state, initialState);
};

const resetCurrClass = (state, action) => {
   return updateObject(state, { currClass: null, currClassID: null });
};

const whenClassClicked = (state, action) => {
   let currClassID = null;
   state.classToday.forEach(cls => {
      if (cls[1] === action.currClass) {
         currClassID = cls[0];
      }
   });
   return updateObject(state, {
      currClass: action.currClass,
      currClassID,
   });
};

const whenBeltClicked = (state, action) => {
   return updateObject(state, { currBelt: action.currBelt });
};

const whenMemberNameClicked = (state, action) => {
   let attenderList = state.classAttender[state.currClass];
   attenderList.push([state.persons[action.id].belt, action.id]);
   return updateObject(state, {
      classAttender: updateObject(state.classAttender, {
         [state.currClass]: attenderList,
      }),
      attenderTouched: true,
   });
};

const whenAttenderNameClicked = (state, action) => {
   let attenderList = state.classAttender[state.currClass];
   for (let i in attenderList) {
      if (attenderList[i][1] === action.id) {
         attenderList.splice(i, 1);
         break;
      }
   }
   return updateObject(state, {
      classAttender: updateObject(state.classAttender, {
         [state.currClass]: attenderList,
      }),
      attenderTouched: true,
   });
};

const whenAttenderSubmitClicked = (state, action) => {
   const currAttenderIdList = state.classAttender[state.currClass].map(
      el => el[1]
   );
   // Update 'persons'.
   const members = state.persons.map(person => {
      let member = person;
      let needGglUpdate = false;
      let newAttClass = person.attClass;
      let inList = currAttenderIdList.includes(person.id);
      let inPerson = person.attClass.includes(state.currClass);
      if (inList !== inPerson) {
         if (inPerson) {
            newAttClass = person.attClass.filter(el => el !== state.currClass);
            needGglUpdate = true;
         } else {
            person.attClass.push(state.currClass);
            needGglUpdate = true;
         }
      }
      member = updateObject(person, { attClass: newAttClass, needGglUpdate });
      return member;
   });

   const patt = /[/$#][^/$#!]*/g;
   members.forEach(async member => {
      if (member.needGglUpdate) {
         let attStr = member.attClass.map(el => {
            if (el.includes('Spar')) return '$' + el;
            if (el.includes('Board')) return '#' + el;
            return '/' + el;
         });
         let beforeUpdate = action.gglThisYear[member.id][date];
         action.gglThisYear[member.id][date] =
            (beforeUpdate ? beforeUpdate.replace(patt, '') : '') +
            attStr.join('');
         await action.gglThisYear[member.id].save();
      }
   });

   action.gglStats.forEach(async row => {
      if (row.Date === date) {
         row[state.currClassID] = currAttenderIdList.length;
         await row.save();
      }
   });

   return updateObject(state, {
      persons: members,
      currClass: null,
      currClassID: null,
      attenderTouched: false,
   });
};

const fetchPersonalAttedance = (state, action) => {
   let id = null;
   let gglSheet = state.gglThisYear;
   // [ [ 'Apr', dateList], [ 'May', ... ], [ 'Jun', ... ] ]
   let allList = makeMonthlyDataList();
   const patt = /[/$#][^/$#!]*/g;

   for (let m = allList.length - 1; m >= 0; m--) {
      // dateList = [ { id: x, date: 'x/x/x', attendance: ['x', ... ], needDataFetch: true }, ... ]
      let dateList = allList[m][1];

      for (let day of dateList) {
         if (day.date.split('/')[2] !== thisYear.toString()) {
            gglSheet = state.gglLastYear;
            id = null;
         }
         if (!id) {
            for (let index = 0; index < gglSheet.length; index++) {
               if (gglSheet[index].Name === action.fullName) {
                  id = index;
                  break;
               }
            }
         }
         if (id) {
            if (gglSheet[id][day.date]) {
               day.attendance = gglSheet[id][day.date].match(patt)
                  ? gglSheet[id][day.date].match(patt).map(el => el.slice(1))
                  : [];
            }
            if (gglSheet[id].StartedOn === day.date) {
               day.start = true;
            }
            if (gglSheet[id].TestedOn === day.date) {
               day.test = true;
            }
         } else {
            // For the case when id is absent in the last year sheet.
            day.attendance = [];
         }
      }
   }
   return updateObject(state, { personalAttendance: allList });
};

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case actionTypes.GGL_LOAD_START:
         return gglLoadStart(state, action);
      case actionTypes.GGL_LOAD_SUCCESS:
         return gglLoadSuccess(state, action);
      case actionTypes.GGL_LOAD_FINISH:
         return gglLoadFinish(state, action);
      case actionTypes.GGL_SAVE_START:
         return gglSaveStart(state, action);
      case actionTypes.GGL_SAVE_FINISH:
         return gglSaveFinish(state, action);
      case actionTypes.SET_CURRENT_CLASS:
         return whenClassClicked(state, action);
      case actionTypes.SET_CURRENT_BELT:
         return whenBeltClicked(state, action);
      case actionTypes.UPDATE_PERSONS_WITH_CLASS_ATTENDER:
         return whenAttenderSubmitClicked(state, action);
      case actionTypes.REMOVE_FROM_CLASS_ATTENDER:
         return whenAttenderNameClicked(state, action);
      case actionTypes.ADD_TO_CLASS_ATTENDER:
         return whenMemberNameClicked(state, action);
      case actionTypes.GGL_LOGOUT:
         return gglLogout(state, action);
      case actionTypes.RESET_CURRCLASS:
         return resetCurrClass(state, action);
      case actionTypes.LOAD_PERSONAL_ATTENDACE:
         return fetchPersonalAttedance(state, action);
      default:
         return state;
   }
};

export default reducer;
