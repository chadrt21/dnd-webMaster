import React from 'react';
import PropTypes from 'prop-types';

import {
	Card,
	InputGroup,
	Radio,
} from '@blueprintjs/core';

import styles from './styles.less';

export default class Filter extends React.Component {
	static propTypes = {
		onFilterChange: PropTypes.func.isRequired,
		activeFilters: PropTypes.object.isRequired,
		resultFormat: PropTypes.object.isRequired,
	}

	renderType = (type, key) => {
		const { activeFilters, onFilterChange } = this.props;

		if (type === 'text') {
			return (
				<InputGroup
					value={activeFilters[key] || ''}
					onChange={event => {
						onFilterChange(key, event.target.value);
					}}
				/>
			);
		} else if (type === 'boolean') {
			return (
				<React.Fragment>
					<Radio
						label="Yes"
						checked={activeFilters[key] === true}
						onChange={() => onFilterChange(key, true)}
						className={styles.radio}
					/>
					<Radio
						label="No"
						checked={activeFilters[key] === false}
						onChange={() => onFilterChange(key, false)}
						className={styles.radio}
					/>
					<Radio
						label="N/A"
						checked={activeFilters[key] !== false && activeFilters[key] !== true}
						onChange={() => onFilterChange(key, undefined)}
						className={styles.radio}
					/>
				</React.Fragment>
			);
		}

		return (
			<span>Filter type {type} is not supported</span>
		);
	}

	mapFilter = data => (
		<div className={styles.filter}>
			<span className={styles.filterKey}>{data.display}</span>
			{this.renderType(data.type, data.key)}
		</div>
	);

	render() {
		const { resultFormat } = this.props;

		return (
			<Card className={styles.root}>
				{resultFormat.filters ? resultFormat.filters.map(this.mapFilter) : <span>There are no filters</span>}
			</Card>
		);
	}
}
