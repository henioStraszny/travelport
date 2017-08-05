import { IRoutesConfigurator, RoutesConfigurator } from './configuration/route';
import { IExpressConfigurator, ExpressConfigurator } from './configuration/express';
import { Server } from 'http';
import { Application } from 'express';
import * as Moment from "moment";
import * as express from "express";


class Main {
    public app: Application;
    public nodeServer: Server;

    constructor(
        private configurator: IExpressConfigurator,
        private routes: IRoutesConfigurator) {

        this.app = express();
        this.app.use(configurator.Settings);
        this.app.use(routes.Router);
        this.app.use(configurator.ErrorHandlingSettings);
        this.app.set('json spaces', 2);
        this.nodeServer = this.app.listen(configurator.Port);
        console.log(`Started at: ${Moment().format('YYYY-MM-DD HH:mm:ss')}`);
    }
}

export const srv = new Main(new ExpressConfigurator(), new RoutesConfigurator());
