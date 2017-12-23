export class RequestError extends Error {
    public errorObject: object;
    
    constructor(message: string, errorObject?: any) {
        super(message);
        this.errorObject = errorObject;
    }
}