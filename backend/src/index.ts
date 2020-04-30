import * as express from "express";
import { Request, Response } from "express";
import { addHourEntry, getHourSumByMonth, getHoursByDate } from "./datastore";

var cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 8080;

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post("/setHoursOnDate", async (req, res) => {
    requestManager( req, res, ( req ) => {
        const { fromDateTime, toDateTime } = req.body;
        if (fromDateTime === undefined) throw "Error, from dateTime missing";
        if (toDateTime === undefined) throw "Error, to dateTime missing";

        addHourEntry({
            fromDateTime: new Date(JSON.parse(fromDateTime)),
            toDateTime: new Date(JSON.parse(toDateTime))
        });

        return `{ status: 'ok' }`;
    })
});

app.get("/getHoursByDate", async (req, res) => {
    requestManager( req, res, ( req ) => {
        const date = req.query.date;
        const data = getHoursByDate(new Date(JSON.parse(date as string))) || [];

        return `${JSON.stringify(data)}`
    })
});

app.get("/getHourSumByMonth", async (req, res) => {
    requestManager( req, res, ( req ) => {
        const date = req.query.date;
        if (date === undefined) throw "Date missing";

        const hourSum = getHourSumByMonth(new Date(JSON.parse(date as string)));
        if (hourSum) {
            return JSON.stringify(hourSum);
        } else {
            return `[]`;
        }
    })
});

function requestManager( req: Request, res: Response, fnc: ( req: Request ) => string | undefined ) {
    try {
        const output = fnc( req )
        if( output === undefined) throw "Unexpected error"
        res.send(output);
    } catch (e) {
        res.status(500).send("Error: " + e);
    }
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
