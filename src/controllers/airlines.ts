import { Airlines } from './../business/airlines';
import { Request, Response } from "express";

export let GetAirlines = async (req: Request, res: Response) => {
    res.send(await Airlines.Get());
};