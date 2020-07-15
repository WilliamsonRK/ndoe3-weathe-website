const request = require("request");

const forecast = (latitude, longitude, callback) => {
  //   const url =
  //     "http://api.weatherstack.com/current?access_key=a2d32127cee5563f86022ad18c844635&query=24.65,93.98333&units=f";

  const url =
    "http://api.weatherstack.com/current?access_key=a2d32127cee5563f86022ad18c844635&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";
  request({ url, json: true }, (error, { body }={}) => {
    // const data = JSON.parse(response.body);

    // console.log(error);
    if (error) {
      //   console.log("Unable to connect weather service");
      callback("Unable to connect weather service", undefined);
    } else if (body.error) {
      //   console.log("Unabke to find location");
      callback("Unable to find location", undefined);
    } else {
      //   console.log(response.body.current.weather_descriptions[0]);
      //   console.log("the temperature is " + response.body.current.temperature);
      //   console.log(
      //     "there is " + response.body.current.precip + " chance of rain"
      //   );
      callback(undefined, body.current.weather_descriptions[0]);
      // callback(undefined, response.body.location.name);
    }
  });
};

module.exports = forecast;
