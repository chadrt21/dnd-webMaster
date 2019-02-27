import React from 'react';
import ToolBase from '../ToolBase';

import CharacterList from './character-list';
import Display from './display';
import Settings from './tool-settings';

import characters from '../../../dummy-data/characters';

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

	navigateToCharacter = item => {
		// TODO: Make API request here
		const character = characters.find(character => character.id === item.id);
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

	handleNewCharacter = (name, isNPC) => {
		/* eslint-disable-next-line */
		console.log(`Creating new character ${name} (isNPC = ${isNPC})`);
	}

	render() {
		const { view, character, sections, sortings, toolSettings, searches } = this.state;

		if (view === 'list') {
			return (
				<div>
					<CharacterList
						navigateToCharacter={this.navigateToCharacter}
						navigateToSettings={this.navigateToSettings}
						handleNewCharacter={this.handleNewCharacter}
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