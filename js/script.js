let cityName = "Zaporozhe",
    countryName = "UA",
    cityID = "697107";

const keyAPI = "9487a2a81edbb899e539bf9c2b800a8f",
    lang = "en";

function convertK_To_C(tempK) {
    return (Math.round(+tempK - 273.15))
}

function makeURL(id) {
    return (`https://openweathermap.org/img/wn/${id}@2x.png`)
}

function dateAndTime() {
    let date = new Date(),
        hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours(),
        minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes(),
        dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date),
        month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date),
        numDayOfMonth = date.getDate()

    return `${dayOfWeek}, ${numDayOfMonth} ${month}, ${hours}:${minutes}`
}

fetch(`http://api.openweathermap.org/data/2.5/weather?id=${cityID}&appid=${keyAPI}&lang=${lang}`)
    .then((response) => {
        return response.json();
    })

    .then((data) => {
        let { name, main, weather, wind } = data;
        let date = dateAndTime()
        console.log(date)

        weather[0].iconURL = makeURL(weather[0].icon)
        console.log({ name, main, weather, wind })

        
    });
