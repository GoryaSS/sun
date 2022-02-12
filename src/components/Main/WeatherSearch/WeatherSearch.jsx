import React, { useEffect, useState } from 'react';
import CurrentWeather from '../WeatherForecasts/CurrentWeather'
import FourDayForecast from '../WeatherForecasts/FourDayForecast'
import './WeatherSearch.scss'


const api = {
  key: "3b75e49de3f51189582a63bfa7a0c8c1",
  base: "https://api.openweathermap.org/data/2.5/",
}

function WeatherSearch() {
  const [query, setQuery] = useState([]);
  const [weather, setWeather] = useState({});
  
  const [latitude, setLatitude] = useState([]);
  const [longitude, setLongitude] = useState([]);

  // const [search, setSearch] = useState([]);


  // useEffect(() => {
    const search = evt => {
      if (evt.key === "Enter") {
        fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.table(result);
          let coordLat = result.coord.lat;
          let coordLon = result.coord.lon;
          setLatitude(coordLat);
          setLongitude(coordLon);
          // getCordinates(coordLat, coordLon);
        });
      }
    }
  // }, []);


  
  return (
    <>
      {/* <GoogleLocation coordLatLon = {{latitude: latitude, longitude: longitude}}/> */}
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
          <CurrentWeather weatherTemp ={weather} />
          <FourDayForecast />
        </main>
      </section>
    </>
  );
}

export default WeatherSearch;

