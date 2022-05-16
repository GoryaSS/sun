import React, { useEffect, useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import CurrentWeather from './components/Main/WeatherForecasts/CurrentWeather'
import OneHourWeather from './components/Main/WeatherForecasts/OneHourWeather';
import FourDayForecast from './components/Main/WeatherForecasts/FourDayForecast'
import "./App.scss"
import './components/Main/WeatherSearch/WeatherSearch.scss'
import './components/Header/Header.scss';
import weatherIcon from './components/assets/weather-icon.png'

const api = {
  key: process.env.REACT_APP_WEATHER_API_KEY,
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

// document.addEventListener('DOMContentLoaded', () => {
//   const burgerBut = document.getElementById('toggleBurgerBut');
//   const trigger = document.getElementById('close');

//   trigger.addEventListener('click', () => {
//     burgerBut.classList.remove('active');
//   });
// });


function App() {

  const [query, setQuery] = useState([]);
  const [weather, setWeather] = useState([]);
  const search = evt => {
    if (evt.key === "Enter") {
      axios.get(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(response => setWeather(response.data))
      setQuery(''); // Return an empty input after search a plase
      // setLatitude(weather.coord);
      // setLongitude(weather.coord);
      // Prevendefaul
      // stopPropagination
    }
  }

  const [burgerMenue, setBurgerMenue] = useState();
  useEffect(() => {
      setBurgerMenue(document.getElementById('toggleNavBar'));
  }, [closeMenue])
  function closeMenue() {
    burgerMenue.classList.remove('active');
  }  
  
  const [burgerMenueButton, setBurgerMenueButton] = useState();
  useEffect(() => {
      setBurgerMenueButton(document.getElementById('toggleBurgerBut'));
  }, [closeMenueButton])
  function closeMenueButton() {
    burgerMenueButton.classList.remove('active');
  }

 function closeBurgerMenue() {
  closeMenue();
  closeMenueButton();
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
            // TODO: list="country"
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
                <NavLink id="close" className={"nav__today"} to="/today" onClick={closeBurgerMenue}>today</NavLink>
              </li>
              <li className={"nav__item"}>
                <NavLink className={"nav__hourly"} to="/onehour" onClick={closeBurgerMenue}>1 hour</NavLink>
              </li>
              <li className={"nav__item"}>
                <NavLink className={"nav__couple-days"} to="/couple-days" onClick={closeBurgerMenue}>48 hours</NavLink>
              </li>
              <li className={"nav__item"}>
                <a className={"nav__week"} href="#" onClick={closeBurgerMenue}>7 days</a>
              </li>
              <li className={"nav__item"}>
                <a className={"nav__login"} href="#" onClick={closeBurgerMenue}>sign in</a>
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

          <Routes>
            <Route path={'/today'} element={<CurrentWeather weatherTemp={weather} /> }/>
            <Route path={'/onehour'} element={<OneHourWeather /> }/>
            <Route path={'/couple-days'} element={<FourDayForecast inputWeather = {weather}/> }/>
          </Routes>

        </div>
      </main>

    </div>
  );
}

export default App;

