import { RequestError } from './request-error';
import { Airports } from './../business/airports';
import { Request, Response } from "express";
import * as ExpressValidator from "express-validator";

export let GetAirports = async (req: Request, res: Response) => {
    let query: string = req.query['q'];

    req.checkQuery('q', 'Incorrect query, should be at least 2 characters and at most 10')
        .isAlpha()
        .isLength({ min: 2, max: 10 });

    let validationResult = await req.getValidationResult();

    if (validationResult.isEmpty()) {
        let airports = await Airports.Get(req.query['q']);

        if (airports) res.send(airports);
        else throw new RequestError('No airports available');
    }
    else {
        throw new RequestError("There are validation errors", validationResult.array());
    }
};