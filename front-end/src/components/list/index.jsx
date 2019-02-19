/**
 * @description This component provides UI for a generic list of things with the panel background color
 * @author Joseph Stewart
 */

import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.less';

export default class List extends React.Component {
	static propTypes = {
		items: PropTypes.array.isRequired,
		onItemSelected: PropTypes.func,
		className: PropTypes.string,
		leftComponent: PropTypes.node,
	}
	
	mapListItem = (item, index) => {
		const { onItemSelected, leftComponent } = this.props;
		return (
			<div key={index} className={styles.listRow} onClick={() => onItemSelected(item)}>
				{leftComponent || null}
				{item.name}
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