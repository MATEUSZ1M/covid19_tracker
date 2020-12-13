import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import InfoBox from "./InfoBox/InfoBox";
import Map from "./Map/Map";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");

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

    console.log("country code: ", countryCode);
  };

  return (
    <div className="app">
      <div className="app__left">
        {/*HEADER */}
        <div className="app__header">
          {/*TITLE + SELECT INPUT DROPDOWN FIELD */}
          <h1>COVID-19 TRACKER</h1>

          <FormControl className="app_dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" cases={123} total={2000} />
          <InfoBox title="Recovered" cases={1233} total={3000} />
          <InfoBox title="Deaths" cases={1234} total={4000} />
        </div>

        <Map />
      </div>
      <Card className="app__right">
        <CardContent>
          {/*TABLE*/}
          <h3>Live Cases by country</h3>
          {/*GRAPH */}
          <h3>Worldwide new cases</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
