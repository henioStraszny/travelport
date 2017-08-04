import * as bodyParser from "body-parser";
import * as express from "express";

export class ExpressConfigurator implements IExpressConfigurator {
    public Settings: Array<(req: express.Request, res: express.Response, next: express.NextFunction) => void>;
    public Port: number;
    public ErrorHandlingSettings: Array<(
        err: any, 
        req: express.Request, 
        res: express.Response, 
        next: express.NextFunction) 
        => void>;

    constructor() {
        this.Settings = [
            this.setHeaders,
            this.logger,
            bodyParser.json(),
            bodyParser.urlencoded({ extended: false })
        ];
        this.ErrorHandlingSettings = [
            this.error
        ];
        this.Port = 3000;
    }

    private logger(req: express.Request, res: express.Response, next: express.NextFunction) {
        next();
    }

    private setHeaders(req: express.Request, res: express.Response, next: express.NextFunction) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.header('Content-Type', 'application/json');
        next();
    }

    private error(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
        if (res.headersSent) {
            return next(err);
        }

        if (err.EvaluatedError == 404) res.status(404);
        else res.status(500);

        res.send(JSON.stringify({
             error: err.message,
             stack: err.stack
         }, null, 4));

    }
}

export interface IExpressConfigurator {
    Settings: Array<(
        req: express.Request, 
        res: express.Response, 
        next: express.NextFunction) 
        => void>;
    Port: number;
    ErrorHandlingSettings: Array<(
        err: any, 
        req: express.Request, 
        res: express.Response, 
        next: express.NextFunction) 
        => void>;
}