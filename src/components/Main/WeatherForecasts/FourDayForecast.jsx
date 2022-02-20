import React, { useEffect, useState } from 'react';
import axios from 'axios';


const googleApi = {
  key: process.env.REACT_APP_GOOGLE_API_KEY,
}

const FourDayForecast = (inputWeather) => {
  
  // GET LATITUDE
  
  const [latitude, setLatitude] = useState([]);
  useEffect(() => {
    setLatitude(inputWeather.inputWeather);
  }, [inputWeather.inputWeather])

  function getLat(e) {
    if (e === undefined) {
      return 'Undefined value!';
    }
    return e.lat;
  }
  let lat = latitude.coord;
  let resLat = getLat(lat);
  // console.log(resLat);

  // GET LONGITUDE

  const [longitude, setLongitude] = useState([]);
  useEffect(() => {
    setLongitude(inputWeather.inputWeather);
  }, [inputWeather.inputWeather])

  function getLon(e) {
    if (e === undefined) {
      return 'Undefined value!';
    }
    return e.lon;
  }
  let lon = longitude.coord;
  let resLon = getLon(lon);
  // console.log(resLon);




  const [city, setCity] = useState({});
  
  function geocode() {
    // axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat.latitude},${lat.longitude}&sensor=true&key=${googleApi.key}`)
    // .then(response => setCity(response.data.results[0]))
    // console.log(city);
    // .catch(error => {
    //   console.log(error);
    // })
  }
  geocode();
  
  return (
    
    <div>
      
    </div>
  )
}

export default FourDayForecast;



// https://maps.googleapis.com/maps/api/geocode/json?latlng=50.4114128,30.6177139&sensor=true&key=AIzaSyAEdCPnYp-3UcR5YGpBuAEYWDMxylK2qlc