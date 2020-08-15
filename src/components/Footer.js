import React from 'react';
import PropTypes from 'prop-types';

const Footer = (props) => {
	const loadingSpinner = (
		<div className="loading-spinner">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);

	return (
		<div id="footer">
			{props.loading ? (
				loadingSpinner
			) : (
				<span>Última atualização: {props.lastUpdateTime}</span>
			)}
			<span>Created by Helder Sérvio using React</span>
			<a id="twitter-link" href="https://twitter.com/HelderServio">
				<span></span>
			</a>
			<a id="github-link" href="https://github.com/heldersrvio">
				<span></span>
			</a>
		</div>
	);
};

Footer.propTypes = {
	loading: PropTypes.bool,
	lastUpdateTime: PropTypes.string,
};

export default Footer;
