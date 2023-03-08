import { google } from "googleapis";
import _ from "lodash";
import { camelCaseToNormal } from ".";

export const keyFile = "/Users/LAPTRADE/Desktop/IBAES/src/ideas-bazaar-376010-3892ce8beab4.json";
export const sheetID = "183FupMBVN2VWdCLxYTNwcmzsnV_p3TQr07G87VBoVwk";

export const tabs = {
  users: {
    name: "Users",
    range: "A:F",
  },
  modules: {
    name: "Modules & Leaderboards",
    range: "A:G",
  },
  balances: {
    name: "Bazaar Balances",
    range: "A:F",
  },
  stocks: {
    name: "Bazaar Stocks",
    range: "A:D",
  },
  headlines: {
    name: "Bazaar Headlines",
    range: "A:B",
  },
  orders: {
    name: "Bazaar Orders",
    range: "A:F",
  },
};

const getGoogleSheetClient = async () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: keyFile,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const authClient = await auth.getClient();
  return google.sheets({
    version: "v4",
    auth: authClient,
  });
};

export const readGoogleSheet = async (tab, header = false) => {
  const googleSheetClient = await getGoogleSheetClient();
  const res = await googleSheetClient.spreadsheets.values.get({
    spreadsheetId: sheetID,
    range: `${tab.name}!${tab.range}`,
  });
  const arr = [];
  res.data.values.slice(1).forEach((item) => {
    const obj = {};
    item.forEach((element, idx) => {
      obj[_.camelCase(res.data.values[0][idx])] = element;
    });
    arr.push(obj);
  });
  return arr;
};

export const writeGoogleSheet = async (tab, data) => {
  const googleSheetClient = await getGoogleSheetClient();
  await googleSheetClient.spreadsheets.values.append({
    spreadsheetId: sheetID,
    range: `${tab.name}!${tab.range}`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    resource: {
      majorDimension: "ROWS",
      values: [Object.keys(data).map((i) => data[i])],
    },
  });
};

export const updateGoogleSheet = async (tab, data) => {
  const googleSheetClient = await getGoogleSheetClient();
  const headerRow = Object.keys(data[0]).map((i) => camelCaseToNormal(i));
  await googleSheetClient.spreadsheets.values.update({
    spreadsheetId: sheetID,
    range: `${tab.name}!${tab.range}`,
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [headerRow, ...data.map((i) => Object.keys(i).map((key) => i[key]))],
    },
  });
};
