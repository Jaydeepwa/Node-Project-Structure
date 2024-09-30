import { Response, NextFunction } from "express";
import { IApiRequest } from "../types/core";
import jwt from "jsonwebtoken";
import { Message, sendJsonResponse, StatusCodes } from "../utils/apiResponse";
import { CONFIG } from "../constant/config";

const jwtSecretKey = CONFIG.JWT_SECRET_KEY as string;

export const generateToken = (user: any) => {
    const token = jwt.sign(user, jwtSecretKey, { expiresIn: "1 days" }); // Expire in 1 day
    return token;
};

export const compareToken = (ctx: string) => {
    const decoded = jwt.verify(ctx, jwtSecretKey);
    return decoded;
};

export const verifyToken = async (
    req: IApiRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.headers.authorization || req.headers.authorization.split(" ").length < 1) {
            return sendJsonResponse(
                res,
                StatusCodes.UNAUTHORIZED,
                [],
                false,
                Message.TOKEN_REQUIRED
            );
        }
        compareToken(req.headers.authorization.split(" ")[1]) as {
            _id: string;
        };
        next();
    } catch (error) {
        return sendJsonResponse(
            res,
            StatusCodes.UNAUTHORIZED,
            [],
            false,
            Message.UNAUTHORIZED
        );
    }
};