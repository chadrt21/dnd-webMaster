/**
 * @description This testing suite tests the interactions of the whole system from back-end to front-end
 * @author Joseph Stewart
 */

import 'whatwg-fetch';
import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { setup, teardown } from '../../../../testing/setup-tests-client';

import App from '../App';
import HomePage from '../home-page';

console.error = jest.fn();

configure({ adapter: new Adapter() });

const doSomeWaiting = () => new Promise(resolve => setTimeout(resolve, 2000));

describe('CampaignBuddySystem', () => {
	beforeAll(setup);
	afterAll(teardown);
	afterEach(() =>
		expect(console.error).not.toHaveBeenCalledWith(expect.not.stringMatching(/spotify/i))
	);

	it('renders the app correctly', () => {
		const component = mount(
			<App />
		);

		expect(component).toMatchSnapshot();
	});

	it('will start on the homepage', async () => {
		const component = mount(
			<App />
		);

		expect(component.find(HomePage).length).toBe(1);
		await doSomeWaiting();
	});
});
