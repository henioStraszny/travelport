export class Airport implements IAirport{
    City: string;
    Code: string;
    Country: string;
    Name: string;

    constructor(airport: any) {
        this.City = airport.cityName;
        this.Code = airport.airportCode;
        this.Country = airport.countryName;
        this.Name = airport.airportName;
    }
}

export interface IAirport {
    City: string;
    Code: string;
    Country: string;
    Name: string;
}