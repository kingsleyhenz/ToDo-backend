import { obtainTokenFromHeader } from "../util/tokenFromHead.js";
import { verifytoken } from "../util/verifyToken.js";

// export const isLogin = (req, res, next) => {
//     const token = obtainTokenFromHeader(req);
//     const userDecoded = verifytoken(token);

//     req.userAuth = userDecoded.id;

//     if(!userDecoded){
//         return res.json({
//             status: "failed",
//             message: "Kindly, login in because, it seem the token is either expired or invalid"
//         })
//     }else{
//         next();
//     }
// }
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