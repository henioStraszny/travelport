export class Airline implements IAirline {
    public Code: string;
    public Name: string;
    
    constructor(code: string, name: string) {
        this.Code = code;
        this.Name = name;
    }
}

export interface IAirline {
    Code: string;
    Name: string;
}