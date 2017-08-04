import { IAirport, Airport } from './../models/airport';
import { ClientOptions } from './../configuration/client';
import * as rp from "request-promise";

export class Airports {
    public static async Get(query: string): Promise<Array<IAirport>> {
        let options = ClientOptions;
        const URI: string = "airports";
        options["uri"] = URI;

        try {
            let options = ClientOptions;
            let airports: Array<IAirport> = [];
            //todo: find better way for building query
            options["uri"] = URI + "?q=" + query;
            let result = await rp.get(options);
            for (var i = 0; i < result.length; i++) {
                airports.push(new Airport(result[i]));
            }
            return airports;
        } catch (error) {
            //TODO: find better logger
            console.log(error);
        }
    }
}