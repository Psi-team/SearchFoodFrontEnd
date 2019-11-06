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

function addressToLatLong() {
  Geocode.setApiKey('XXXXXXXXXXXXXXXXXXXXXXXXX');
  // set response language. Defaults to english.
  Geocode.setLanguage("en");

  // set response region. Its optional.
  // A Geocoding request with region=es (Spain) will return the Spanish city.
  Geocode.setRegion("tw");

  // Enable or disable logs. Its optional.
  Geocode.enableDebug();

  Geocode.fromAddress("桃園市桃園區新埔八街15號")
    .then(response => {
      const { lat, lng } = response.results[0].geometry.location;
      console.log(lat, lng);
    });
}