import React from 'react';
import { DragLayer } from 'react-dnd';

import Tab from './Tab';

import styles from './styles.less';

const getStyles = currentOffset => {
	if (!currentOffset) {
		return { display: 'none' };
	}

	let { x, y } = currentOffset;
	const transform = `translate(${x}px, ${y}px)`;
	return {
		transform,
		WebkitTransform: transform
	};
}

const CustomDragLayer = ({ item, itemType, currentOffset, isDragging }) => {
	if (!isDragging) return null;

	if (itemType === 'TAB') {
		return (
			<div className={styles.dragLayer}>
				<div style={getStyles(currentOffset)}>
					<Tab label={item.label} selected/>
				</div>
			</div>
		)
	}
	return null;
}

export default DragLayer(monitor => ({
	item: monitor.getItem(),
	itemType: monitor.getItemType(),
	currentOffset: monitor.getSourceClientOffset(),
	isDragging: monitor.isDragging(),
}))(CustomDragLayer);