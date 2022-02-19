import React, { useEffect, useState } from 'react';
import "./CurrentWeather.scss"

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
  // console.log(dateBuilder());
  // console.log(weatherTemp.weatherTemp.main);

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
        ) : 
        (
          <div>
          <div className='location-box'>
            <div className='location'>хуйня якась</div>
            <div className='date'>{dateBuilder()}</div>
          </div>
          <div className='weather-box'>
            <div className='temp'>
              піздєц
            </div>
            <div className='weather-condition'>ніхуя не ясно</div>
          </div>
        </div>
        )
      }
    </>
  )
}

export default CurrentWeather;