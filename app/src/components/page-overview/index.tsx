import React, { useState, useEffect } from "react";
import { CardFullWidth, PageTitle } from "../shared-styles";
import { SubSection } from "./index.style";
import { addDaysToDate, dateToDateString } from '../../helpers'

export default function PageOverview(props: {
    apiGetHourSumByMonth: () => Promise<
        { dateString: string; hours: number }[]
    >;
}) {
    const { apiGetHourSumByMonth } = props;
    const datesInMonth = getAllDatesInMonth(new Date()).map(
        dateToDateString
    );
    const [dataList, setDataListHours] = useState<
        { hours: number; date: string }[]
    >(datesInMonth.map((date) => ({ hours: 0, date })));

    //@ts-ignore
    useEffect(async () => {
        const apiData = await apiGetHourSumByMonth();
        const newData = datesInMonth.map((date) => {
            const foundHours = apiData.find(
                (dbEntry) => dbEntry.dateString === date
            );
            const hours = foundHours ? foundHours.hours : 0;
            return { hours, date };
        });
        setDataListHours(newData);
    }, []);

    return (
        <div>
            <PageTitle>Time Report for April, 2020</PageTitle>
            {dataList.map((entry) => {
                return (
                    <CardFullWidth
                        clickable={true}
                        onClick={() => {
                            window.location.href = "/date/" + entry.date;
                        }}
                    >
                        <SubSection width={100} height={40}>
                            {entry.date}
                        </SubSection>
                        <SubSection width={200} height={40}>
                            Hours: {entry.hours}
                        </SubSection>
                    </CardFullWidth>
                );
            })}
        </div>
    );
}

function getAllDatesInMonth(date?: Date) {
    const targetDate = date === undefined ? new Date() : date;

    const year = targetDate.getFullYear();
    const month = targetDate.getMonth();

    const targetDateFirstDay = new Date(Date.UTC(year, month, 1));

    let dateIterator = targetDateFirstDay;
    const dateOutput: Date[] = [];
    while (targetDateFirstDay.getMonth() === dateIterator.getMonth()) {
        dateOutput.push(dateIterator);
        dateIterator = addDaysToDate(dateIterator, 1);
    }
    return dateOutput;
}
