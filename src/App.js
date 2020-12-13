import { MenuItem, FormControl, Select } from "@material-ui/core";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');


  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    console.log('country code: ', countryCode);
  }


  return (
    <div className="app">
      {/*HEADER */}
      <div className="app__header">
        {/*TITLE + SELECT INPUT DROPDOWN FIELD */}
        <h1>COVID-19 TRACKER</h1>

        <FormControl className="app_dropdown">
          <Select variant="outlined" onChange={onCountryChange} value={country}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="app__stats">
        
      </div>

      {/*INFOBOX */}
      {/*INFOBOX */}
      {/*INFOBOX */}

      {/*TABLE*/}
      {/*GRAPH */}

      {/*MAP*/}
    </div>
  );
}

export default App;
