import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "./components/Button";
import List from "./components/List";
import CountryInfo from "./components/CountryInfo";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState([]);
  const [filter, setFilter] = useState("");
  const [toShow, setToShow] = useState("");
  const [click, setClick] = useState(false);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      setCountriesToShow(
        countries.filter((country) =>
          country.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
      setClick(true);
    };

    filter
      ? setToShow(
          countries
            .filter((country) =>
              country.name.toLowerCase().includes(filter.toLowerCase())
            )
            .map((country) => (
              <div key={country.numericCode}>
                {country.name}
                <Button handleClick={handleClick} value={country.name} />
              </div>
            ))
        )
      : setToShow(<p></p>);
  }, [countries, filter]);

  const handleChange = (e) => {
    setFilter(e.target.value);
    setClick(false);
  };

  return (
    <div>
      <div>
        Find countries: <input onChange={handleChange} value={filter} />
      </div>
      <div>
        {click || toShow.length === 1 ? (
          <CountryInfo
            countries={toShow.length > 1 ? countriesToShow : countries}
            filter={filter}
          />
        ) : (
          <List toShow={toShow} filter={filter} />
        )}
      </div>
    </div>
  );
};

export default App;
