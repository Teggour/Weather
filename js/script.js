let elementDateAndTime = document.querySelector(".weather-info__date-time"),
    elementGeo = document.querySelector(".weather-info__geolocation"),
    elementInfoIMG = document.querySelector(".weather-info__info-img"),
    elementInfoTxt = document.querySelector(".weather-info__info-txt"),
    elementDescr = document.querySelector(".weather-info__descr"),
    elementWind = document.querySelector(".about-weather__wind"),
    elementHumidity = document.querySelector(".about-weather__humidity"),
    elementVisibility = document.querySelector(".about-weather__visibility"),
    elementPressure = document.querySelector(".about-weather__pressure");

// from "json/city.list.json"
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

function changeDOM(obj) { 
    myDate = getDate()
        elementDateAndTime.innerText = `${myDate.weakDay}, ${myDate.dayOfMonth} ${myDate.month}, ${myDate.hours}:${myDate.minutes}`

    // date and time
    setInterval(() => {
        myDate = getDate()
        elementDateAndTime.innerText = `${myDate.weakDay}, ${myDate.dayOfMonth} ${myDate.month}, ${myDate.hours}:${myDate.minutes}`
    }, 1*1000)

    //
    elementGeo.innerText = `${obj.name}, ${obj.sys.country}`

    elementInfoIMG.src = `${obj.weather[0].iconURL}`
    elementInfoIMG.alt = `icon`
    elementInfoTxt.innerText = `${convertK_To_C(obj.main.temp)}°`

    elementDescr.innerText = `Feels like ${convertK_To_C(obj.main.feels_like)}°. ${obj.weather[0].main}. ${obj.weather[0].description}.`

    elementWind.innerText = `Wind: ${obj.wind.speed}m/s`
    elementVisibility.innerText = `Visibility: ${(obj.visibility/1000).toFixed(2)}km`
    elementPressure.innerText = `Pressure: ${obj.main.pressure}hPa`
    elementHumidity.innerText = `Humidity: ${obj.main.humidity}%`
}

fetch(`http://api.openweathermap.org/data/2.5/weather?id=${cityID}&appid=${keyAPI}&lang=${lang}`)
    .then((response) => {
        return response.json();
    })

    .then((data) => {
        let { name, main, weather, wind, sys, visibility } = data;
        weather[0].iconURL = createURLForIMG(weather[0].icon)

        let myDate = getDate()

        changeDOM({ name, main, weather, wind, sys, visibility })
    });
