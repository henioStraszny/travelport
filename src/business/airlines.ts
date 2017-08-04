import { Airline, IAirline } from './../models/airline';
import { ClientOptions } from './../configuration/client';
import * as rp from "request-promise";

export class Airlines {
    public static async Get(): Promise<Array<IAirline>> {
        let options = ClientOptions;
        const URI: string = "airlines";
        options["uri"] = URI;
        let response = await rp.get(options);
        let airLines: Array<IAirline> = [];
        
        for (var i = 0; i < response.length; i++) {
            airLines.push(new Airline(response[i].code, response[i].name));
        }

        return airLines;
    }
}