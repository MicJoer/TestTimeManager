export function dateToDMY(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return { year, month, day };
}

export function DMYToDateString(year: number, month: number, day: number) {
    return [year, month + 1, day].map(numToLeadingZeroString).join("-");
}

function numToLeadingZeroString(num: number) {
    return (num + "").padStart(2, "0");
}
