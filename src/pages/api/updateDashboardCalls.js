import { responseHandler, responses } from "../../utils/responseHandler";
import * as sheets from "../../utils/sheets";

export default async (req, res) => {
    try {
        if (req.method === "GET") {
            const modules = await sheets.readGoogleSheet(sheets.tabs.modules);
            const users = await sheets.readGoogleSheet(sheets.tabs.users);
            const teamScores = users.map(({ id, username, members, score }) => ({ id, username, members, score }))
            return responseHandler(res, responses.success, { data: { modules, teamScores } })
        }
    } catch (e) {
        return responseHandler(res, responses.internalServerError, { error: true })
    }
}