import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Footer from '../Footer';

configure({ adapter: new Adapter() });

test('Displays links and author info correctly', () => {
	const footer = mount(
		<Footer loading={false} error={false} lastUpdateTime={'1 minuto'} />
	);
	const createdSpan = (
		<span id="created-span">Created by Helder Sérvio using React</span>
	);
	const twitterLink = (
		<a id="twitter-link" href="https://twitter.com/HelderServio">
			<img
				src="https://icons-for-free.com/iconfiles/png/512/logo+media+social+social+media+twitter+icon-1320194988353055127.png"
				alt="Twitter bird"
			></img>
		</a>
	);
	const githubLink = (
		<a id="github-link" href="https://github.com/heldersrvio">
			<img
				src="https://cdn.iconscout.com/icon/free/png-512/github-136-458293.png"
				alt="Github cat"
			></img>
		</a>
	);
	expect(footer.contains(createdSpan)).toEqual(true);
	expect(footer.contains(twitterLink)).toEqual(true);
	expect(footer.contains(githubLink)).toEqual(true);
});

test('Displays error message when appropriate', () => {
	const footer = mount(
		<Footer loading={false} error={true} lastUpdateTime={'1 minuto'} />
	);
	const errorMessage = (
		<span id="error-message">Erro. Não foi possível obter os dados.</span>
	);
	expect(footer.contains(errorMessage)).toEqual(true);
	footer.setProps({ loading: false, error: false, lastUpdateTime: '1 minuto' });
	footer.update();
	expect(footer.contains(errorMessage)).toEqual(false);
});

test('Displays loading spinner when loading', () => {
	const footer = mount(
		<Footer loading={false} error={true} lastUpdateTime={'1 minuto'} />
	);
	const loadingSpinner = (
		<div className="loading-spinner">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
	expect(footer.contains(loadingSpinner)).toEqual(false);
	footer.setProps({ loading: true, error: false, lastUpdateTime: '1 minuto' });
	footer.update();
	expect(footer.contains(loadingSpinner)).toEqual(true);
});
