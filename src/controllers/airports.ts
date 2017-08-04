import { Airports } from './../business/airports';
import { Request, Response } from "express";

export let GetAirports = async (req: Request, res: Response) => {
    let query: string = req.query['q'];
    
    if (query && query.length > 1) {
        res.send(await Airports.Get(req.query['q']));
    }
    else {
        res.sendStatus(404);
    }
};