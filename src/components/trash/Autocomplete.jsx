import React, { useState, useEffect } from 'react';

const Autocomplete = () => {
  const [places, setPlaces] = useState([]);

  // const url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Vict&types=geocode&language=fr&key=AIzaSyAuEj2OZ_J3g0276qppa5qghdPQ_xqE0yw';
  // const url = 'https://api.openweathermap.org/data/2.5/weather?q=kyiv&units=metric&APPID=3b75e49de3f51189582a63bfa7a0c8c1';
  const url = 'https://jsonplaceholder.typicode.com/users?_limit=10';
  
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        let temp = json.map((item) => ({
          name: item.name,
        }));
        setPlaces(temp);
        console.table(temp);
      });
  }, []);

  return (
    <div>
      <datalist id="country">
        {places && places.map((item, index) => <option key={index}>{item.name}</option>)}
      </datalist>
    </div>
  );
};
export default Autocomplete;


