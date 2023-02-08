import { obtainTokenFromHeader } from "../util/tokenFromHead.js";
import { verifytoken } from "../util/verifyToken.js";

export const isLogin = (req, res, next) => {
    try {
        const token = obtainTokenFromHeader(req);
        const userDecoded = verifytoken(token);
        req.userAuth = userDecoded.id;
        next();
    } catch (error) {
        return res.status(401).json({
            status: "failed",
            message: error.message
        });
    }
};