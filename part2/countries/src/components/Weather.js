import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ city }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    let source = axios.CancelToken.source();
    axios
      .get("http://api.weatherstack.com/current", {
        params: {
          access_key: process.env.REACT_APP_API_KEY,
          query: city,
        },
        cancelToken: source.token,
      })
      .catch((error) => {
        console.log("Request canceled", error.message);
        throw error;
      })
      .then((response) => {
        if (response.statusText === "OK") {
          setWeather(response.data);
        }
      })
      .catch((error) => {
        console.log(error.config);
      });

    return () => {
      source.cancel("Weather component is unmounting");
    };
  }, [city]);
  console.log(weather);
  if (weather && weather.current) {
    return (
      <div>
        <h1>Weather in {city}</h1>
        <p>Temperature: {weather.current.temperature}</p>
        <img src={weather.current.weather_icons[0]} alt="weather" />
        <p>
          Wind: {weather.current.wind_speed} mph direction{" "}
          {weather.current.wind_direction}
        </p>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Weather;
