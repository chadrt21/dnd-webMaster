import React from 'react';
import PropTypes from 'prop-types';

import {
	InputGroup,
	Spinner,
} from '@blueprintjs/core';

import SearchListItem from '../search-list-item';

import styles from './styles.less';

export default class SearchListDisplay extends React.Component {
	static propTypes = {
		onQueryChange: PropTypes.func.isRequired,
		results: PropTypes.array.isRequired,
		resultFormat: PropTypes.object.isRequired,
		query: PropTypes.string.isRequired,
		loadingQuery: PropTypes.bool,
	}

	mapResult = (result, index) => {
		const { resultFormat } = this.props;

		return (
			<SearchListItem
				result={result}
				resultFormat={resultFormat}
				index={index}
				key={result.spellID}
			/>
		);
	}

	render() {
		const {
			query,
			onQueryChange,
			loadingQuery,
			results,
		} = this.props;

		return (
			<div className={styles.root}>
				<div className={styles.header}>
					<InputGroup
						value={query}
						onChange={event => onQueryChange(event.target.value)}
						rightElement={
							loadingQuery ?
								<Spinner size={20} />
								:
								null
						}
						leftIcon="search"
						placeholder="Search..."
						big
					/>
				</div>
				{results.map(this.mapResult)}
			</div>
		);
	}
}
