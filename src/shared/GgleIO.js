import { GoogleSpreadsheet } from 'google-spreadsheet';
import store from '../store/store';
const creds = require('../client_secret.json');

async function readSheet(index) {
   const state = store.getState();
   let docID = state.auth.ggleID;
   let id = index; // '0' - gglThisYear, '1' - classTable, '2' - gglStat, '3' - pastYear.

   if (index === 2) {
      docID = state.auth.statsGglID;
      id = state.auth.locationID;
   }
   if (index === 3 ) {
      docID = state.auth.lastYearGglID;
      id = 0;
   }

   const doc = new GoogleSpreadsheet(docID);
   await doc.useServiceAccountAuth(creds);
   await doc.loadInfo(); // loads document properties and worksheets
   const sheetLog = doc.sheetsByIndex[id]; // Personal dailylog file
   const rows = await sheetLog.getRows();

   return rows;
}

async function getSheetObj(index) {
   const state = store.getState();
   const doc = new GoogleSpreadsheet(state.auth.ggleID);
   await doc.useServiceAccountAuth(creds);
   await doc.loadInfo(); // loads document properties and worksheets
   const sheet = doc.sheetsByIndex[index]; // Personal dailylog file
 
   return sheet;
 }
 
 export { readSheet, getSheetObj };