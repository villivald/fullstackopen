import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ city }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    let source = axios.CancelToken.source();
    axios
      .get("http://api.weatherstack.com/current", {
        params: {
          access_key: "7d61cadc6c7a4731542f76f99aee572d",
          query: city,
        },
        cancelToken: source.token,
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          throw error;
        }
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

  if (weather) {
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
