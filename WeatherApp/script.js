document.addEventListener("DOMContentLoaded", async () => {
  const inputValue = document.getElementById("input-text");
  const btn = document.getElementById("get-weather");
  const displayContainer = document.getElementById("display-container");
  const cityName = document.getElementById("city-name");
  const temperature = document.getElementById("temperature");
  const description = document.getElementById("description");
  const displayError = document.getElementById("display-error");

  const API_KEY = "650af876975bfb9ea32537e487fa2aff";

  btn.addEventListener("click", async () => {
    btn.disabled = true;
    const city = inputValue.value.trim();
    if (!city) return;
    try {
      const data = await fetchWeatherData(city);
      desplayWeatherData(data);
    } catch (error) {
      showError();
    } finally{
        btn.disabled = false;
        inputValue.value=""
    }
   
  });

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not Found");
    }
    const data = await response.json();
    return data;
  }

  function desplayWeatherData(data) {
    const { name, main, weather } = data;
    cityName.innerText = data.name;
    temperature.innerText = `Temperature: ${data.main.temp}°C`;
    description.innerText = `Description: ${data.weather[0].description}`;
    displayContainer.classList.remove("hidden");
    displayError.classList.add("hidden");
  }

  function showError() {
    displayContainer.classList.add("hidden");
    displayError.classList.remove("hidden");
  }
});
