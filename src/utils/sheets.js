import { google } from "googleapis";
import _ from "lodash";

export const keyFile = "/Users/LAPTRADE/Desktop/IBAES/src/ideas-bazaar-376010-3892ce8beab4.json";
export const sheetID = "183FupMBVN2VWdCLxYTNwcmzsnV_p3TQr07G87VBoVwk";

export const tabs = {
    users: {
        name: "Users",
        range: "A:F"
    },
    modules: {
        name: "Modules & Leaderboards",
        range: "A:G"
    }
}

const getGoogleSheetClient = async () => {
    const auth = new google.auth.GoogleAuth({
        keyFile: keyFile,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const authClient = await auth.getClient();
    return google.sheets({
        version: 'v4',
        auth: authClient,
    });
}

export const readGoogleSheet = async (tab) => {
    const googleSheetClient = await getGoogleSheetClient();
    const res = await googleSheetClient.spreadsheets.values.get({
        spreadsheetId: sheetID,
        range: `${tab.name}!${tab.range}`,
    });
    const arr = [];
    res.data.values.slice(1).forEach((item) => {
        const obj = {};
        item.forEach((element, idx) => {
            obj[(_.camelCase(res.data.values[0][idx]))] = element;
        })
        arr.push(obj);
    })
    return arr;
}