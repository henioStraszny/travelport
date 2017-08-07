import { IAirport, Airport } from './../models/airport';
import { LocomoteService } from './../service/locomote-service';

export class Airports {
    public static async Get(query: string): Promise<Array<IAirport>> {

        let airports: Array<IAirport> = [];
        let result = await LocomoteService.GetAirports(query);
        for (var i = 0; i < result.length; i++) {
            airports.push(new Airport(result[i]));
        }
        return airports;
    }
}