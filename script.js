const apikey = "your_real_api_key";
const apiurl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const loading = document.querySelector(".loading");
const dateTime = document.querySelector(".date-time");

function updateDateTime(){
  const now = new Date();
  dateTime.innerHTML = now.toLocaleString();
}
updateDateTime();
async function checkWeather(city) {
  if (city.trim() === "") {
    alert("Please enter a city name");
    return;
  }
  try {
    loading.style.display = "block";
    const response = await fetch(apiurl + city + `&appid=${apikey}`);
    if (!response.ok) {
      loading.style.display = "none";
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    } 
    else {
      const data = await response.json();
      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML =
        Math.round(data.main.temp) + "°C";
      document.querySelector(".humidity").innerHTML =
        data.main.humidity + "%";
      document.querySelector(".wind").innerHTML =
        Math.round(data.wind.speed * 3.6) + " km/h";
      loading.style.display = "none";

      if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "images/clouds.png";
      } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "images/clear.png";
      } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "images/rain.png";
      } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
      } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "images/mist.png";
      }
      else if (data.weather[0].main == "Snow") {
        weatherIcon.src = "images/snow.png";
      }
      document.querySelector(".weather").style.display = "block";
      document.querySelector(".error").style.display = "none";
    }
  } catch (error) {
    loading.style.display = "none";
    alert("Unable to fetch weather data. Check your internet connection.");
  }
  searchbox.value = "";
}

searchbtn.addEventListener("click", () => {
  const city = searchbox.value.trim();

  if (city === "") {
    alert("Please enter a city name");
    return;
  }

  checkWeather(city);
});

searchbox.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const city = searchbox.value.trim();

    if (city === "") {
      alert("Please enter a city name");
      return;
    }

    checkWeather(city);
  }
});