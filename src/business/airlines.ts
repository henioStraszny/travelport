import { Airline, IAirline } from './../models/airline';
import { LocomoteService } from './../service/locomote-service';

export class Airlines {
    public static async Get(): Promise<Array<IAirline>> {      
        let response = await LocomoteService.GetAirlines();
        let airLines: Array<IAirline> = [];
        
        for (var i = 0; i < response.length; i++) {
            airLines.push(new Airline(response[i].code, response[i].name));
        }

        return airLines;
    }
}