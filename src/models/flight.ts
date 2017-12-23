import * as Moment from 'moment';

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

        const format = 'YYYY-MM-DD hh:mm';
        this.Airline = airline;
        this.StartDate = Moment(startDate).format(format);
        this.FinishDate = Moment(finishDate).format(format);
        this.Plane = plane;
        this.Price = price;
    }
}