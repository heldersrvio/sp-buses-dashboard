import React from 'react';
import PropTypes from 'prop-types';
import './styles/Footer.css';

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
			<div id="footer-links">
				<span id="created-span">Created by Helder Sérvio using React</span>
				<a id="twitter-link" href="https://twitter.com/HelderServio">
					<img
						src="https://icons-for-free.com/iconfiles/png/512/logo+media+social+social+media+twitter+icon-1320194988353055127.png"
						alt="Twitter bird"
					></img>
				</a>
				<a id="github-link" href="https://github.com/heldersrvio">
					<img
						src="https://cdn.iconscout.com/icon/free/png-512/github-136-458293.png"
						alt="Github cat"
					></img>
				</a>
			</div>
		</div>
	);
};

Footer.propTypes = {
	loading: PropTypes.bool,
	lastUpdateTime: PropTypes.string,
};

export default Footer;
