import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CurrentWeather from './components/Main/WeatherForecasts/CurrentWeather'
import FourDayForecast from './components/Main/WeatherForecasts/FourDayForecast'
import "./App.scss"
import './components/Main/WeatherSearch/WeatherSearch.scss'
import './components/Header/Header.scss';
import weatherIcon from './components/assets/weather-icon.png'


const api = {
  key: "3b75e49de3f51189582a63bfa7a0c8c1",
  base: "https://api.openweathermap.org/data/2.5/",
}

document.addEventListener('DOMContentLoaded', () => {
  const navBar = document.getElementById('toggleNavBar');
  const trigger = document.getElementById('trigger');

  trigger.addEventListener('click', () => {
    navBar.classList.toggle('active');
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const burgerBut = document.getElementById('toggleBurgerBut');
  const trigger = document.getElementById('trigger');

  trigger.addEventListener('click', () => {
    burgerBut.classList.toggle('active');
  });
});

function App() {

  const [query, setQuery] = useState([]);
  const [weather, setWeather] = useState({});

  const [latitude, setLatitude] = useState([]);
  const [longitude, setLongitude] = useState([]);


  const search = evt => {
    if (evt.key === "Enter") {
      axios.get(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(response => setWeather(response.data));
      setQuery(''); // Return an empty input after search a plase
      console.log(weather);
      setLatitude(weather.coord.lat);
      setLongitude(weather.coord.lon);
    }
  }

  return (
    <div>

      <header className={'headers'}>
        <div className={"logo-wrapper"}>
          <a className={"logo-course"} href="#"><img src={weatherIcon} alt="logo img" height="100%" /></a>
        </div>
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
        <nav id="toggleNavBar" className={"nav__comp"}>
          {/* <div className='nav_container'> */}
            <ul className={"nav__list"}>
              <li className={"nav__item"}>
                <a className={"course-home"} href="#">today</a>
              </li>
              <li className={"nav__item"}>
                <a className={"contacts-course"} href="#">1 hour</a>
              </li>
              <li className={"nav__item"}>
                <a className={"content-course"} href="#">48 hours</a>
              </li>
              <li className={"nav__item"}>
                <a id={"about-course"} href="#">7 days</a>
              </li>
              <li className={"nav__item"}>
                <a className={"login-course"} href="#">sign in</a>
              </li>
            </ul>
          {/* </div> */}

        </nav>
        <div id="trigger" className="nav-burger">
          <div id="toggleBurgerBut" className={"nav-burger__container"}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>

      <main className={(typeof weather.main != "undefined")
        ? ((weather.main.temp > 16)
          ? 'weather warm'
          : 'weather')
        : 'weather'}>
        <div className='container'>
          <CurrentWeather weatherTemp={weather} />
          <FourDayForecast latitude={latitude} longitude={longitude}/>
        </div>
      </main>

    </div>
  );
}

export default App;


let options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  let crd = pos.coords;

  console.log('Ваше текущее местоположение:');
  console.log(`Широта: ${crd.latitude}`);
  console.log(`Долгота: ${crd.longitude}`);
  console.log(`Плюс-минус ${crd.accuracy} метров.`);
};

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};

navigator.geolocation.getCurrentPosition(success, error, options);
