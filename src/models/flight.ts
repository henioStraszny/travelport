export interface IFlight {
    Airline: string;
    StartDate: string;
    FinishDate: string;
    Plane: string;
    Price: string;
}

export class Flight implements IFlight {
    Airline: string;
    StartDate: string;
    FinishDate: string;
    Plane: string;
    Price: string;
    
    constructor(
        airline: string,
        startDate: string,
        finishDate: string,
        plane: string,
        price: string) {
        this.Airline = airline;
        this.StartDate = startDate;
        this.FinishDate = finishDate;
        this.Plane = plane;
        this.Price = price;
    }
}