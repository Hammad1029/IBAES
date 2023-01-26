import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken';
import { responseHandler, responses } from "../../utils/responseHandler";
import users from "../../__mocks__/users";

export default async (req, res) => {
    if (req.method === "POST") {
        const { username, password } = req.body;
        if (!username || !password)
            return responseHandler(res, responses.badRequest, { error: true });
        const user = users.find(i => i.username === username);
        if (!user) return responseHandler(res, responses.userNotFound);
        const authenticated = await bcrypt.compare(password, user.password);
        if (authenticated) {
            const { id, username, createdAt } = user;
            const token = jwt.sign({ username, createdAt }, process.env.JWT_KEY, { expiresIn: process.env.JWT_EXPIRY });
            return responseHandler(res, responses.success, { data: { token, user: { id, username, createdAt } } })
        } else return responseHandler(res, responses.invalidPassword)
    }
}