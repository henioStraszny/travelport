import { RequestError } from './../controllers/request-error';
import { IAirport, Airport } from './../models/airport';
import { Flight, IFlight } from './../models/flight';
import { LocomoteService } from './../service/locomote-service';

export class Flights {
    public static async Search(
        date: string,
        from: string,
        to: string): Promise<Array<IFlight>> {

        await this.ValidateAirport(from);
        await this.ValidateAirport(to);
        let airlines = await LocomoteService.GetAirlines();
        let response: Array<any> = [];
        let result: Array<IFlight> = [];
        for (var i = 0; i < airlines.length; i++) {
            response.push(await LocomoteService.FlightSearch(airlines[i].Code, date, from, to));
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

    private static async ValidateAirport(airportShortcut: string) {
        let result: Array<any> = await LocomoteService.GetAirports(airportShortcut);
        let airports: Array<IAirport> = [];

        for (var i = 0; i < result.length; i++) {
            airports.push(new Airport(result[i]));
        }

        for (var i = 0; i < airports.length; i++) {
            if (airports[i].Code == airportShortcut)
                return;
        }

        throw new RequestError("Couldn't find airport.", airportShortcut);
    }
}