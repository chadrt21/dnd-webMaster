import React from 'react';
import PropTypes from 'prop-types';
import {
	DragSource,
	DropTarget,
} from 'react-dnd';
import { findDOMNode } from 'react-dom';

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

const SortableItem = ({
	connectDragSource,
	connectDropTarget,
	item,
	id,
	children,
}) => {
	const opacity = item && item.id === id ? .5 : 1;
	return connectDragSource(connectDropTarget((
		<div key={id} style={{ opacity }}>
			{children}
		</div>
	)));
};

SortableItem.propTypes = {
	index: PropTypes.number.isRequired,
	moveItem: PropTypes.func.isRequired,
	id: PropTypes.any.isRequired,
	connectDragSource: PropTypes.func.isRequired, // Supplied by react-dnd
	connectDropTarget: PropTypes.func.isRequired, // Supplied by react-dnd
	children: PropTypes.node.isRequired,
	isDragging: PropTypes.bool, // Supplied by react-dnd
	item: PropTypes.object, // Supplied by react-dnd
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
		SortableItem
	)
);
