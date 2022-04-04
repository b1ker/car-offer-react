import React from 'react';
import { useState, useEffect } from 'react';
import './main-page.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoadingSpinner from './loading-spinner';
import VehicleTable from './vehicle-table';
import CountHeader from './count-header';

function App() {
  const apiUrl = 'https://localhost:5001/api';

  var [allVehicles, setAllVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      const rsp = await fetch(`${apiUrl}/VehicleData`);
      let vehicles = await rsp.json();
      vehicles = vehicles.sort((a, b) => {
        let retVal = 0;
        if (a.createdOn > b.createdOn) retVal = 1;
        if (a.createdOn < b.createdOn) retVal = -1;

        if (retVal === 0) retVal = a.wmi < b.wmi ? -1 : 1;

        return retVal;
      });
      setAllVehicles(vehicles);
    };
    fetchVehicles();
  }, []);

  const countries = allVehicles
    ? Array.from(
        new Set(
          allVehicles
            .filter((i) => i.country !== null && i.country !== undefined)
            .map((h) => h.country)
        )
      )
    : [];
  countries.unshift('View all');

  const [searchText, setInputText] = useState('');
  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const [selectedCity, setCountry] = useState('');
  let onSearchChange = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setCountry(lowerCase);
  };
  const filteredVehicles = allVehicles.filter(
    (v) =>
      (selectedCity === '' ||
        selectedCity === 'view all' ||
        v.country?.toLowerCase() === selectedCity) &&
      JSON.stringify(v).toLowerCase().includes(searchText)
  );

  if (allVehicles.length) {
    return (
      <div className="App">
        <div className=" text-white heading">
          <div className="container p-2">
            <header className="pt-3 h4 mb-3">Welcome to vehicle lookup application</header>
            <div className="content">
              <div className=" d-flex flex-row-reverse">
                <div className="col-sm-5 p-2">
                  <input
                    type="text"
                    className="form-control"
                    id="searchBox"
                    aria-describedby="searchHelp"
                    placeholder="Enter search criteria"
                    onChange={inputHandler}
                    testid="text-search"></input>
                </div>
                <div className="col-sm-4 p-3 h5 content">
                  <label htmlFor="searchBox">Search for: </label>{' '}
                </div>
              </div>
              <div className=" d-flex flex-row-reverse">
                <div className="col-sm-5 p-2">
                  <select
                    className="form-select"
                    onChange={onSearchChange}
                    testid="country-search"
                    defaultValue={{ key: 'View all', value: 'view all' }}>
                    {countries.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-sm-5 p-3 h5">
                  <label htmlFor="searchBox">Choose country: </label>{' '}
                </div>
              </div>
              <CountHeader count={allVehicles.length} type="total" />
              {filteredVehicles.length !== allVehicles.length ? (
                <CountHeader count={filteredVehicles.length} type="count" />
              ) : (
                ''
              )}
              <VehicleTable vehicles={filteredVehicles} />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <LoadingSpinner />;
  }
}

export default App;
