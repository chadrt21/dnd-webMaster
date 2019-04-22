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
	});

	it('will allow the user to create a new campaign from the home screen', async () => {
		const reactContainer = document.createElement('div');
		document.body.appendChild(reactContainer);
		
		const component = mount(
			<App
				href="/"
			/>,
			{
				attachTo: reactContainer,
			}
		);

		const newCampaignButton = component.find(HomePageSidebar).find(Button).find('button');

		newCampaignButton.simulate('click');

		let inputElement = document.querySelector('.bp3-portal .bp3-overlay-open .bp3-input-group input');

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
		
		fireEvent.change(inputElement, { target: { value: 'Test Campaign' }});
		fireEvent.keyDown(inputElement, { keyCode: Keys.ENTER });

		component.update();

		await waitForMock(window.location.assign, 5000);

		expect(window.location.assign).toHaveBeenCalledWith(expect.stringMatching(/^\/app\/(\d+)$/g));
	});

	it('will render the campaign homepage', async () => {
		const campaigns = await fetch('/api/campaigns').then(response => response.json());
		const campaignID = campaigns[0] && campaigns[0].campaignID;
		
		const component = mount(
			<App
				href={`/app/${campaignID}`}
			/>
		);

		const layoutComponent = component.find(Grid);
		expect(layoutComponent.length).toBe(1);

		await waitForState(layoutComponent, state => state.validating === false);

		layoutComponent.update();

		expect(layoutComponent.render().find('.bp3-non-ideal-state').length).toBe(1);
	});
});
