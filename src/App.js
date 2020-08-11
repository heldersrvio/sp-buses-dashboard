import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
	return (
		<div className="App">
			<Header
				updateMap={() => {}}
				queryInformation={() => {}}
				filterMap={() => {}}
			/>
			{/* Map goes here */}
			<Footer />
		</div>
	);
};

export default App;
