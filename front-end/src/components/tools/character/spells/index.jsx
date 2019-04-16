/* eslint-disable no-console */

import React from 'react';
import PropTypes from 'prop-types';

import {
	InputGroup,
	Button,
	Icon,
} from '@blueprintjs/core';

import ResourceSelect from '../../../resource-select';
import Table from '../../../table';

import styles from './styles.less';

export default class Spells extends React.Component {
	static propTypes = {
		onSearchChange: PropTypes.func.isRequired,
		spells: PropTypes.array.isRequired,
		sortingDirection: PropTypes.string,
		sortingColumn: PropTypes.string,
		handleSortingChange: PropTypes.func,
		onPropertyChanged: PropTypes.func,
		search: PropTypes.string,
	}
	
	render() {
		const {
			spells,
			handleSortingChange,
			sortingColumn,
			sortingDirection,
			onPropertyChanged,
			search,
			onSearchChange,
		} = this.props;

		return (
			<div className={styles.root}>
				<div className={styles.searchContainer}>
					<InputGroup
						leftIcon="search"
						value={search}
						onChange={event => onSearchChange(event.target.value)}
					/>
					<div className={styles.spacer} />
					<ResourceSelect
						onResourceSelected={
							spell => onPropertyChanged('spells')([
								...spells.map(mySpell => mySpell.spellID),
								spell.spellID,
							])
						}
						endpoint="/api/search/spells"
						idKey="spellID"
						nameKey="spellName"
						fetchOnMount={true}
						queryOptions={{
							count: 8,
						}}
					>
						<Button
							minimal
							className={styles.button}
							icon={
								<Icon
									icon="plus"
									className={styles.icon}
								/>
							}
						/>
					</ResourceSelect>
				</div>
				<Table
					fullWidth
					sortable
					head={{
						spellName: {
							name: 'Name',
						},
						level: {
							name: 'Level',
						},
						removeButton: {
							name: '',
							sortable: false,
							renderCol: (value, row) => (
								<Button
									minimal
									className={styles.button}
									icon={
										<Icon
											icon="minus"
											className={styles.icon}
										/>
									}
									onClick={() => onPropertyChanged('spells')(
										spells
											.filter(spell => spell.spellID !== row.spellID)
											.map(spell => spell.spellID)
									)}
								/>
							),
							textAlign: 'right',
						},
					}}
					sortingColumn={sortingColumn}
					sortingDirection={sortingDirection}
					handleSortChange={handleSortingChange}
					items={spells}
				/>
			</div>
		);
	}
}