import React from "react";
import "./Weather.css";
import searchIcon from "../assets/search.png";

import clearIcon from "../assets/clear.png";
import cloudIcon from "../assets/cloud.png";
import drizzleIcon from "../assets/drizzle.png";
import rainIcon from "../assets/rain.png";
import snowIcon from "../assets/snow.png";
import windIcon from "../assets/wind.png";
import humidityIcon from "../assets/humidity.png";

const Weather = () => {
  return (
    <div className="weather">
      <div className="search-bar">
        <input type="text" name="" value="" id="" placeholder="Search" />
        <img src={searchIcon} alt="search logo" srcset="" />
      </div>

      <img src={clearIcon} className="weather-icon" alt="" srcset="" />
      <p className="temprature">16°c</p>
      <p className="location">London</p>

      <div className="weather-data">
        <div className="col">
          <img src={humidityIcon} alt="" />
          <div>
            <p>91%</p>
            <span>Humidity</span>
          </div>
        </div>

        <div className="col">
          <img src={windIcon} alt="" />
          <div>
            <p>3.6 Km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
