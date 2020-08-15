import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SearchBar = (props) => {
	const [currentInput, setCurrentInput] = useState('');
	const [lookUpInfo, setLookUpInfo] = useState([]);
	const [loading, setLoading] = useState(false);

	const lookUp = async (term) => {
		setLoading(true);
		const result = await props.queryInformation(term);
		setLookUpInfo(result);
		setLoading(false);
	};

	const loadingSpinner = (
		<div className="loading-spinner">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);

	const searchResultsCards = lookUpInfo.map((result) => {
		return (
			<div
				className="search-result-card"
				onClick={() => props.updateMap(result.title)}
			>
				<div className="search-results-card-left-section">
					<img className="search-result-icon" src="/" alt="Vehicle" />
				</div>
				<div className="search-results-card-right-section">
					<span className="search-result-title">{result.title}</span>
					<span className="search-result-info">{result.info}</span>
				</div>
			</div>
		);
	});

	const searchResults =
		lookUpInfo.length === 0 ? (
			<span id="no-results-message">Sem resultados</span>
		) : (
			searchResultsCards
		);

	return (
		<div id="search-bar">
			<div id="top-section">
				<input
					type="text"
					id="search-bar-input"
					value={currentInput}
					onChange={(e) => {
						setCurrentInput(e.target.value);
						lookUp(e.target.value);
					}}
				></input>
				<button
					id="search-bar-button"
					onClick={() => props.updateMap(currentInput)}
				></button>
			</div>
			<div
				id="search-results"
				className={currentInput !== '' ? 'visible' : 'hidden'}
			>
				{loading ? loadingSpinner : searchResults}
			</div>
		</div>
	);
};

SearchBar.propTypes = {
	updateMap: PropTypes.func,
	queryInformation: PropTypes.func,
};

export default SearchBar;
