import React from 'react';
import ToolBase from '../ToolBase';

import CharacterList from './character-list';
import Display from './character-display';
import Settings from './tool-settings';

import { displayError } from '../../toast';

import { get, post } from 'Utility/fetch';
import debounce from 'Utility/debounce';

// If settings.orderings is not returned from the server, set a blank one using this default
const defaultOrderings = [
	{
		name: 'proficiencies',
		visible: true,
		displayName: 'Proficiencies',
	},
	{
		name: 'classInfo',
		visible: true,
		displayName: 'Class Information',
	},
	{
		name: 'spells',
		visible: true,
		displayName: 'Spells',
	},
	{
		name: 'equipment',
		visible: true,
		displayName: 'Equipment',
	},
	{
		name: 'appearance',
		visible: true,
		displayName: 'Appearance',
	},
	{
		name: 'backstory',
		visible: true,
		displayName: 'Backstory/Notes',
	},
];

export default class CharacterTool extends ToolBase {
	// Character list will not be stored in state
	state = {
		view: 'list',
		prevView: 'list',
		character: {},
		sections: {
			proficiencies: false,
			classInfo: false,
			spells: false,
			equipment: false,
			appearance: false,
			backstory: false,
		},
		sortings: {
			spells: {
				direction: 'asc',
				column: '',
			},
			equipment: {
				direction: 'asc',
				column: '',
			},
			klassFeatures: {
				direction: 'asc',
				column: '',
			},
		},
		toolSettings: {},
		searches: {
			spells: '',
			equipment: '',
			klassFeatures: '',
		},
	}

	async componentDidMount() {
		// When the component first mounts make sure that all tool operations take place
		super.componentDidMount();
		const { campaignID } = this.props;

		try {
			// Try and retrieve tool settings for character tool
			const toolSettings = await get(`/api/campaigns/${campaignID}/tool-settings/characterTool`);

			// If there are no settings then we will make some default ones
			if (!toolSettings.orderings) {
				toolSettings.orderings = defaultOrderings;
				try {
					await post(`/api/campaigns/${campaignID}/tool-settings/characterTool`, {
						value: toolSettings,
					});
				} catch (err) {
					displayError('There was an error setting settings for this tool');
				}
			}
	
			this.setState({ toolSettings });
		} catch (err) {
			displayError('There was an error retrieving settings for this tool');
		}
	}

	navigateToCharacter = async item => {
		await this.loadCharacter(item.characterID);
	}

	loadCharacter = async characterID => {
		const { campaignID } = this.props;
		const character = await get(`/api/campaigns/${campaignID}/characters/${characterID}`);
		this.setState({
			view: 'display',
			character,
		});
	}

	navigateToSettings = () => {
		this.setState(({ view }) => ({
			view: 'settings',
			prevView: view,
		}));
	}

	navigateBackFromSettings = () => {
		this.setState(({ prevView }) => ({
			view: prevView,
		}));
	}

	onPropertyChanged = identifier => change => {
		const map = identifier.split('.');

		this.setState(({ character }) => {
			let cur = character;
			for (let i = 0; i < map.length; i++) {
				if (i === map.length - 1) {
					cur[map[i]] = change;
				} else {
					cur[map[i]] = character[map[i]];
				}
				cur = cur[map[i]];
			}

			// Update the local state with the changes
			this.setState({
				character,
			}, async () => {
				// Make update in server
				const { campaignID } = this.props;
				const { character } = this.state;
				if (character && character.characterID) {
					try {
						// Try and make post request to server with changes
						const response = await post(
							`/api/campaigns/${campaignID}/characters/${character.characterID}`,
							{
								field: identifier,
								value: change,
							}
						);

						// If the server tells us to reload, then reload, otherwise save a network call
						if (response.reload) {
							this.loadCharacter(character.characterID);
						}
					} catch (err) {
						// Reload on error to ensure data synchronization
						displayError(`There was an error updating "${character.characterName}"`);
						this.loadCharacter(character.characterID);
					}
				}
			});
		});
	}

	navigateToList = () => {
		this.setState({ view: 'list' });
	}

	mediaQuery = (query, value) => {
		const { width, height } = this.props;

		if (query === 'max-width') {
			return width < value;
		} else if (query === 'min-width') {
			return width > value;
		} else if (query === 'max-height') {
			return height < value;
		} else if (query === 'min-height') {
			return height > value;
		}
	}

	handleSectionExpandedChange = section => change => {
		this.setState(({ sections }) => ({
			sections: {
				...sections,
				[section]: change,
			},
		}));
	}

	handleSortingChange = section => (column, direction) => {
		this.setState(({ sortings }) => ({
			sortings: {
				...sortings,
				[section]: {
					column,
					direction,
				},
			},
		}));
	}

	handleSettingChange = (setting, value) => {
		this.setState(({ toolSettings }) => ({
			toolSettings: {
				...toolSettings,
				[setting]: value,
			},
		}), this.postToolSettings);
	}

	postToolSettings = debounce(
		async () => {
			try {
				const { campaignID } = this.props;
				const { toolSettings } = this.state;
				await post(
					`/api/campaigns/${campaignID}/tool-settings/characterTool`,
					{ value: toolSettings }
				);
			} catch (err) {
				displayError('There was an error setting settings for this tool');
			}
		},
		250
	)

	handleSearchChange = search => value => {
		this.setState(({ searches }) => ({
			searches: {
				...searches,
				[search]: value,
			},
		}));
	}

	render() {
		const { view, character, sections, sortings, toolSettings, searches } = this.state;
		const { campaignID } = this.props;

		if (view === 'list') {
			return (
				<div>
					<CharacterList
						navigateToCharacter={this.navigateToCharacter}
						navigateToSettings={this.navigateToSettings}
						campaignID={campaignID}
					/>
				</div>
			);
		}

		if (view === 'settings') {
			return (
				<div>
					<Settings
						toolSettings={toolSettings}
						navigateBack={this.navigateBackFromSettings}
						handleSettingChange={this.handleSettingChange}
					/>
				</div>
			);
		}

		return (
			<div>
				<Display
					character={character}
					navigateBack={this.navigateToList}
					onPropertyChanged={this.onPropertyChanged}
					mediaQuery={this.mediaQuery}
					handleSectionExpandedChange={this.handleSectionExpandedChange}
					sections={sections}
					sortings={sortings}
					handleSortingChange={this.handleSortingChange}
					toolSettings={toolSettings}
					navigateToSettings={this.navigateToSettings}
					searches={searches}
					handleSearchChange={this.handleSearchChange}
				/>
			</div>
		);
	}
}