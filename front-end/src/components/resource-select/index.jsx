import React from 'react';
import PropTypes from 'prop-types';

import {
	MenuItem,
	Spinner,
} from '@blueprintjs/core';
import {
	Select,
} from '@blueprintjs/select';

import { get } from 'Utility/fetch';
import debounce from 'Utility/debounce';

import styles from './styles.less';

export default class ResourceSelect extends React.Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		onResourceSelected: PropTypes.func.isRequired,
		endpoint: PropTypes.string.isRequired,
		idKey: PropTypes.string,
		nameKey: PropTypes.string,
		queryParameterName: PropTypes.string,
		queryOptions: PropTypes.object,
		fetchOnMount: PropTypes.bool,
	}

	state = {
		items: [],
		loading: false,
	}

	componentDidMount() {
		const { fetchOnMount } = this.props;

		// If we want to load data on mount then make an API call
		if (fetchOnMount) {
			this.onQueryChange('');
		}
	}
	
	renderItem = (item, props) => {
		const { idKey, nameKey } = this.props;
		return (
			<MenuItem
				text={item[nameKey || 'name']}
				onClick={props.handleClick}
				className={[
					styles.menuItem,
					props.modifiers.active ? styles.active : '',
				].join(' ')}
				key={item[idKey || 'id']}
			/>
		);
	}

	itemPredicate = (query, item) => {
		const { nameKey } = this.props;
		let key = 'name';
		if (nameKey) {
			key = nameKey;
		}

		if (typeof item[key] === 'string') {
			return new RegExp(query, 'i').test(item[key]);
		}

		return false;
	}

	// Debounce the query function to reduce the load on the server
	fetchQuery = debounce(async query => {
		const { endpoint, queryParameterName, queryOptions } = this.props;
		
		// Add any user defined query string options
		let queryString = '';
		if (queryOptions) {
			for (const key in queryOptions) {
				queryString += `${key}=${queryOptions[key]}&`;
			}
		}

		const items = await get(
			`${endpoint}?${queryString}${queryParameterName || 'query'}=${query}`
		);
		this.setState({
			items,
			loading: false,
		});
	}, 250);

	// Show the loading indicator immediately but debounce the actual fetching of data
	onQueryChange = query => {
		const { loading } = this.state;
		if (!loading) {
			this.setState({
				loading: true,
			}, () => this.fetchQuery(query));
		} else {
			this.fetchQuery(query);
		}
	}
	
	render() {
		const {
			children,
			onResourceSelected,
		} = this.props;

		const {
			items,
			loading,
		} = this.state;

		return (
			<Select
				items={items}
				itemRenderer={this.renderItem}
				itemPredicate={this.itemPredicate}
				popoverProps={{
					modifiers: {
						arrow: false,
					},
				}}
				onItemSelect={onResourceSelected}
				resetOnClose
				onQueryChange={this.onQueryChange}
				inputProps={{
					rightElement: loading ? <Spinner size={20} /> : undefined,
					placeholder: 'Search...',
				}}
			>
				{children}
			</Select>
		);
	}
}