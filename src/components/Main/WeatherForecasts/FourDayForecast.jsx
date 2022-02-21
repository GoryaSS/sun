import React, { useEffect, useState } from 'react';
import axios from 'axios';

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


  async function getData() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    let data = [];
    if (response.ok) {
      data = await response.json();
    }
    return data;
  }

  async function createContacts() {
    const containerContacts = document.createElement('div');
    containerContacts.className = 'contacts-course__container';
    const dataServer = await getData();
    dataServer.forEach(item => {
      containerContacts.append(showElement(item.name, item.address, item.email));
    });
    return containerContacts;
  }

  function showElement(name, address, email) {
    const itemElement = document.createElement('div');
    itemElement.className = 'item-data';
  
    const nameData = document.createElement('h2');
    nameData.textContent = name;
  
    const userEmail = document.createElement('h3');
    userEmail.textContent = email;
  
    const textData = document.createElement('p');
    const userAdsress = (JSON.stringify(address));
    textData.textContent = userAdsress;
  
    itemElement.append(nameData);
    itemElement.append(userEmail);
    itemElement.append(textData);
    return itemElement;
  }

  return (
    
    <div>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, vel id autem nostrum nobis quis, odio nisi repellendus sunt est expedita at quibusdam ipsum amet libero harum illo, numquam ipsam?</p>
    </div>
  )
}

export default FourDayForecast;
