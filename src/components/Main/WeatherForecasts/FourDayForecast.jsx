import React from 'react'
import axios from 'axios';




const FourDayForecast = (latitude, longitude) => {

  // console.log(latitude)
  // console.log(longitude)

  function geocode() {
    let lacation = 'kyiv';
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params:{
        address: lacation,
        key: 'AIzaSyAEdCPnYp-3UcR5YGpBuAEYWDMxylK2qlc',
      }
    })
    
    .then(response => {
      // console.log(response);
      let formattedAddress = response.data.results[0].formatted_address;
      let formattedAddressOutput = `
        <ul className="list-group">
        <li className="list-group-item">${formattedAddress}</li>
        </ul>
      `;
      document.querySelector('.formatted-address').innerHTML = formattedAddressOutput;
  
      let lat = response.data.results[0].geometry.location.lat;
      let lng = response.data.results[0].geometry.location.lng;
      let geometryOutput = `
      <ul className="list-group">
        <li className="list-group-item">Lat: ${lat}</li>
        <li className="list-group-item">Long: ${lng}</li>
      </ul>`;
     document.querySelector('.geometry').innerHTML = geometryOutput;
    })  
    .catch(error => {
      console.log(error);
    })
  }

  return (
    
    <div>
      
    </div>
  )
}

export default FourDayForecast



// https://maps.googleapis.com/maps/api/geocode/json?latlng=50.4114128,30.6177139&sensor=true&key=AIzaSyAEdCPnYp-3UcR5YGpBuAEYWDMxylK2qlc