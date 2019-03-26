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
		activeFilters: {},
		filterOpen: false,
	}

	componentDidMount() {
		super.componentDidMount();
		this.search();
	}

	toggleFilterOpen = () => {
		this.setState(({ filterOpen }) => ({ filterOpen: !filterOpen }));
	}

	mapFilters = data => {
		const { activeFilters } = this.state;
		const value = activeFilters[data.key];
		if (!value && value !== false && value !== 0) {
			return '';
		}
		
		if (data.getFilter) {
			return data.getFilter(value);
		}
		
		return `${data.key}:${value}`;
	}

	onFilterChange = (filterKey, value) => {
		this.setState(
			({ activeFilters }) => ({
				activeFilters: {
					...activeFilters,
					[filterKey]: value,
				},
				count: 10,
			}),
			this.search
		);
	}

	search = debounce(
		async () => {
			const { query, type, count } = this.state;
			const results = await get(
				`${formats[type].endpoint}?query=${query}&fields=${formats[type].fields}&count=${count}&filter=${formats[type].filters ? formats[type].filters.map(this.mapFilters).filter(value => value) : ''}`
			);
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

	onTypeChange = type => {
		this.setState({
			type,
			query: '',
			activeFilters: {},
			result: {},
			results: [],
			count: 10,
		}, this.search);
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
			filterOpen,
			activeFilters,
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
							filterOpen={filterOpen}
							toggleFilterOpen={this.toggleFilterOpen}
							activeFilters={activeFilters}
							onFilterChange={this.onFilterChange}
							onTypeChange={this.onTypeChange}
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
