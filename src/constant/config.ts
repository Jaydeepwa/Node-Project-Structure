import dotenv from "dotenv";
import path from "path";

const envFile: string = process.env.NODE_ENV === "production" ? `${process.env.NODE_ENV}.env` : ".env";

dotenv.config({
    path: path.resolve(envFile),
});

const port = process.env.PORT ?? 9501;

export const CONFIG = {
    NODE_ENV: process.env.NODE_ENV ?? 'development',
    PORT: port,
    HOST: process.env.NODE_ENV === "production" ? process.env.LIVE_URL : `http://localhost:${port}`,
    DB_URL: process.env.DB_URL ?? "mongodb://localhost:27017/NodeProject",
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY
};
