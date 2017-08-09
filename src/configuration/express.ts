import { RequestError } from './../controllers/request-error';
import * as bodyParser from "body-parser";
import * as express from "express";
import * as expressValidator from "express-validator";

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
            express.static('public'),
            this.setHeaders,
            this.logger,
            express.static(__dirname + '/../public'),
            bodyParser.json(),
            bodyParser.urlencoded({ extended: false }),
            expressValidator()
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
        if (err instanceof RequestError)
            res.status(400).send({
                error: err.message,
                details: err.errorObject
            });
        else
            res.status(500).send({
                error: err.message,
                stack: err.stack
            });
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