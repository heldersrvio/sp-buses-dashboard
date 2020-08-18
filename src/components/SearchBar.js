import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styles/SearchBar.css';

const SearchBar = (props) => {
	const [currentInput, setCurrentInput] = useState('');
	const [lookUpInfo, setLookUpInfo] = useState([]);

	const lookUp = (term) => {
		const result = props.queryInformation(term);
		setLookUpInfo(result);
	};

	const searchResultsCards = lookUpInfo.map((result) => {
		return (
			<div
				className="search-result-card"
				key={`search-result-card-${result.title}`}
				onClick={() => {
					setCurrentInput('');
					props.updateMap(result.title);
				}}
			>
				<div className="search-results-card-left-section">
					<img
						className="search-result-icon"
						src={
							result.type === 'ônibus'
								? 'https://image.flaticon.com/icons/png/512/171/171255.png'
								: 'http://icons.iconarchive.com/icons/google/noto-emoji-travel-places/1024/42561-bus-stop-icon.png'
						}
						alt="Vehicle"
					/>
				</div>
				<div className="search-results-card-right-section">
					<span className="search-result-title">
						{result.type.toUpperCase() + ' ' + result.title}
					</span>
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
					placeholder="Procurar ônibus e paradas"
					value={currentInput}
					onChange={(e) => {
						setCurrentInput(e.target.value);
						lookUp(e.target.value);
					}}
				></input>
			</div>
			<div
				id="search-results"
				className={currentInput !== '' ? 'visible' : 'hidden'}
			>
				{searchResults}
			</div>
		</div>
	);
};

SearchBar.propTypes = {
	updateMap: PropTypes.func,
	queryInformation: PropTypes.func,
};

export default SearchBar;
