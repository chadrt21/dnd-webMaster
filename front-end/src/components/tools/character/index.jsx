import React from 'react';
import ToolBase from '../ToolBase';

import CharacterList from './character-list';
import Display from './character-display';
import Settings from './tool-settings';

import { get } from 'Utility/fetch';

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
		},
		toolSettings: {
			orderings: [
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
			],
		},
		searches: {
			spells: '',
			equipment: '',
		},
	}

	navigateToCharacter = async item => {
		// TODO: Make API request here
		const { campaignID } = this.props;
		const character = await get(`/api/campaigns/${campaignID}/characters/${item.characterID}`);
		if (character.characterID) {
			this.setState({
				view: 'display',
				character,
			});
		}
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
			this.setState({
				character,
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
		}));
	}

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