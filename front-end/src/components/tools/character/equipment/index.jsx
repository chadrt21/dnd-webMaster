import React from 'react';
import PropTypes from 'prop-types';

import {
	InputGroup,
	Button,
	Icon,
	MenuItem,
} from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';

import Table from '../../../table';

import styles from './styles.less';

import allEquipment from '../../../../dummy-data/equipment';

export default class Equipment extends React.Component {
	static propTypes = {
		equipment: PropTypes.array,
		sortingDirection: PropTypes.string,
		sortingColumn: PropTypes.string,
		handleSortingChange: PropTypes.func,
		onPropertyChanged: PropTypes.func,
	}

	renderItem = (item, props) => (
		<MenuItem
			text={item.name}
			onClick={props.handleClick}
			className={[
				styles.menuItem,
				props.modifiers.active ? styles.active : '',
			].join(' ')}
			key={item.index}
		/>
	)

	render() {
		const {
			equipment,
			sortingDirection,
			sortingColumn,
			handleSortingChange,
			onPropertyChanged,
		} = this.props;

		return (
			<div className={styles.root}>
				<div className={styles.searchContainer}>
					<InputGroup
						leftIcon="search"
					/>
					<div className={styles.spacer} />
					<Select
						items={allEquipment.filter(item => !equipment.find(itemId => itemId === item.index))}
						itemRenderer={this.renderItem}
						itemPredicate={(query, item) => item.name.includes(query)}
						popoverProps={{
							modifiers: {
								arrow: false,
							},
						}}
						onItemSelect={item => onPropertyChanged('equipment')([ ...equipment, item.index ])}
						resetOnClose
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
					</Select>
				</div>
				<Table
					fullWidth
					sortable
					head={{
						name: {
							name: 'Name',
						},
						equipment_category: {
							name: 'Type',
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
									onClick={() => onPropertyChanged('equipment')(equipment.filter(item => item !== row.index))}
								/>
							),
							textAlign: 'right',
						},
					}}
					sortingColumn={sortingColumn}
					sortingDirection={sortingDirection}
					handleSortChange={handleSortingChange}
					items={equipment.map(itemId => allEquipment.find(item => item.index === itemId)).filter(item => item)}
				/>
			</div>
		);
	}
}