export function dateValidator(text: string) {
    const isValidDate = text.match(/^\d{4}-\d{2}-\d{2}$/);
    return isValidDate;
}

export function combineDateAndTime(date: string, time: string) {
    return new Date(`${date}T${time}:00Z`);
}


export function addDaysToDate(date: Date, days: number) {
    var date = new Date(date.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

export function dateToDateString(date: Date) {
    return date.toISOString().substr(0, 10);
}

export function dateToTimeString(date: Date) {
    return date.toISOString().substr(11, 5);
}
