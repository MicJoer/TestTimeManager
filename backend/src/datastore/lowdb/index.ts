import { ITimeInterval, DbDocumentNames } from "./index.types";
import { dateToDMY } from "../../helpers";

export class LowDb {
    db: any;
    constructor() {
        const FileSync = require("lowdb/adapters/FileSync");
        const lowdb = require("lowdb");
        const adapter = new FileSync("lowdb.json");
        this.db = lowdb(adapter);
        this.db.defaults({ [DbDocumentNames.hoursSingleDay]: [] }).write();
    }

    addHoursEntry(timeInterval: ITimeInterval) {
        const { year, month, day } = dateToDMY(timeInterval.fromDateTime);
        this.db
            .get(DbDocumentNames.hoursSingleDay)
            .push({ year, month, day, timeInterval })
            .write();
    }

    getHoursByDate(date: Date): ITimeInterval[] | undefined {
        const { year, month, day } = dateToDMY(date);
        const dbOutput = this.db
            .get(DbDocumentNames.hoursSingleDay)
            .filter({ year, month, day })
            .value();
        if (dbOutput === undefined) return;

        return dbOutput.map((entry: any) => {
            return {
                fromDateTime: dbDateToDate(entry.timeInterval.fromDateTime),
                toDateTime: dbDateToDate(entry.timeInterval.toDateTime)
            };
        });
    }

    getHoursByMonth(date: Date): ITimeInterval[] | undefined {
        const { year, month } = dateToDMY(date);
        const dbOutput = this.db
            .get(DbDocumentNames.hoursSingleDay)
            .filter({ year, month })
            .value();
        if (dbOutput === undefined) return;

        return dbOutput.map((entry: any) => {
            return {
                fromDateTime: dbDateToDate(entry.timeInterval.fromDateTime),
                toDateTime: dbDateToDate(entry.timeInterval.toDateTime)
            };
        });
    }
}

function dbDateToDate(str: string) {
    return new Date(str);
}
