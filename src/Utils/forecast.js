const request = require("request");

const forecast = (lon, lat, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=e5f6fa6a1c1ecab50ce9d9812152c7b9&query=${lon},${lat}&units=m`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to find forecasting services!!", undefined);
    } else if (body.error) {
      callback("Unable to find the location!!", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} outside, but it feels like ${body.current.feelslike} outside!!`
      );
    }
  });
};

module.exports = forecast;
