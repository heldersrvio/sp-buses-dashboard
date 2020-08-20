import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Map from '../Map';

configure({ adapter: new Adapter() });

test('Mounts without crashing', () => {
	shallow(
		<Map
			vehicles={[]}
			stops={[]}
			currentRoute={[]}
			loadEstimatedTimes={() => {}}
		/>
	);
});
