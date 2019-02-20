/* eslint-disable no-console */

import React from 'react';
import PropTypes from 'prop-types';

import Table from '../../../table';

import allSpells from '../../../../dummy-data/spells';

export default class Spells extends React.Component {
	static propTypes = {
		spells: PropTypes.array,
		sortingDirection: PropTypes.string,
		sortingColumn: PropTypes.string,
		handleSortingChange: PropTypes.func,
	}
	
	render() {
		const {
			spells,
			handleSortingChange,
			sortingColumn,
			sortingDirection,
		} = this.props;

		return (
			<Table
				onItemSelect={item => console.log(item)}
				fullWidth
				sortable
				head={{
					name: {
						name: 'Name',
					},
					level: {
						name: 'Level',
					},
				}}
				sortingColumn={sortingColumn}
				sortingDirection={sortingDirection}
				handleSortChange={handleSortingChange}
				items={spells.map(spellId => allSpells.find(spell => spell.index === spellId)).filter(spell => spell)}
			/>
		);
	}
}