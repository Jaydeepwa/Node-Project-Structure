import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import path from "path";
import bodyParser from "body-parser";
import swaggerJson from "./swagger-output.json";
import { CONFIG } from "./constant/config";
import connectToDb from './utils/dbConnection';
import logger from "./utils/logger";
import indexRouter from "./routes/index";
import { sendJsonResponse, StatusCodes, Message } from "./utils/apiResponse";

const app: Application = express();

const port = Number(CONFIG.PORT);
const environment = CONFIG.NODE_ENV;
const host = CONFIG.HOST;
const dbUrl = CONFIG.DB_URL;
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));


app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));
app.use("/api/v1", indexRouter);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    const message = process.env.NODE_ENV === "development" ? error.message : Message.UNEXPECTED_ERROR;
    sendJsonResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, [], false, message, JSON.stringify(error));
});

(async () => {
    const dbStatus = await connectToDb(dbUrl);

    app.listen(port, () => {
        const data = [
            { Property: 'Host', Value: host },
            { Property: 'Database', Value: dbStatus },
            { Property: 'Application', Value: `🚀 Running on ${port} port with ${environment} mode` },
        ];
        console.table(data);
        logger.info(`Server running on port ${port}, DB status: ${dbStatus}`);
    });
})();
