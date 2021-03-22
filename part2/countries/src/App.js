import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  const toShow = filter ? (
    countries
      .filter((country) =>
        country.name.toLowerCase().includes(filter.toLowerCase())
      )
      .map((country) => <p key={country.numericCode}>{country.name}</p>)
  ) : (
    <p></p>
  );

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  return (
    <div>
      <div>
        Find countries: <input onChange={handleChange} value={filter} />
      </div>
      <div>
        {toShow.length === 1 ? (
          <div>
            {countries
              .filter((country) =>
                country.name.toLowerCase().includes(filter.toLowerCase())
              )
              .map((country) => (
                <div key={country.numericCode}>
                  {
                    <div>
                      <h1>{country.name}</h1>
                      <p>Capital {country.capital}</p>
                      <p>Population {country.population}</p>
                      <h1>Languages</h1>
                      <ul>
                        {country.languages.map((lang) => (
                          <li key={lang.iso639_1}>{lang.name}</li>
                        ))}
                      </ul>
                      <img
                        style={{ width: "20%" }}
                        src={country.flag}
                        alt={country.name}
                      />
                    </div>
                  }
                </div>
              ))}
          </div>
        ) : toShow.length < 10 || !filter ? (
          toShow
        ) : (
          "Too many matches, specify another filter"
        )}
      </div>
    </div>
  );
};

export default App;
