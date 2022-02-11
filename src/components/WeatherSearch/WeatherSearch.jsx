import React, { useEffect, useState } from 'react';
import GoogleLocation from '../Main/GoogleLocation';
import './WeatherSearch.scss'

const api = {
  key: "3b75e49de3f51189582a63bfa7a0c8c1",
  base: "https://api.openweathermap.org/data/2.5/",
}

 const getCordinates = (lat, lon) => {
  let locationLatitude = lat;
  let locationLongitude = lon; 
  console.log(locationLatitude);
  console.log(locationLongitude);
  return {locationLatitude, locationLongitude}
}
getCordinates()

function WeatherSearch() {
  const [query, setQuery] = useState([]);
  const [weather, setWeather] = useState({});
  
  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.table(result);
        getCordinates((result.coord.lat), (result.coord.lon));
      });
    }
  }

//   const ass = (getCordinates) => {
//     console.log(lat);
//   }
// ass()

// const getCordinates = () => {
//   if (typeof weather.coord !== "undefined") {
//     let locationLatitude = weather.coord.lat;
//     let locationLongitude = weather.coord.lon; 
//     return {locationLatitude, locationLongitude};
//   }
// }
// console.log(getCordinates());


    const dateBuilder = (d) => {
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
      
      return `${day} ${date} ${month} ${year}`
    }
    // getCordinates=this.locationLatitude

  return (
    <>
      {/* <GoogleLocation /> */}
      <section className={(typeof weather.main != "undefined") 
      ? ((weather.main.temp > 16) 
      ? 'app warm' 
      : 'app')
      : 'app'}>
        <main>
          <div className='search-box'>
            <input
              type="text"
              className="search-bar"
              list="country"
              placeholder="Search..."
              onChange={e => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
            />
          </div>
          {(typeof weather.main !== "undefined") ? (
            <div>
              <div className='location-box'>
                <div className='location'>{weather.name}, {weather.sys.country}</div>
                <div className='date'>{dateBuilder(new Date())}</div>
              </div>
              <div className='weather-box'>
                <div className='temp'>
                  {Math.round(weather.main.temp)}°C
                </div>
                <div className='weather'>{weather.weather[0].main}</div>
              </div>
            </div>
          ) :('')}
        </main>
      </section>
    </>
  );
}

export default WeatherSearch;

