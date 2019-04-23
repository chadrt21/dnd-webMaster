import React from 'react';
import PropTypes from 'prop-types';

import {
	InputGroup,
	Button,
	Icon,
} from '@blueprintjs/core';

import Table from '../../../table';
import ResourceSelect from '../../../resource-select';

import styles from './styles.less';

export default class Equipment extends React.Component {
	static propTypes = {
		onSearchChange: PropTypes.func.isRequired,
		equipment: PropTypes.array.isRequired,
		sortingDirection: PropTypes.string,
		sortingColumn: PropTypes.string,
		handleSortingChange: PropTypes.func,
		onPropertyChanged: PropTypes.func,
		search: PropTypes.string,	
	}

	render() {
		const {
			equipment,
			sortingDirection,
			sortingColumn,
			handleSortingChange,
			onPropertyChanged,
			onSearchChange,
			search,
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
						onResourceSelected={item => onPropertyChanged('equipment')([ ...equipment.map(item => item.equipmentID), item.equipmentID ])}
						endpoint="/api/search/equipment"
						idKey="equipmentID"
						nameKey="equipmentName"
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
						equipmentName: {
							name: 'Name',
						},
						categoryName: {
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
									onClick={() => onPropertyChanged('equipment')(equipment.filter(item => item.equipmentID !== row.equipmentID).map(item => item.equipmentID))}
								/>
							),
							textAlign: 'right',
						},
					}}
					sortingColumn={sortingColumn}
					sortingDirection={sortingDirection}
					handleSortChange={handleSortingChange}
					items={equipment}
				/>
			</div>
		);
	}
}