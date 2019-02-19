import React from 'react';
import ToolBase from '../ToolBase';

import CharacterList from './character-list';
import Display from './display';

import characters from '../../../dummy-data/characters';

export default class CharacterTool extends ToolBase {
	state = {
		view: 'list',
		character: {},
	}

	navigateToCharacter = item => {
		// TODO: Make API request here
		const character = characters.find(character => character.id === item.id);
		this.setState({
			view: 'display',
			character,
		});
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

	render() {
		const { view, character } = this.state;

		if (view === 'list') {
			return (
				<div>
					<CharacterList
						navigateToCharacter={this.navigateToCharacter}
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
				/>
			</div>
		);
	}
}