import { GoogleSpreadsheet } from "google-spreadsheet";
import store from "../../store/store";
const creds = require("../../client_secret.json");

async function readSheet(index, common = false) {
  const state = store.getState();
  let docID = state.auth.ggleID;

  if (common === true) {
    docID = '1Dpc-nauwQ5IKKMuZaIlxjopq-0Y61NvahpMZx-R6fqU'; // Common file for all dojang.
    index = state.auth.locationID;
  } else if (common === 'lastYear') {
    docID = state.auth.pastYearGgleID;
    index = 0;
  }

  const doc = new GoogleSpreadsheet(docID);
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo(); // loads document properties and worksheets
  const sheetLog = doc.sheetsByIndex[index]; // Personal dailylog file
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
