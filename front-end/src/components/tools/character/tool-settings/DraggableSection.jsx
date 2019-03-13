import React from 'react';
import PropTypes from 'prop-types';
import {
	DragSource,
	DropTarget,
} from 'react-dnd';
import { findDOMNode } from 'react-dom';

import {
	Button,
	Icon,
} from '@blueprintjs/core';

import classNames from 'Utility/classNames';

import styles from './styles.less';

const itemSource = {
	beginDrag(props) {
		return {
			id: props.id,
			index: props.index,
		};
	},
};

const itemTarget = {
	hover(props, monitor, component) {
		if (!component) {
			return null;
		}
		const dragIndex = monitor.getItem().index;
		const hoverIndex = props.index;

		// Don't replace items with themselves
		if (dragIndex === hoverIndex) {
			return;
		}

		// Determine rectangle on screen
		/* eslint-disable-next-line */
		const hoverBoundingRect = findDOMNode(
			component,
		).getBoundingClientRect();

		// Get vertical middle
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

		// Determine mouse position
		const clientOffset = monitor.getClientOffset();

		// Get pixels to the top
		const hoverClientY = clientOffset.y - hoverBoundingRect.top;

		// Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%

		// Dragging downwards
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return;
		}

		// Dragging upwards
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return;
		}

		// Time to actually perform the action
		props.moveItem(dragIndex, hoverIndex);

		// Note: we're mutating the monitor item here!
		// Generally it's better to avoid mutations,
		// but it's good here for the sake of performance
		// to avoid expensive index searches.
		monitor.getItem().index = hoverIndex;
	},
};

const DraggableSection = ({
	index,
	displayName,
	visible,
	connectDragSource,
	connectDropTarget,
	item,
	handleSettingVisible,
	id,
}) => {
	const opacity = item && item.id === id ? .5 : 1;
	return connectDragSource(connectDropTarget((
		<div className={styles.sectionOrdering} key={id} style={{ opacity }}>
			<Icon
				icon="drag-handle-horizontal"
				className={classNames(styles.icon, styles.dragHandle)}
			/>
			<Button
				className={styles.button}
				minimal
				icon={
					<Icon icon={visible ? 'eye-open' : 'eye-off'} className={styles.icon} />
				}
				onClick={() => handleSettingVisible(index)}
			/>
			<span>{displayName}</span>
		</div>
	)));
};

DraggableSection.propTypes = {
	index: PropTypes.number.isRequired,
	displayName: PropTypes.string.isRequired,
	visible: PropTypes.bool.isRequired,
	handleSettingVisible: PropTypes.func.isRequired,
	moveItem: PropTypes.func.isRequired,
	id: PropTypes.string.isRequired,
	connectDragSource: PropTypes.func.isRequired,
	connectDropTarget: PropTypes.func.isRequired,
	isDragging: PropTypes.bool,
	item: PropTypes.object,
};

export default DropTarget(
	'CHARACTER_SECTION',
	itemTarget,
	connect => ({
		connectDropTarget: connect.dropTarget(),
	})
)(
	DragSource(
		'CHARACTER_SECTION',
		itemSource,
		(connect, monitor) => ({
			connectDragSource: connect.dragSource(),
			isDragging: monitor.isDragging(),
			item: monitor.getItem(),
		})
	)(
		DraggableSection
	)
);