/**
 * @description This component provides UI for a generic list of things with the panel background color
 * @author Joseph Stewart
 */

import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'Utility/classNames';

import styles from './styles.less';

export default class List extends React.Component {
	static propTypes = {
		items: PropTypes.array.isRequired,
		onItemSelected: PropTypes.func,
		className: PropTypes.string,
		leftComponent: PropTypes.node,
		renderItem: PropTypes.func,
	}
	
	mapListItem = (item, index) => {
		const { onItemSelected, leftComponent, renderItem } = this.props;
		return (
			<div
				key={index}
				className={classNames(
					styles.listRow,
					onItemSelected ? styles.selectable : null
				)}
				onClick={onItemSelected ? () => onItemSelected(item) : null}
			>
				{leftComponent || null}
				{renderItem ? renderItem(item) : item.name}
			</div>
		);
	};
	
	render() {
		const { items, className } = this.props;
		return (
			<div className={[ styles.root, className ].join(' ')}>
				{items.map(this.mapListItem)}
			</div>
		);
	}
}