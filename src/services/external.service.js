import Parser from 'xml2js';
import Geocode from "react-geocode";

export const externalService = { getCounty, getDistrict, addressToLatLong };

function getCounty() {
  return fetch('https://api.nlsc.gov.tw/other/ListCounty')
    .then(res => res.text())
    .then(str => Parser.parseStringPromise(str, {
      explicitRoot: false
    }))
    .then(data => data);
}

function getDistrict(cityID) {
  return fetch(`https://api.nlsc.gov.tw/other/ListTown/${cityID}`)
    .then(res => res.text())
    .then(str => Parser.parseStringPromise(str, {
      explicitRoot: false
    }))
    .then(data => data);
}

function addressToLatLong(address) {
  // development using fake latitude longtitude.
  if (process.env.REACT_APP_ENV || !process.env.REACT_APP_API_KEY) {
    return Promise.resolve(({ lat: 25, lng: 121 }));
  }

  Geocode.setApiKey(process.env.REACT_APP_API_KEY);
  // set response language. Defaults to english.
  Geocode.setLanguage("en");

  // set response region. Its optional.
  // A Geocoding request with region=es (Spain) will return the Spanish city.
  Geocode.setRegion("tw");

  // Enable or disable logs. Its optional.
  Geocode.enableDebug();

  return Geocode.fromAddress(address)
    .then(response => {
      const { lat, lng } = response.results[0].geometry.location;
      return { lat, lng };
    });
}