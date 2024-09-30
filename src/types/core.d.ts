import { IncomingHttpHeaders } from "http";
import { Request } from "express";

interface IApiRequest<
    P = core.ParamsDictionary,
    ResBody = any,
    ReqBody = any,
    ReqQuery = qs.ParsedQs,
    Locals extends Record<string, any> = Record<string, any>
> extends Request<P, ResBody, ReqBody, ReqQuery, Locals> {
    user?: any;
    t?: ICheckLanguages;
    headers: IncomingHttpHeaders & {
        token?: string;
    };
}

export { IApiRequest };
