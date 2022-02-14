import React, { useEffect, useState } from 'react';
import CurrentWeather from '../WeatherForecasts/CurrentWeather'
import FourDayForecast from '../WeatherForecasts/FourDayForecast'
import axios from 'axios';
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

  // const [search, setState] = useState([]);


  // useEffect(() => {
    const search = evt => {
      if (evt.key === "Enter") {
        axios.get(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(response => setWeather(response.data));
          setQuery(''); // Return an empty input after a search
          console.log(weather);
          setLatitude(weather.coord.lat);
          setLongitude(weather.coord.lon);
      }
    }
  // }, []);

 
  return (
    <>
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
              // list="country"
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

