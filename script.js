function DateTime(response) {
    const datetime = new Date();
    
    const hour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
    const min = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
    const sec = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = days[datetime.getDay()];
    const date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = months[datetime.getMonth()];
    const year = datetime.getFullYear();
    return (response === "time") ? 
        (hour + ":" + min + ":" + sec) 
            : (response === "date") ? 
                (day + ", " + date + " " + month) 
        : null; 
}

window.setInterval(() => {
    document.getElementById("current-time").innerText = DateTime("time");
    document.getElementById("current-date").innerText = DateTime("date");
}, 1000);


if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        const location = {
            "lat" : position.coords.latitude, 
            "lon" : position.coords.longitude
        }

        const APP_ID = "Your OpenWeather.org's API APP_ID";

        fetch(`https://api.openweathermap.org/data/2.5/weather?appid=${APP_ID}&lat=${location.lat}&lon=${location.lon}&units=metric`)
            .then(res => res.json())
            .then((resdata) => {
                document.getElementById("place").innerHTML = resdata.name;
                document.getElementById("temp").innerHTML = Math.floor(resdata.main.temp) + "<sup>o</sup>";
                document.getElementById("temp-des").innerHTML = resdata.weather[0].main;
            });
    });
} else {
    console.log("Error");
}