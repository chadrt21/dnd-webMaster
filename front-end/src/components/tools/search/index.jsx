import React from 'react';
import ToolBase from '../ToolBase';

import SearchListDisplay from './list-display';
import SearchResultDisplay from './result-display';

import { get } from 'Utility/fetch';
import debounce from 'Utility/debounce';
import formats from './search-types';

import styles from './styles.less';

export default class SearchTool extends ToolBase {
	state = {
		view: 'list',
		results: [],
		type: 'spells',
		endpoint: '/api/search/spells',
		query: '',
		loadingQuery: false,
	}

	search = debounce(
		async () => {
			const { endpoint, query, type } = this.state;
			const results = await get(`${endpoint}?query=${query}&fields=${formats[type].fields}`);
			this.setState({ results, loadingQuery: false });
		},
		250
	)

	onQueryChange = query => {
		this.setState({ query, loadingQuery: true }, this.search);
	}
	
	render() {
		const {
			view,
			results,
			type,
			query,
			loadingQuery,
		} = this.state;

		if (view === 'list') {
			return (
				<div className={styles.root}>
					<SearchListDisplay
						onQueryChange={this.onQueryChange}
						query={query}
						resultFormat={formats[type]}
						results={results}
						loadingQuery={loadingQuery}
					/>
				</div>
			);
		}

		return (
			<div className={styles.root}>
				<SearchResultDisplay

				/>
			</div>
		);
	}
}
