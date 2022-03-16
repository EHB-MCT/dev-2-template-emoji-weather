"use strict";
const weatherResultElement = document.getElementById("weatherResult");
const countryResultElement = document.getElementById("countryResult");
const formElement = document.getElementById("form");
formElement.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();
  const { value: city } = document.getElementById("search");
  fetchWeatherData(city);
}

async function fetchWeatherData(city) {
  try {
    const cityWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=d7b955c4c268fe54649d6f0d702b39d1&units=metric`);
    if (!cityWeatherResponse.ok) throw new Error(cityWeatherResponse.statusText);
    const cityWeatherJson = await cityWeatherResponse.json();
    showWeatherData(cityWeatherJson);
    fetchCountryData(cityWeatherJson.sys.country);
  }
  catch (e) {
    weatherResultElement.innerHTML = e;
  }
}

function showWeatherData(weatherData) {
  const { 
    main: {
      temp,
      temp_min,
      temp_max
    },
    weather: [{
      description
    }]
  } = weatherData;
  const htmlString = `
    <h2>Weather</h2>
    <ul>
      <li>Average tempature: ${temp} °C</li>
      <li>Min tempature: ${temp_min} °C</li>
      <li>Max tempature: ${temp_max} °C</li>
      <li>Description: ${description}</li>
    </ul>
  `;
  weatherResultElement.innerHTML = htmlString;
}

async function fetchCountryData(countryCode) {
  try {
    const countryResponse = await fetch(`https://restcountries.eu/rest/v2/alpha/${countryCode}`);
    if (!countryResponse.ok) throw new Error(countryResponse.statusText);
    const countryJson = await countryResponse.json();
    showCountryInfo(countryJson);
  }
  catch (e) {
    countryResultElement.innerHTML = e;
  }
}

function showCountryInfo(countryData) {
  const { 
    name,
    capital,
    region,
    subregion,
  } = countryData;
  const htmlString = `
    <h2>More about: ${name}</h2>
    <ul>
      <li>Capital: ${capital}</li>
      <li>Region: ${region}</li>
      <li>Subregion: ${subregion}</li>
    </ul>
  `;
  countryResultElement.innerHTML = htmlString;
}