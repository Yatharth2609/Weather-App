const request = require('request');

const geocode = (address, callback) => {
    const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoieWF0aGFydGgyNjA5IiwiYSI6ImNsbWRzcXcxNjFoNHkza281b25tOWk1ZnMifQ.uHBEeBVzs6m089WjptroZw&limit=1`;
    request({ url: geocodeURL, json: true }, (error, response = {}) => {
      if (error) {
        callback(`Unable to find location services!!`, undefined);
      } else if (response.body.features.length === 0) {
        callback(`Unable to find the location. Try another search!!!`, undefined);
      } else {
        callback(undefined, {
          longitude: response.body.features[0].center[0],
          latitude: response.body.features[0].center[1],
          location: response.body.features[0].place_name,
        });
      }
    });
  };
  
  module.exports = geocode; 