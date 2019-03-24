import React from 'react';
import ToolBase from '../ToolBase';

import {
	Spinner,
} from '@blueprintjs/core';

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
		query: '',
		loadingQuery: false,
		result: {},
		count: 10,
		nextPageLoading: false,
		continueInfiniteScroll: true,
	}

	componentDidMount() {
		super.componentDidMount();
		this.search();
	}

	search = debounce(
		async () => {
			const { query, type, count } = this.state;
			const results = await get(`${formats[type].endpoint}?query=${query}&fields=${formats[type].fields}&count=${count}`);
			const continueInfiniteScroll = results.length === count;

			this.setState({
				results,
				loadingQuery: false,
				nextPageLoading: false,
				continueInfiniteScroll,
			});
		},
		250
	)

	onQueryChange = query => {
		this.setState({
			query,
			loadingQuery: true,
			count: 10,
		}, this.search);
	}

	onNavigateToResult = result => {
		this.setState({
			view: 'result',
			result,
		});
	}

	onNavigateBack = () => {
		this.setState({
			view: 'list',
		});
	}

	handleScroll = event => {
		const { nextPageLoading, continueInfiniteScroll } = this.state;

		if (
			continueInfiniteScroll &&
			!nextPageLoading &&
			event.target.scrollTop + event.target.clientHeight === event.target.scrollHeight
		) {
			this.setState(({ count }) => ({
				nextPageLoading: true,
				count: count + 10,
			}), this.search);
		}
	}
	
	render() {
		const {
			view,
			results,
			type,
			query,
			loadingQuery,
			result,
			nextPageLoading,
		} = this.state;

		if (view === 'list') {
			return (
				<div className={styles.scrollContainer} onScroll={this.handleScroll}>
					<div className={styles.root}>
						<SearchListDisplay
							onQueryChange={this.onQueryChange}
							query={query}
							resultFormat={formats[type]}
							results={results}
							loadingQuery={loadingQuery}
							onNavigateToResult={this.onNavigateToResult}
						/>
						{nextPageLoading ?
							<div className={styles.spinnerContainer}>
								<Spinner size={20} />
							</div>
							:
							null
						}
					</div>
				</div>
			);
		}

		return (
			<div className={styles.root}>
				<SearchResultDisplay
					onNavigateBack={this.onNavigateBack}
					result={result}
					resultFormat={formats[type]}
				/>
			</div>
		);
	}
}
