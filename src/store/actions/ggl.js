import * as actionTypes from './actionTypes';
import { readSheet } from '../../shared/GgleIO';
import { today, sixDays, date, colors } from '../../shared/refData';

export const gglLoadStart = () => {
   return { type: actionTypes.GGL_LOAD_START };
};

export const gglLoadFinish = () => {
   return { type: actionTypes.GGL_LOAD_FINISH };
};

export const gglLoadSuccess = doc => {
   return { type: actionTypes.GGL_LOAD_SUCCESS, ...doc };
};

export const gglSaveStart = () => {
   return { type: actionTypes.GGL_SAVE_START };
};

export const gglSaveFinish = () => {
   return { type: actionTypes.GGL_SAVE_FINISH };
};

export const whenClassClicked = cl => {
   return {
      type: actionTypes.SET_CURRENT_CLASS,
      currClass: cl,
   };
};

export const whenBeltClicked = belt => {
   return {
      type: actionTypes.SET_CURRENT_BELT,
      currBelt: belt,
   };
};

export const whenAttenderNameClicked = id => {
   return {
      type: actionTypes.REMOVE_FROM_CLASS_ATTENDER,
      id: id,
   };
};

export const whenMemberNameClicked = id => {
   return {
      type: actionTypes.ADD_TO_CLASS_ATTENDER,
      id: id,
   };
};

export const whenAttenderSubmitClicked = () => {
   return async dispatch => {
      dispatch(gglSaveStart());
      const gglThisYear = await readSheet(0);
      const gglStats = await readSheet(2);
      dispatch({
         type: actionTypes.UPDATE_PERSONS_WITH_CLASS_ATTENDER,
         gglThisYear,
         gglStats,
      });
      dispatch(gglSaveFinish());
   };
};

export const saveTestee = testees => {
   return async dispatch => {
      dispatch(gglSaveStart());
      const gglThisYear = await readSheet(0);

      testees.forEach(async testee => {
         let colorId = colors.indexOf(testee[0]);
         let nextBelt = colors[colorId + 1];
         let row = gglThisYear[testee[1]];
         row.Beltcolor = nextBelt;
         row[date] = (row[date] ? row[date] : '') + '!Test[' + nextBelt + ']';
         row.TestedOn = date;

         await row.save();
      });
      dispatch(gglSaveFinish());
   };
};

export const gglLogout = () => {
   return {
      type: actionTypes.GGL_LOGOUT,
   };
};

export const resetCurrClass = () => {
   return {
      type: actionTypes.RESET_CURRCLASS,
   };
};

export const fetchPersonalAttendance = fullName => {
   return {
      type: actionTypes.LOAD_PERSONAL_ATTENDACE,
      fullName,
   };
};

export const fetchPerson = fullName => {
   return dispatch => {
      dispatch(gglLoadStart());
      dispatch(fetchPersonalAttendance(fullName));
      dispatch(gglLoadFinish());
   };
};

export const buildPersons = (
   gglThisYear,
   gglLastYear,
   classTable,
   classNameTable,
   classToday
) => {
   return dispatch => {
      let classAttender = {};
      for (let cls of classToday) {
         classAttender[cls[1]] = [];
      }

      const persons = gglThisYear.map((row, index) => {
         const person = {};
         const patt = /[/$#][^/$#!]*/g;

         person.name = row.Name;
         person.belt = row.Beltcolor;
         person.id = index;
         person.startedOn = row.StartedOn? row.StartedOn: '';
         person.testedOn = row.TestedOn? row.TestedOn: '';
         person.needGglUpdate = false;
         person.attClass = [];
         if (row[date]) {
            // Below, remove the case where only test progress and/or new member.
            if (row[date].match(patt)) {
               person.attClass = row[date].match(patt).map(el => el.slice(1));
            }
         }

         for (let j of person.attClass) {
            classAttender[j].push([row.Beltcolor, index]);
         }
         return person;
      });
      dispatch(
         gglLoadSuccess({
            persons: persons,
            classAttender,
            classToday,
            classTable,
            classNameTable,
            gglThisYear,
            gglLastYear,
         })
      );
   };
};

export const fetchGglDocs = () => {
   return async dispatch => {
      dispatch(gglLoadStart());

      // Build classTable.
      const gglClassTable = await readSheet(1);
      const cl = gglClassTable.map(row => ({ ...row }));
      let classTable = {};
      let classNameTable = {};

      for (let day of sixDays) {
         let classArr = [];
         let classNameArr = [];
         for (let row of cl) {
            classArr.push([row.Classes, row[day] ? row[day] : '']);
            classNameArr.push(row[day] ? row[day] : '');
         }
         classTable[day] = classArr;
         classNameTable[day] = classNameArr;
      }

      // Add activities to classNameTable.
      let activities = ['Afterschool', 'Trial', 'Birthday', 'Camp'];
      for (let day in classNameTable) {
         classNameTable[day] = [...activities, ...classNameTable[day]];
      }

      // Build persons.
      const gglThisYear = await readSheet(0);
      const gglLastYear = await readSheet(3);
      dispatch(
         buildPersons(
            gglThisYear,
            gglLastYear,
            classTable,
            classNameTable,
            classTable[today]
         )
      );

      dispatch(gglLoadFinish());
   };
};
