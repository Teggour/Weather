let cityName = "Zaporozhe",
    countryName = "UA",
    cityID = "697107";

const keyAPI = "9487a2a81edbb899e539bf9c2b800a8f", // from https://openweathermap.org/
    lang = "en";

// convert kelvin to celsius
function convertK_To_C(tempK) {
    return (Math.round(+tempK - 273.15))
}

function createURLForIMG(id) {
    return (`https://openweathermap.org/img/wn/${id}@2x.png`)
}

function getDate() {
    let date = new Date();
    return (
        {
            weakDay: new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date),
            minutes: new Intl.DateTimeFormat('en-US', { minute: 'numeric' }).format(date),
            hours: new Intl.DateTimeFormat('en-US', { hour12: false, hour: 'numeric' }).format(date),
            dayOfMonth: new Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(date),
            month: new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date),
            year: new Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(date)
        }
    )
}

fetch(`http://api.openweathermap.org/data/2.5/weather?id=${cityID}&appid=${keyAPI}&lang=${lang}`)
    .then((response) => {
        return response.json();
    })

    .then((data) => {
        let { name, main, weather, wind, sys } = data;
        weather[0].iconURL = createURLForIMG(weather[0].icon)

        let myDate = getDate()

        // setInterval(() => {
        //     myDate = getDate()
        //     document.querySelector(".weather-info").innerHTML = `${myDate.hours}:${myDate.minutes}`
        // }, 1000)

        console.log({ name, main, weather, wind, sys })
        console.log(data)
    });
