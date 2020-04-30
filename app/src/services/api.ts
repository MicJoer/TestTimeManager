export async function getHoursByDate(
    date: Date
): Promise<{ fromDateTime: Date; toDateTime: Date }[]> {
    return (
        await getData(`http://localhost:8080/getHoursByDate`, { date })
    ).map((x: any) => {
        return {
            fromDateTime: new Date(x.fromDateTime),
            toDateTime: new Date(x.toDateTime)
        };
    });
}

export async function getHourSumByMonth(date: Date) {
    return await getData(`http://localhost:8080/getHourSumByMonth`, { date });
}

export async function setHoursOnDate(fromDateTime: Date, toDateTime: Date) {
    await postData(`http://localhost:8080/setHoursOnDate`, {
        fromDateTime,
        toDateTime
    });
}

async function postData(url: string, data: any) {
    const response = await fetch(url, {
        method: "POST",
        mode: "no-cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        body: urlEncodeData(data)
    });
}

async function getData(url: string, data: any) {
    let out: any = {};
    await new Promise((res) => {
        fetch(url + "?" + urlEncodeData(data), {
            method: "GET",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                out = data;
                res();
            })
            .catch((err) => {});
    });
    return out;
}

function urlEncodeData(data: any) {
    let output: any[] = [];
    for (let property in data) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(JSON.stringify(data[property]));
        output.push(encodedKey + "=" + encodedValue);
    }
    return output.join("&");
}
