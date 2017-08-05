import { RequestError } from './../controllers/request-error';
import { IAirport } from './../models/airport';
import { Airlines } from './airlines';
import { Flight, IFlight } from './../models/flight';
import { ClientOptions } from './../configuration/client';
import * as rp from "request-promise";
import { URLSearchParams, URL } from "url";
import { Airports } from "./airports";
//switch imports to common.js

export class Flights {
    public static async Search(
        date: string,
        from: string,
        to: string): Promise<Array<IFlight>> {

        await this.ValidateAirport(from);
        await this.ValidateAirport(to);
        let airlines = await Airlines.Get();
        let response: Array<any> = [];
        let result: Array<IFlight> = [];
        for (var i = 0; i < airlines.length; i++) {
            response.push(await this.SearchOneAirline(airlines[i].Code, date, from, to));
        }

        for (var i = 0; i < response.length; i++) {
            for (var j = 0; j < response[i].length; j++) {
                var element = response[i][j];
                result.push(new Flight(
                    response[i][j].airline.name,
                    response[i][j].start.dateTime,
                    response[i][j].finish.dateTime,
                    response[i][j].plane.shortName,
                    response[i][j].price
                ));
            }
        }
        
        if(result.length == 0)
            throw new RequestError('No flights available');

        return result;
    }

    private static async SearchOneAirline(
        airlineCode: string,
        date: string,
        from: string,
        to: string) {

        let options = ClientOptions;
        const URI: string = "flight_search";
        let searchParams: URLSearchParams = new URLSearchParams();
        searchParams.append("date", date);
        searchParams.append("from", from);
        searchParams.append("to", to);
        //TODO: Find library fo building uri worst case use string builder
        options["uri"] = URI
            + '/'
            + airlineCode
            + '?' + searchParams.toString();

        return await rp.get(options);
    }

    private static async ValidateAirport(airportShortcut: string) {
        let airports: Array<IAirport> = await Airports.Get(airportShortcut);
        for (var i = 0; i < airports.length; i++) {
            if (airports[i].Code == airportShortcut)
                return;
        }

        throw new RequestError("Couldn't find airport.", airportShortcut);
    }
}