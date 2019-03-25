import React from 'react';
import PropTypes from 'prop-types';

import {
	InputGroup,
	Spinner,
	Collapse,
	Button,
} from '@blueprintjs/core';

import SearchListItem from '../list-item';
import Filter from '../filter';

import styles from './styles.less';

export default class SearchListDisplay extends React.Component {
	static propTypes = {
		onQueryChange: PropTypes.func.isRequired,
		results: PropTypes.array.isRequired,
		resultFormat: PropTypes.object.isRequired,
		query: PropTypes.string.isRequired,
		onNavigateToResult: PropTypes.func.isRequired,
		onFilterChange: PropTypes.func.isRequired,
		toggleFilterOpen: PropTypes.func.isRequired,
		activeFilters: PropTypes.object,
		filterOpen: PropTypes.bool,
		loadingQuery: PropTypes.bool,
	}

	mapResult = (result, index) => {
		const { resultFormat, onNavigateToResult } = this.props;

		return (
			<SearchListItem
				result={result}
				resultFormat={resultFormat}
				index={index}
				key={result[resultFormat.id]}
				onNavigateToResult={() => onNavigateToResult(result)}
			/>
		);
	}

	render() {
		const {
			query,
			onQueryChange,
			loadingQuery,
			results,
			filterOpen,
			toggleFilterOpen,
			activeFilters,
			onFilterChange,
			resultFormat,
		} = this.props;

		return (
			<div className={styles.root}>
				<div className={styles.header}>
					<InputGroup
						value={query}
						onChange={event => onQueryChange(event.target.value)}
						rightElement={
							<div style={{ display: 'flex' }}>
								{loadingQuery ?
									<Spinner size={20} />
									:
									null
								}
								<Button
									className={styles.button}
									minimal
									icon="settings"
									onClick={toggleFilterOpen}
								/>
							</div>
						}
						leftIcon="search"
						placeholder="Search..."
						big
					/>
				</div>
				<Collapse isOpen={filterOpen}>
					<Filter
						activeFilters={activeFilters}
						onFilterChange={onFilterChange}
						resultFormat={resultFormat}
					/>
				</Collapse>
				{results.map(this.mapResult)}
			</div>
		);
	}
}
