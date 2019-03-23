import React from 'react';
import ToolBase from '../ToolBase';

import SearchListDisplay from './search-list-display';
import SearchResultDisplay from './search-result-display';

import { get } from 'Utility/fetch';
import debounce from 'Utility/debounce';

import styles from './styles.less';

export default class SearchTool extends ToolBase {
	state = {
		view: 'list',
		results: [],
		resultFormat: {
			image: 'none',
			subHeadings: [
				{
					key: 'spellRange',
					display: 'Range',
					includeInPreview: true,
				},
				{
					key: 'duration',
					display: 'Duration',
					includeInPreview: true,
				},
				{
					key: 'castingTime',
					display: 'Casting Time',
				},
			],
			displayName: 'spellName',
			description: 'spellDesc',
		},
		type: 'spell',
		endpoint: '/api/search/spells',
		query: '',
		loadingQuery: false,
	}

	search = debounce(
		async () => {
			const { endpoint, query } = this.state;
			const results = await get(`${endpoint}?query=${query}&fields=spellRange,duration,castingTime,spellDesc`);
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
			resultFormat,
			query,
			loadingQuery,
		} = this.state;

		if (view === 'list') {
			return (
				<div className={styles.root}>
					<SearchListDisplay
						onQueryChange={this.onQueryChange}
						query={query}
						resultFormat={resultFormat}
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
