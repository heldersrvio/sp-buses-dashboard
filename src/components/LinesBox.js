import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styles/LinesBox.css';

const LinesBox = (props) => {
	const [input, setInput] = useState('');
	const [currentLines, setCurrentLines] = useState([]);
	const [clickedLines, setClickedLines] = useState([]);

	const mapLineToElement = (line) => {
		return (
			<li key={line.lineCode} className="lines-box-result">
				<span
					className="lines-box-result-terminal"
					onClick={() =>
						setClickedLines((cL) => {
							if (cL.includes(line.lineCode)) {
								return cL.filter((c) => c !== line.lineCode);
							} else {
								return cL.concat(line.lineCode);
							}
						})
					}
				>
					{line.lineSignPrimary + ' ' + line.lineSignSecondary}{' '}
					{clickedLines.includes(line.lineCode) ? '▼' : '▶'}
				</span>
				<ul
					className={
						clickedLines.includes(line.lineCode)
							? 'lines-box-result-details visible'
							: 'lines-box-result-details hidden'
					}
				>
					<li>Código: {line.lineCode}</li>
					<li>{line.circular ? 'Circular' : 'Não circular'}</li>
					<li>
						Letreiro:{' '}
						{line.lineNumericalSignOne + ' ' + line.lineNumericalSignTwo}
					</li>
					<li>{line.lineNumericalSignTwo === 10 ? 'Base' : 'Atendimento'}</li>
					<li>
						Sentido:{' '}
						{line.lineOrientation === 1
							? 'Terminal principal para secundário'
							: 'Terminal secundário para principal'}
					</li>
				</ul>
			</li>
		);
	};

	return (
		<div id="lines-box-container">
			<div id="lines-box-top">
				<h2 id="lines-h2">Linhas</h2>
				<input
					id="lines-box-text-input"
					type="text"
					value={input}
					onChange={(e) => {
						setInput(e.target.value);
						props.fetchLinesInformation(e.target.value, setCurrentLines);
					}}
				/>
			</div>
			<ul id="lines-box-results">
				{input === '' ? null : currentLines.map(mapLineToElement)}
			</ul>
		</div>
	);
};

LinesBox.propTypes = {
	fetchLinesInformation: PropTypes.func,
};

export default LinesBox;
