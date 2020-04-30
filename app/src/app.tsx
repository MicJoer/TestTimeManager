import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams
} from "react-router-dom";
import "./fonts.css";

import { ContentArea } from "./app.style";
import { dateValidator, combineDateAndTime } from "./helpers";
import Header from "./components/header";
import PageOverview from "./components/page-overview";
import PageDate from "./components/page-date";
import * as api from "./services/api";

function App() {
    return (
        <div>
            <Router>
                <Header />
                <ContentArea>
                    <Switch>
                        <Route path="/date/:selectedDate">
                            <ShowPageDate />
                        </Route>
                        <Route path="/about">Dummy</Route>
                        <Route path="/">
                            <ShowPageOverview />
                        </Route>
                    </Switch>
                </ContentArea>
            </Router>
        </div>
    );
}

/* #region Pages */
function ShowPageDate() {
    let { selectedDate } = useParams();

    const isValidDate = dateValidator(selectedDate);
    if (!isValidDate) throw "Router date is invalid";

    const cbSubmitTimeToDb = (
        date: string,
        fromTime: string,
        toTime: string
    ) => {
        const fromDateTime = combineDateAndTime(date, fromTime);
        const toDateTime = combineDateAndTime(date, toTime);
        api.setHoursOnDate(fromDateTime, toDateTime).then((x) => {
            window.location.reload();
        });
    };

    return (
        <PageDate
            selectedDate={selectedDate}
            apiGetHoursByDate={apiGetHoursByDate}
            cbAddTime={cbSubmitTimeToDb}
        />
    );
}

function ShowPageOverview() {
    return <PageOverview apiGetHourSumByMonth={apiGetHourSumByMonth} />;
}
/* #endregion */

/* #region Api Connectors */
async function apiGetHoursByDate(date: Date) {
    return await api.getHoursByDate(date);
}

async function apiGetHourSumByMonth(): Promise<
    { dateString: string; hours: number }[]
> {
    return await api.getHourSumByMonth(new Date());
}
/* #endregion */


export default App;
