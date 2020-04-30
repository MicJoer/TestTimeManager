import React, { useState, useEffect } from "react";
import { Button, CardFullWidth, PageTitle } from "../shared-styles";
import InputTime from "./input-time";
import { dateToTimeString } from '../../helpers'

export default function PageDate(props: {
    selectedDate: string;
    apiGetHoursByDate: (date: Date) => Promise<IInterval[]>;
    cbAddTime: (date: string, fromTime: string, toTime: string) => void;
}) {
    const { selectedDate, apiGetHoursByDate, cbAddTime } = props;
    const [status, setStatus] = useState<Status>(Status.none);

    const [listOfHours, setListOfHours] = useState<IInterval[]>([]);
    //@ts-ignore
    useEffect(async () => {
        const apiData = await apiGetHoursByDate(
            new Date(selectedDate + "T00:00:00Z")
        );
        setListOfHours(apiData);
    }, []);

    const cbInputTime = (fromTime: string, toTime: string) => {
        cbAddTime(selectedDate, fromTime, toTime);
    };

    return (
        <div>
            <PageTitle>Time registrations on, {selectedDate}</PageTitle>
            <CardFullWidth clickable={false}>
                {status === Status.none ? (
                    <Button
                        onClick={() => {
                            setStatus(Status.addingTime);
                        }}
                    >
                        Add Time
                    </Button>
                ) : (
                    ""
                )}
                {status === Status.addingTime ? (
                    <InputTime cbInputTime={cbInputTime} />
                ) : (
                    ""
                )}
            </CardFullWidth>
            <div>
                {listOfHours.map((row) => {
                    return (
                        <CardFullWidth clickable={false}>
                            From: {dateToTimeString(row.fromDateTime) + ""} to{" "}
                            {dateToTimeString(row.toDateTime) + ""}
                        </CardFullWidth>
                    );
                })}
            </div>
        </div>
    );
}

enum Status {
    none = "none",
    addingTime = "addingTime",
    submitting = "submitting"
}

interface IInterval {
    fromDateTime: Date;
    toDateTime: Date;
}
