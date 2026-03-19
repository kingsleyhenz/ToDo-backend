import type { Request, Response, NextFunction } from "express";
import { obtainTokenFromHeader } from "../util/tokenFromHead";
import { verifytoken } from "../util/verifyToken";

export const isLogin = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = obtainTokenFromHeader(req);
        const userDecoded: any = verifytoken(token);
        // @ts-ignore
        req.userAuth = userDecoded.id;
        next();
    } catch (error: any) {
        return res.status(401).json({
            status: "failed",
            message: error.message
        });
    }
};