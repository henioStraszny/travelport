import { IRoutesConfigurator, RoutesConfigurator } from './route-configuration';
import { IConfigurator, Configurator } from './configuration';
import { Server } from 'http';
import { Application } from 'express';
import * as express from "express";

class Main1 {
    public app: Application;
    public nodeServer: Server;

    constructor(
        private configurator: IConfigurator,
        private routes: IRoutesConfigurator) {
        this.app = express();
        this.app.use(configurator.Settings);
        this.nodeServer = this.app.listen(configurator.Port);
        this.app.use(routes.Router);
        this.app.use(configurator.ErrorHandlingSettings);
        console.log("Hello World");
    }
}

export const srv = new Main1(new Configurator(), new RoutesConfigurator());
