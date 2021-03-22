import React from "react";

const CountryInfo = ({ countries, filter }) => {
  return (
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
  );
};

export default CountryInfo;
