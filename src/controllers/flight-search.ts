import { Airports } from './../business/airports';
import { IAirport } from './../models/airport';
import * as Moment from 'moment';
import { Flights } from './../business/flights';
import { Request, Response } from "express";
import * as ExpressValidator from "express-validator";
import { RequestError } from "./request-error";

export let FlightSearch = async (req: Request, res: Response) => {
    const DATE: string = "date";
    const FROM: string = "from";
    const TO: string = "to";

    req.checkQuery(DATE, 'Invalid date! Should be in following format: YYYY-MM-DD').isDate();
    req.checkQuery(FROM, 'Invalid airport shortcut! Should be three letters').isAlpha().isLength({ min: 3, max: 3 });
    req.checkQuery(TO, 'Invalid airport shortcut! Should be three letters').isAlpha().isLength({ min: 3, max: 3 });

    let validationResult = await req.getValidationResult();

    if (validationResult.isEmpty()) {
        let flights = await Flights.Search(req.query[DATE], req.query[FROM], req.query[TO])
        
        if(flights) res.send(flights);
        else throw new RequestError('No flights available');
    }
    else {
        throw new RequestError("There are validation errors", validationResult.array());
    }
};