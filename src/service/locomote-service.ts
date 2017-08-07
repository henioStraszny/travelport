import { URLSearchParams, URL } from "url";
import * as rp from "request-promise";
import { IAirport } from './../models/airport';

export class LocomoteService {
    private static readonly baseUrl: string = 'http://node.locomote.com';
    private static readonly flightSearchRoute: string = '/code-task/flight_search';
    private static readonly airportsRoute: string = '/code-task/airports';
    private static readonly airlinesRoute: string = '/code-task/airlines';

    private static readonly clientOptions = {
        port: 80,
        json: true,
        gzip: true
    }

    public static async GetAirlines() {
        let url = new URL(this.airlinesRoute, this.baseUrl);
        let options = this.clientOptions;
        options["uri"] = url.toString();

        return await rp.get(options);
    }

    public static async GetAirports(query: string) {

        let url = new URL(this.airportsRoute, this.baseUrl);
        let searchParams = new URLSearchParams();
        searchParams.append("q", query);
        url.search = searchParams.toString();

        let options = this.clientOptions;
        options["uri"] = url.toString();

        return await rp.get(options);
    }

    public static async FlightSearch(
        airlineCode: string, 
        date: string, 
        from: string, 
        to: string)
        : Promise<Array<IAirport>> {

        let url = new URL(this.airportsRoute, this.baseUrl);
        url.pathname = airlineCode;
        let searchParams = new URLSearchParams();
        searchParams.append("date", date);
        searchParams.append("from", from);
        searchParams.append("to", to);
        url.search = searchParams.toString();

        let options = this.clientOptions;
        options["uri"] = url.toString();

        return await rp.get(options);
    }
}