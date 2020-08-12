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
        const response = await fetch(`https://cors-anywhere.herokuapp.com/http://api.olhovivo.sptrans.com.br/v2.1/Login/Autenticar?token=${process.env.REACT_APP_SPTRANS_API_KEY}`, {
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

  const addNewVehicle = (vehicle) => {
    setVehicles(() => vehicles + vehicle);
  };

  const fetchVehiclesInformation = async () => {
    try {
      const response = await fetch(`https://cors-anywhere.herokuapp.com/http://api.olhovivo.sptrans.com.br/v2.1/Posicao`, {
        method: 'GET',
        mode: 'cors',
      });
      const responseData = await response.json()
      console.log(responseData);
      response.l.forEach((line) => {
        line.vs.forEach((vehicle) => {
          addNewVehicle({
            prefix: vehicle.p,
            accessibility: vehicle.a,
            latitude: vehicle.py,
            longitude: vehicle.px,
            lineCode: line.cl,
          });
        });
      });
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
