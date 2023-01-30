import { responseHandler, responses } from "../../utils/responseHandler";
import * as sheets from "../../utils/sheets";

export default async (req, res) => {
    try {
        if (req.method === "POST") {
            const { userId } = req.body;
            if (!userId) return responseHandler(res, responses.badRequest);

            const modules = await sheets.readGoogleSheet(sheets.tabs.modules);
            const users = await sheets.readGoogleSheet(sheets.tabs.users);
            const teamScores = users.map(({ id, username, members, score }) => ({ id, username, members, score }))
            const balances = await sheets.readGoogleSheet(sheets.tabs.balances);
            const userBalance = balances.filter(i => Number(i.userId) === Number(userId))[0];
            const stocks = await sheets.readGoogleSheet(sheets.tabs.stocks);
            const headlines = await sheets.readGoogleSheet(sheets.tabs.headlines);
            
            return responseHandler(res, responses.success, {
                data:
                    { modules, teamScores, userBalance, stocks, headlines }
            })
        }
    } catch (e) {
        return responseHandler(res, responses.internalServerError, { error: true })
    }
}