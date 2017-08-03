import { Request, Response } from "express";
import * as http from 'http';

let options = {
    host: '52.9.251.224',
    port: 80,
    path: '/code-task/airlines'//,//sss,
    // headers: {
    //     "Connection": "keep-alive",
    //     "Cache-Control": "max-age=0",
    //     "Upgrade-Insecure-Requests": ",",
    //     "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36",
    //     "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
    //     "Accept-Encoding": " gzip, deflate",
    //     "Accept-Language": "pl-PL,pl;q=0.8,en-US;q=0.6,en;q=0.4"
    // }
};

export let GetAirlines = async (req: Request, res: Response) => {
    let airlines = await http.request(options);
    console.log(airlines);
    res.sendStatus(200);
    // res.send(airlines);
    // http.request(options, (resi) => { console.log(resi.pipe(res)) }).pipe(res);
};