import React from 'react';
import PropTypes from 'prop-types';

import {
	Button,
	Icon,
} from '@blueprintjs/core';

import styles from './styles.less';

export default class Table extends React.Component {
	static propTypes = {
		items: PropTypes.array.isRequired,
		head: PropTypes.object.isRequired,
		fullWidth: PropTypes.bool,
		onItemSelect: PropTypes.func,
		sortable: PropTypes.bool,
		sortingDirection: PropTypes.oneOf([
			'asc',
			'desc',
		]),
		sortingColumn: PropTypes.string,
		handleSortChange: PropTypes.func,
	}

	state = {
		sortingColumn: '',
		sortingDirection: 'asc',
	}

	componentDidMount() {
		const { sortingDirection, sortingColumn } = this.props;
		const state = {};
		if (sortingDirection) {
			state.sortingDirection = sortingDirection;
		}
		if (sortingColumn) {
			state.sortingColumn = sortingColumn;
		}
		this.setState(state);
	}

	handleSortChange = col => {
		const { sortingColumn, sortingDirection } = this.state;

		if (sortingColumn === col) {
			// Change direction
			this.setState({
				sortingDirection: sortingDirection === 'asc' ? 'desc' : 'asc',
			}, () => {
				const { handleSortChange } = this.props;
				const { sortingDirection } = this.state;
				if (!handleSortChange) return;
				handleSortChange(col, sortingDirection);
			});
		} else {
			// Set sorting to new column
			this.setState({
				sortingDirection,
				sortingColumn: col,
			}, () => {
				const { handleSortChange } = this.props;
				const { sortingDirection } = this.state;
				if (!handleSortChange) return;
				handleSortChange(col, sortingDirection);
			});
		}
	}

	renderHead = head => {
		const cols = Object.keys(head);
		return cols.map(this.renderHeadComponent(head));
	}

	renderHeadComponent = head => key => {
		const { sortable } = this.props;
		const { sortingDirection, sortingColumn } = this.state;
		const col = head[key];

		return (
			<th onClick={sortable ? () => this.handleSortChange(key) : undefined}>
				{col.name}
				{sortable && sortingColumn === key ?
					<Button
						minimal
						className={styles.button}
						small
						onClick={() => this.handleSortChange(key)}
						icon={
							<Icon
								icon={sortingDirection === 'asc' ? 'arrow-up' : 'arrow-down'}
								className={styles.icon}
							/>
						}
					/>
					:
					null
				}
			</th>
		);
	}

	mapRows = head => row => {
		const headKeys = Object.keys(head);
		return (
			<tr>
				{headKeys.map(this.mapColumns(row, head))}
			</tr>
		);
	}

	mapColumns = (row, head) => headKey => {
		const headObj = head[headKey];

		if (typeof headObj.renderCol === 'function') {
			return (
				<td>
					{headObj.renderCol(row[headKey], row)}
				</td>
			);
		}

		return (
			<td>
				{row[headKey]}
			</td>
		);
	}

	withSafeSort = arr => arr.map(item => item)

	sortItems = (a, b) => {
		const { sortingDirection, sortingColumn } = this.state;
		const valueA = a[sortingColumn];
		const valueB = b[sortingColumn];

		let value;
		if (valueA > valueB) {
			value = 1;
		} else if (valueA === valueB) {
			value = 0;
		} else if (valueA < valueB) {
			value = -1;
		}

		if (sortingDirection === 'asc') {
			return value;
		} else {
			return value * -1;
		}
	}

	doSort = items => {
		const { sortingDirection, sortingColumn } = this.state;
		const { head } = this.props;

		if (!head[sortingColumn] || (sortingDirection !== 'asc' && sortingDirection !== 'desc')) {
			return items;
		}

		return this.withSafeSort(items).sort(this.sortItems);
	}
	
	render() {
		const {
			items,
			head,
			fullWidth,
			onItemSelect,
			sortable,
		} = this.props;

		return (
			<table className={[
				styles.root,
				fullWidth ? styles.fullWidth : null,
				onItemSelect ? styles.selectable : null,
				sortable ? styles.sortable : null,
			].join(' ')}>
				<thead>
					<tr>
						{this.renderHead(head)}
					</tr>
				</thead>
				<tbody>
					{this.doSort(items).map(this.mapRows(head))}
				</tbody>
			</table>
		);
	}
}