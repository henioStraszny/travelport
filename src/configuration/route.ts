import { AsyncMiddleware } from './../helpers/async-middleware';
import { FlightSearch } from './../controllers/flight-search';
import { GetAirports } from './../controllers/airports';
import { GetAirlines } from './../controllers/airlines';
import { Router } from 'express';

export class RoutesConfigurator implements IRoutesConfigurator {
    Router: Router;
    constructor() {
        this.Router = Router();
        this.Router.get('/airlines', AsyncMiddleware(GetAirlines));
        this.Router.get('/airports', AsyncMiddleware(GetAirports));
        this.Router.get('/flight_search', AsyncMiddleware(FlightSearch));
    }
}

export class IRoutesConfigurator {
    Router: Router;
}