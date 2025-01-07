const weatherform = document.querySelector(".weatherform");
const cityInput = document.querySelector(".cityInput");
const card= document.querySelector(".card");
const apikey = "1ee42f9f5ef42befcdfe3244bab9def0";
weatherform.addEventListener("submit", async event => {

event.preventDefault();
const city=cityInput.value;
if(city){
    try{
     const weatherdata = await getweatherData(city);
     displayweatherInfo(weatherdata);
    }
    catch(error){
        console.error(error);
        displayerror(error);
    }
   
}else{
    displayerror("Please enter a city");

}
});

async function getweatherData(city){
 const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
 const response = await fetch(apiurl);
 console.log(response);
 if(!response.ok){
    throw new Error("could not fetch weather data");

 }
 return await response.json();
}

function displayweatherInfo(data){
 const {name: city, 
    main: {temp, humidity}, 
    weather: [{description, id}]} = data;

    card.textContent = "";
    card.style.display = "flex";

    const citydisplay = document.createElement("h1");
    
    const tempdisplay = document.createElement("p");
    
    const humiditydisplay = document.createElement("p");
    
    const descdisplay = document.createElement("p");
    
    const weatherEmoji = document.createElement("p");

    citydisplay.textContent = city;
    tempdisplay.textContent = `${temp.toFixed(1)} °C`;

    humiditydisplay.textContent = `Humidity: ${humidity}`;
    descdisplay.textContent=description;
    weatherEmoji.textContent= getWeatherEmoji(id);

    citydisplay.classList.add("citydisplay");
    tempdisplay.classList.add("tempdisplay");
    humiditydisplay.classList.add("humiditydisplay");
    descdisplay.classList.add("descdisplay");
    weatherEmoji.classList.add("weatherEmoji");


    card.appendChild(citydisplay);
    card.appendChild(tempdisplay);
    card.appendChild(humiditydisplay);
    card.appendChild(descdisplay);
    card.appendChild(weatherEmoji);
 
}

function getWeatherEmoji(weatherId){
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "🌦️";
             case (weatherId >= 300 && weatherId < 400):
            return "🌦️";
             case (weatherId >= 500 && weatherId < 600):
            return "🌦️";
             case (weatherId >= 600 && weatherId < 700):
            return "❄️";
             case (weatherId >= 700 && weatherId < 800):
            return "😶‍🌫️";
             case (weatherId === 800):
            return "☀️";
             case (weatherId >= 801 && weatherId < 810):
            return "😶‍🌫️";
        default:
            return "❓";
    }

}
function displayerror(message){
    const errordisplay = document.createElement("p");
    errordisplay.textContent=message;
    errordisplay.classList.add("errordisplay");

    card.textContent = "";
    card.style.display="flex";
    card.appendChild(errordisplay);
}