import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Map from './components/Map';

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const authenticate = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_BASE_URL + `Login/Autenticar?token=${process.env.REACT_APP_SPTRANS_API_KEY}`, {
          method: 'POST',
          mode: 'cors',
        });
        const responseData = await response.json();
        console.log(responseData);
        setIsAuthenticated(responseData);
      } catch (error) {
        console.log('Problem authenticating');
        return false;
      }
    };
    if (!isAuthenticated) {
      authenticate();
    }
    
  });

  useEffect(() => {

    if (isAuthenticated) {
      fetchVehiclesInformation();
    }
  });

  const fetchVehiclesInformation = async () => {
    try {
      if (vehicles.length === 0) {
        const response = await fetch(process.env.REACT_APP_BASE_URL + 'Posicao', {
          method: 'GET',
          mode: 'cors',
        });
        const responseData = await response.json();
        let currentVehicles = [];
        responseData.l.forEach((line) => {
          line.vs.forEach((vehicle) => {
            currentVehicles.push({
              prefix: vehicle.p,
              accessibility: vehicle.a,
              latitude: vehicle.py,
              longitude: vehicle.px,
              lineCode: line.cl,
            });
          });
        });
        setVehicles(currentVehicles);
      }
    } catch (error) {
      console.log('Problem fetching vehicles information');
    }

  };

	return (
		<div className="App">
			<Header
				updateMap={() => {}}
				queryInformation={() => {}}
				filterMap={() => {}}
			/>
			<Map vehicles={vehicles}/>
			<Footer />
		</div>
	);
};

export default App;
