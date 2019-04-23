/**
 * @description This testing suite tests the interactions of the whole system from back-end to front-end
 * @author Joseph Stewart
 */

import 'whatwg-fetch';
import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { wait, fireEvent } from 'dom-testing-library';
import { waitForState } from 'enzyme-async-helpers';

import { setup, teardown } from '../../../../testing/setup-tests-client';
import waitForMock from '../../../../testing/wait-for-mock';

import {
	Button,
	Keys,
} from '@blueprintjs/core';

import App from '../TestApp';
import HomePage from '../home-page';
import HomePageSidebar from '../home-page/Sidebar';
import Grid from '../layout';

console.error = jest.fn(value => console.log('TEST ERR:', value));
window.location.assign = jest.fn();

configure({ adapter: new Adapter() });

describe('CampaignBuddySystem', () => {
	beforeAll(setup);
	afterAll(teardown);
	afterEach(() =>
		expect(console.error).not.toHaveBeenCalledWith(expect.not.stringMatching(/spotify/i))
	);

	// First do snapshot testing
	it('renders the app correctly', () => {
		// 1) Mount the component
		const component = mount(
			<App />
		);

		// 2) Expect that the component matches the snapshot
		expect(component).toMatchSnapshot();
	});

	// Test to make sure that the hompage is displayed when the url is '/'
	it('will start on the homepage', async () => {
		// 1) Mount the component
		const component = mount(
			<App />
		);

		// 2) Expect that we can find the HomePage component
		expect(component.find(HomePage).length).toBe(1);
	});

	// Then check to make sure that the user can create a campaign
	it('will allow the user to create a new campaign from the home screen', async () => {
		// 1) Mount the component
		const component = mount(
			<App />
		);

		// 2) Find the new campaign button
		const newCampaignButton = component.find(HomePageSidebar).find(Button).find('button');

		// 3) Simulate a click event on the new campaign button
		newCampaignButton.simulate('click');

		// 4) Find the input element where the user writes the name of the campaign
		let inputElement = document.querySelector('.bp3-portal .bp3-overlay-open .bp3-input-group input');

		// 5) If we can't find it, wait for it
		if (!inputElement) {
			await wait(
				() => {
					inputElement = document.querySelector('.bp3-portal .bp3-overlay-open .bp3-input-group input');
					if (!inputElement) {
						throw new Error('Element not found');
					}
				}
			);
		}
		
		// 6) Simulate an on change event where the user types 'Test Campaign'
		fireEvent.change(inputElement, { target: { value: 'Test Campaign' }});

		// 7) Simulate an event where the user presses enter
		fireEvent.keyDown(inputElement, { keyCode: Keys.ENTER });

		// 8) Force the component to re-render
		component.update();

		// 9) Wait for the component to navigate
		await waitForMock(window.location.assign, 5000);

		// 10) Expect that window.location.assign was called navigating the user to /app/:campaignID
		expect(window.location.assign).toHaveBeenCalledWith(expect.stringMatching(/^\/app\/(\d+)$/g));
	});

	// Check that the layout system is rendered when the user goes to /app/:campaignID
	it('will render the campaign homepage', async () => {
		// 1) Make a fetch request to get the campaigns from the server
		const campaigns = await fetch('/api/campaigns').then(response => response.json());

		// 2) Get the campaignID from the response
		const campaignID = campaigns[0] && campaigns[0].campaignID;
		
		// 3) Mount the component
		const component = mount(
			<App
				href={`/app/${campaignID}`}
			/>
		);

		// 4) Find the layout component
		const layoutComponent = component.find(Grid);

		// 5) Expect that there is exactly one layout
		expect(layoutComponent.length).toBe(1);

		// 6) Wait for the component to validate the campaignID
		await waitForState(layoutComponent, state => state.validating === false);

		// 7) Force the component to re-render
		layoutComponent.update();

		// 8) Expect to find the non-ideal-state component used to give a hint to the user
		expect(layoutComponent.render().find('.bp3-non-ideal-state').length).toBe(1);
	});
});
