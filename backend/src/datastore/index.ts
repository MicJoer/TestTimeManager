import { LowDb } from "./lowdb";
import { dateToDMY, DMYToDateString } from "../helpers";

const db = new LowDb();
export function addHourEntry(timeInterval: { fromDateTime: Date, toDateTime: Date }) {
    db.addHoursEntry(timeInterval);
}

export function getHourSumByMonth(date: Date) {
    const data = db.getHoursByMonth(date);
    if (data === undefined) return undefined;

    const hourDateArray = data.map(timeIntervalToDateHours);

    const hourUniqueDateArray: { dateString: string; hours: number }[] = [];
    hourDateArray.forEach((entry) => {
        const alreadyExistInIndex = hourUniqueDateArray.findIndex(
            (x) => x.dateString === entry.dateString
        );
        const shouldAddToArray = alreadyExistInIndex === -1;
        if (shouldAddToArray) {
            hourUniqueDateArray.push(entry);
        } else {
            hourUniqueDateArray[alreadyExistInIndex].hours += entry.hours;
        }
    });

    return hourUniqueDateArray;
}

export function getHoursByDate(date: Date) {
    const data = db.getHoursByDate(date);
    if (data === undefined) return undefined;
    return data;
}

function timeIntervalToDateHours(interval: { fromDateTime: Date, toDateTime: Date }) {
    const dateString = getIntervalDate(interval.fromDateTime);

    const hours = calcTimeDiffHours(interval.fromDateTime, interval.toDateTime);
    return { dateString, hours };
}

function getIntervalDate(date: Date) {
    const { year, month, day } = dateToDMY(date);
    return DMYToDateString(year, month, day);
}

function calcTimeDiffHours(fromDate: Date, toDate: Date) {
    return (
        Math.round(((toDate.getTime() - fromDate.getTime()) / 3600e3) * 1e2) *
        1e-2
    );
}
