import { FlightSearch } from './controllers/flight-search';
import { GetAirports } from './controllers/airports';
import { GetAirlines } from './controllers/airlines';
import { Router } from 'express';

export class RoutesConfigurator implements IRoutesConfigurator {
    Router: Router;
    constructor() {
        this.Router = Router();
        this.Router.get('/airlines', GetAirlines);
        this.Router.get('/airports', GetAirports);
        this.Router.get('/flight_search', FlightSearch);
    }
}

export class IRoutesConfigurator {
    Router: Router;
}