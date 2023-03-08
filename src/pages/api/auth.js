import { sha256 } from "js-sha256";
import jwt from 'jsonwebtoken';
import { responseHandler, responses } from "../../utils/responseHandler";
import * as sheets from "../../utils/sheets";

export default async (req, res) => {
    try {
        if (req.method === "POST") {
            const { username, password } = req.body;
            if (!username || !password)
                return responseHandler(res, responses.badRequest, { error: true });
            const users = await sheets.readGoogleSheet(sheets.tabs.users);
            const user = users.find(i => i.username === username);
            if (!user) return responseHandler(res, responses.userNotFound);
            if (sha256(password) === user.password) {
                const userDetails = { ...user, password: undefined };
                const token = jwt.sign(userDetails, process.env.JWT_KEY, { expiresIn: process.env.JWT_EXPIRY });
                return responseHandler(res, responses.success, { data: { token, user: userDetails } })
            } else return responseHandler(res, responses.invalidPassword)
        }

    } catch (e) {
        return responseHandler(res, responses.internalServerError, { error: true, errorMsg: e })
    }
}