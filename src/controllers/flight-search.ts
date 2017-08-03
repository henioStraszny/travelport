import { Request, Response } from "express";

export let FlightSearch = (req: Request, res: Response) => {
    if (req.query['q']) {
        res.send(
            [
                {
                    "airportCode": "MLB",
                    "airportName": "Melbourne International Arpt",
                    "cityCode": "MLB",
                    "cityName": "Melbourne",
                    "countryCode": "US",
                    "countryName": "United States",
                    "latitude": 28.102753,
                    "longitude": -80.645258,
                    "stateCode": "FL",
                    "timeZone": "America/New_York"
                },
                {
                    "airportCode": "MEL",
                    "airportName": "Tullamarine Arpt",
                    "cityCode": "MEL",
                    "cityName": "Melbourne",
                    "countryCode": "AU",
                    "countryName": "Australia",
                    "latitude": -37.673333,
                    "longitude": 144.843333,
                    "stateCode": "VI",
                    "timeZone": "Australia/Hobart"
                }
            ]
        );
    }
    else {
        res.sendStatus(404);
    }
};