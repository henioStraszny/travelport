import { Airports } from './../business/airports';
import { IAirport } from './../models/airport';
import * as Moment from 'moment';
import { Flights } from './../business/flights';
import { Request, Response } from "express";

export let FlightSearch = async (req: Request, res: Response) => {
    const DATE: string = "date";
    const FROM: string = "from";
    const TO: string = "to";
    //TODO: format string
    let date = req.query[DATE];
    let from = req.query[FROM];
    let to = req.query[TO];

    if (validateDate(date) && validateAirport(from) && validateAirport(to)) {
        res.send(await Flights.Search(date, from, to));
    }
    else {
        res.sendStatus(404);
    }
};

let validateDate = (date: string) => {
    return date && Moment(date);
}

let validateAirport = async (aitportShortcut: string) => {
    let airports: Array<IAirport> = await Airports.Get(aitportShortcut);

    for (var i = 0; i < airports.length; i++) {
        if(airports[i].Code == aitportShortcut)
            return true;
    }

    return false;
}