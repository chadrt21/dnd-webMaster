import React from 'react';
import { mount, configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mockFetch, unmockFetch } from 'FetchMock';
import characters from '../../../../dummy-data/characters';
import { displayError } from '../../../toast';
import { waitForState } from 'enzyme-async-helpers';
import waitForMock from '../../../../../../testing/wait-for-mock';

import CharacterTool from '../';
import CharacterList from '../character-list';
import CharacterDisplay from '../character-display';
import ToolSettings from '../tool-settings';
import List from '../../../list';

import Pane from '../../../layout/model/LayoutPane';

jest.mock('../../../toast');
global.console.error = jest.fn();

configure({ adapter: new Adapter() });

// Default tool props
const TOOL_PROPS = {
	campaignID: 1,
	setTabName: jest.fn(),
	insertPaneIntoPanel: jest.fn(),
	width: 600,
	height: 600,
	pane: new Pane({ type: 'character' })
};

// Some default tool settings
const presetToolSettings = {
	orderings: [
		{
			name: 'proficiencies',
			visible: true,
			displayName: 'Proficiencies'
		},
		{
			name: 'classInfo',
			visible: true,
			displayName: 'Class Information'
		},
		{
			name: 'spells',
			visible: true,
			displayName: 'Spells'
		},
		{
			name: 'equipment',
			visible: true,
			displayName: 'Equipment'
		},
		{
			name: 'appearance',
			visible: true,
			displayName: 'Appearance'
		},
		{
			name: 'backstory',
			visible: true,
			displayName: 'Backstory/Notes',
		}
	]
};
// The cached tool settings
let toolSettings = {};

// A mock POST toolSettings server controller function
let setToolSettings = jest.fn(obj => {
	toolSettings = obj;
});

// Define our mock API client requests
const fetchMockObject = [
	{
		url: '/api/search/.+',
		GET: {
			status: 200,
			responseBody: [],
		}
	},
	{
		url: '/api/campaigns/(\\d)/characters/(\\d)',
		GET: {
			status: 200,
			getResponseBody: (url, options, matches) => {
				return characters[matches[2]];
			}
		}
	},
	{
		// Define our GET /api/campaigns/:campaignID/characters route to return the 'saved characters'
		url: '/api/campaigns/(\\d)+/characters',
		GET: {
			status: 200,
			responseBody: characters,
		}
	},
	{
		// Define our GET and POST routes for /api/campaigns/:campaignID/tool-settings/characterTool
		// To return and set the character tool's settings. If the campaign id is 1, then return
		// the constant tool settings object, if not, return whatever is stored in tool settings
		// The post request sets the cached tool settings
		url: '/api/campaigns/(\\d)+/tool-settings/characterTool',
		GET: {
			status: 200,
			getResponseBody: (url, options, matches) => {
				if (matches[1] === '1') {
					return presetToolSettings;
				} else {
					return toolSettings;
				}
			},
		},
		POST: {
			status: 200,
			callback: (url, options) => {
				const { value } = JSON.parse(options.body);
				setToolSettings(value);
			},
			responseBody: {}
		}
	}
];

// Before all of the tests, mock the global fetch object
beforeAll(() => {
	// Mock the global fetch object and define deterministic
	// responses to the api requests that this tool makes
	mockFetch(fetchMockObject);
});

// After all of the tests in this suite have been ran, unmock the global fetch object
afterAll(() => {
	unmockFetch();
});

// Before each test, clear all of the mocks and reset the pane
beforeEach(() => {
	window.fetch.mockClear();
	TOOL_PROPS.pane = new Pane({ type: 'character' });
});

afterEach(() => {
	expect(console.error).not.toHaveBeenCalled();
});

describe('CharacterTool', () => {
	// First make sure the component correctly renders
	it('should render the component', () => {
		// 1) Mount the component
		const component = mount(
			<CharacterTool
				{...TOOL_PROPS}
			/>
		);

		// 2) Expect the component to match the saved snapshot
		expect(component).toMatchSnapshot();
	});

	// Then make sure that it is rendering the default view first
	it('should render the list view first', () => {
		// 1) Mount the component
		const component = mount(
			<CharacterTool
				{...TOOL_PROPS}
			/>
		);

		// 2) Expect that no errors have been raised
		expect(displayError).not.toHaveBeenCalled();

		// 3) Expect that the character list is found
		expect(component.find(CharacterList).length).toBe(1);

		// 4) Expect that the character display is not found
		expect(component.find(CharacterDisplay).length).toBe(0);

		// 5) Expect that the tool settings is not found
		expect(component.find(ToolSettings).length).toBe(0);
	});

	// Then make sure that it is loading the tool settings when it first renders
	it('should retrieve the tool settings when the component mounts or post the default character tools', async () => {
		// 1) Mount the component but we don't need to store it
		let component = mount(
			<CharacterTool
				{...TOOL_PROPS}
			/>
		);

		// 2) Wait for the tool orderings to set in the state of the component
		await waitForState(component, state => !!state.toolSettings.orderings)

		// 3) Expect that the GET request was made to the tool requests route
		expect(window.fetch).toHaveBeenCalledWith(
			'/api/campaigns/1/tool-settings/characterTool',
			expect.not.objectContaining({
				method: expect.anything(),
			})
		);

		// 4) Expect that no POST request was made (because campaign 1 has saved tool settings for character tool)
		expect(window.fetch).not.toHaveBeenCalledWith(
			'/api/campaigns/1/tool-settings/characterTool',
			expect.objectContaining({
				method: 'POST',
			})
		);

		// 5) Clear all of the mock data for window.fetch so we aren't getting calls from the first mount
		window.fetch.mockClear();

		// 6) Mount another campaign (id = 2) with no saved tool requests
		component = mount(
			<CharacterTool
				{...TOOL_PROPS}
				campaignID={2}
			/>
		);

		// 7) Wait for the tool orderings to set in the state of the component
		await waitForState(component, state => !!state.toolSettings.orderings)

		// 8) Expect that the 'server controller' method was called to save the new tool settings
		expect(setToolSettings).toHaveBeenCalled();
	});

	// Then make sure that there are two lists being rendered
	it('Expect that two lists are rendered (one for npcs and one for pcs)', () => {
		// 1) Mount the component into the DOM
		const component = mount(
			<CharacterTool
				{...TOOL_PROPS}
			/>
		);

		// 2) Expect that there are two Lists
		expect(component.find(List).length).toBe(2);
	});

	// Then make sure that those lists are rendering the correct things
	it('renders three PC characters rendered and one NPC rendered in the list view', async () => {
		// 1) Mount the component into the DOM
		const component = mount(
			<CharacterTool
				{...TOOL_PROPS}
			/>
		);

		// 2) Find the character list component
		const characterList = component.find(CharacterList);

		// 3) Wait for the characters to be loaded
		await waitForState(characterList, state => state.characters.length > 0);

		// 4) Get the PC list (it's the first list rendered)
		const pcList = characterList.find(List).at(0);

		// 5) Get the NPC list (it's the second list rendered)
		const npcList = characterList.find(List).at(1);

		// 6) Expect that the PC list renders three children
		expect(pcList.render().children().length).toBe(3);

		// 7) Expect that the NPC list renders one child
		expect(npcList.render().children().length).toBe(1);
	});

	// Then make sure that we can click on the list items
	it('changes to the character display when a character is clicked', async () => {
		// 1) Mount the component into the DOM
		const component = mount(
			<CharacterTool
				{...TOOL_PROPS}
			/>
		);

		// 2) Get the character list component
		const characterList = component.find(CharacterList);

		// 3) Wait for the characters to be loaded from the API
		await waitForState(characterList, state => state.characters.length > 0);

		// 4) Get the PC list
		const pcList = characterList.find(List).at(0);
		
		// 5) Wrap the list in a shallow render so we can actually see it's children (because
		// for whatever reason, enzyme doesn't render them)
		const wrappedPcList = shallow(pcList.instance().render());

		// 6) Find the first list item
		const listRow = wrappedPcList.find('.listRow').at(0);

		// 7) Simulate a click on the list item
		listRow.simulate('click');

		// 8) Wait for the component to switch to the display view
		await waitForState(component, state => state.view === 'display');

		// 9) Update the component after the state change
		component.update();

		// 10) Expect that the character list is not found in the component
		expect(component.find(CharacterList).length).toBe(0);

		// 11) Expect that the character display is found in the component
		expect(component.find(CharacterDisplay).length).toBe(1);

		// 12) Expect that the tool settings is not found in the component
		expect(component.find(ToolSettings).length).toBe(0);
	});

	// Then make sure that we can load in a character by default
	it('will load a character by default', async () => {
		// 1) Set the pane object with stored component state
		const newPane = new Pane({
			type: 'character',
			state: {
				defaultCharacterID: 1,
				view: 'display',
				toolSettings: presetToolSettings,
			}
		});

		// 2) Mount the component with the custom pane object
		const component = mount(
			<CharacterTool
				{...TOOL_PROPS}
				pane={newPane}
			/>
		);

		// 3) Wait for the character to be loaded
		await waitForState(component, state => !!state.character.characterID);

		// 4) Update the component so that it's render matches the state
		component.update();

		// 5) Expect that the character display is rendered
		expect(component.find(CharacterDisplay).length).toBe(1);
	});

	// Then make sure that the user can navigate to the settings page, edit settings, and return to the list view
	it('will go to settings page and edit settings properly and return to list view', async () => {
		// 1) Mount the component
		const component = mount(
			<CharacterTool
				{...TOOL_PROPS}
			/>
		);

		// 2) Find the button that navigates to settings
		const navigateToSettingsButton = component.find('Title.title.header button');

		// 3) Wait for the component to load the tool settings
		await waitForState(component, state => !!state.toolSettings.orderings);

		// 4) Click the settings button
		navigateToSettingsButton.simulate('click');

		// 5) Update the component
		component.update();

		// 6) Expect that the component is showing the settings view
		expect(component.find(ToolSettings).length).toBe(1);

		// 7) Clear the mock for the 'server controller' function that updates tool settings
		setToolSettings.mockClear();

		// 8) Simulate an event where the user swaps orderings zero and one
		// Note: We do not need to simulate the drag and drop interaction because
		// it is handled by the sortable item component which is it's own unit
		// and should be tested separately
		component.find(ToolSettings).instance().moveItem(0, 1);

		// 9) Wait for the 'server controller' function to be called
		const routeWasCalled = await waitForMock(setToolSettings);

		// 10) Expect that it was called
		expect(routeWasCalled).toBe(true);

		// 11) Expect that the first section in the updated orderings array is 'classInfo'
		expect(toolSettings.orderings[0].name).toBe('classInfo');

		// 12) Expect that the second section in the updated orderings array is 'proficiencies'
		expect(toolSettings.orderings[1].name).toBe('proficiencies');

		// 13) Find the button that navigates back to the character list
		const navBackButton = component.find('ToolSettings .header button');

		// 14) Click it
		navBackButton.simulate('click');

		// 15) Update the component to reflect the change in state
		component.update();

		// 16) Expect that the component is back at the character list view
		expect(component.find(CharacterList).length).toBe(1);
	});
});
