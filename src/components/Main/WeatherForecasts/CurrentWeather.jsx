import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./CurrentWeather.scss"

const api = {
  key: process.env.REACT_APP_WEATHER_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/weather",
}

const CurrentWeather = (weatherTemp) => {

  const dateBuilder = () => {
    const d = new Date();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    
    return `${day} ${date} ${month} ${year}`
  }

  // HERE IS CURRENT GEOPOSITION 

  useEffect(() => {
    let options = {
      enableHighAccuracy: true,
      timeout: 5,
      maximumAge: 0,
    };
    function success(pos) {
      let crd = pos.coords;
      setLatCurCity(crd.latitude);
      setLonCurCity(crd.longitude);
    };
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  const [latCurCity, setLatCurCity] = useState([]);
  const [lonCurCity, setLonCurCity] = useState([]);

  // HERE IS THE WEATHER IN THE CURRENT GEOPOSITION

  const [weatherCurPos, setweatherCurPos] = useState([]);
  useEffect(() => {
    function getCurrentWeather() {
       axios.get(`${api.base}?lat=${latCurCity && 50.4333}&lon=${lonCurCity && 30.5167}&units=metric&appid=${api.key}`)
      .then(response => setweatherCurPos(response.data))
      .catch(error => {
        console.log(error);
      })
    }
    getCurrentWeather();
  }, []);

  return (
    <>
      {
        (typeof weatherTemp.weatherTemp.main !== "undefined") ? (
          <div>
            <div className='location-box'>
              <div className='location'>{weatherTemp.weatherTemp.name}, {weatherTemp.weatherTemp.sys.country}</div>
              <div className='date'>{dateBuilder()}</div>
            </div>
            <div className='weather-box'>
              <div className='temp'>
                {Math.round(weatherTemp.weatherTemp.main.temp)}°C
              </div>
              <div className='weather-condition'>{weatherTemp.weatherTemp.weather[0].main}</div>
            </div>
          </div>
        ) : (typeof weatherCurPos.name !== "undefined") ?
        (
          <div>
            <div className='location-box'>
              <div className='location'>{weatherCurPos.name}, {weatherCurPos.sys.country}</div>
              <div className='date'>{dateBuilder()}</div>
            </div>
            <div className='weather-box'>
              <div className='temp'>
                {Math.round(weatherCurPos.main.temp)}°C
              </div>
              <div className='weather-condition'>{weatherCurPos.weather[0].main}</div>
            </div>
          </div>
        ) : ("")
      }
    </>
  )
}

export default CurrentWeather;