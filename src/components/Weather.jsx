import React, { useEffect, useState, useRef, useCallback } from "react";
import "./Weather.css";
import searchIcon from "../assets/search.png";

// Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import clearIcon from "../assets/clear.png";
import cloudIcon from "../assets/cloud.png";
import drizzleIcon from "../assets/drizzle.png";
import rainIcon from "../assets/rain.png";
import snowIcon from "../assets/snow.png";
import windIcon from "../assets/wind.png";
import humidityIcon from "../assets/humidity.png";

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": cloudIcon,
    "02n": cloudIcon,
    "03d": cloudIcon,
    "03n": cloudIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "13d": snowIcon,
    "13n": snowIcon,
  };

  const showToastEnterCity = () => {
    toast.error("Enter City!", {
      style: { borderRadius: "15px", background: "#f0f0f0", color: "#333" },
      position: "top-right",
      autoClose: 3000,
      theme: "light",
    });
  };

  const showToastApi = () => {
    toast.error("Error while fetching weather data!", {
      style: { borderRadius: "15px", background: "#f0f0f0", color: "#333" },
      position: "top-right",
      autoClose: 3000,
      theme: "light",
    });
  };
  const showToastCityNotFound = () => {
    toast.error("city not found!", {
      style: { borderRadius: "15px", background: "#f0f0f0", color: "#333" },
      position: "top-right",
      autoClose: 3000,
      theme: "light",
    });
  };

  const search = useCallback(async (city) => {
    if (city === "") {
      showToastEnterCity();
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_URL}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        showToastCityNotFound();
        return;
      }

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: allIcons[data.weather[0].icon] || clearIcon,
      });
    } catch (error) {
      console.error("Fetch error:", error);
      showToastApi();
    }
  }, []);

  useEffect(() => {
    search("nashik");
  }, [search]);

  return (
    <div className="weather">
      <ToastContainer />
      <div className="search-bar">
        <input type="text" ref={inputRef} placeholder="Search" />
        <img
          src={searchIcon}
          alt="search logo"
          onClick={() => search(inputRef.current.value)}
        />
      </div>

      {weatherData ? (
        <>
          <img src={weatherData.icon} className="weather-icon" alt="" />
          <p
            className="temperature"
            style={{
              color: "#ffff",
              fontSize: "9vh",
              lineHeight: "1",
            }}
          >
            {weatherData.temperature}°c
          </p>
          <p className="location">{weatherData.location}</p>

          <div className="weather-data">
            <div className="col">
              <img src={humidityIcon} alt="" />
              <div>
                <p>{weatherData.humidity}</p>
                <span>Humidity</span>
              </div>
            </div>

            <div className="col">
              <img src={windIcon} alt="" />
              <div>
                <p>{weatherData.windSpeed}</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Weather;
