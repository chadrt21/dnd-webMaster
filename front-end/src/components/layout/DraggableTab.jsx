/* eslint-disable no-unused-vars */

import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';

import Tab from './Tab';

import styles from './styles.less';

/* Our Tab component wrapped in the react-dnd DragSource HOC */

import { DragSource, DropTarget } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

const tabSource = {
	beginDrag: ({ label, pane, panelId, index }) => ({ index, label, pane, panelId }),
};

const tabTarget = {

	hover(props, monitor, component) {
		const dragIndex = monitor.getItem().index;
		const hoverIndex = props.index;
		const sourcePanelId = monitor.getItem().panelId;

		// Don't replace items with themselves
		if (dragIndex === hoverIndex) {
			return;
		}

		// Determine rectangle on screen
		/* eslint-disable-next-line */
		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

		// Get vertical middle
		const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

		// Determine mouse position
		const clientOffset = monitor.getClientOffset();

		// Get pixels to the top
		const hoverClientX = clientOffset.x - hoverBoundingRect.left;

		// Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%

		// Dragging downwards
		if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
			return;
		}

		// Dragging upwards
		if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
			return;
		}

		// Time to actually perform the action
		if ( props.panelId === sourcePanelId ) {
			props.moveTabs(dragIndex, hoverIndex);

			// Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
			// to avoid expensive index searches.
			monitor.getItem().index = hoverIndex;
		}		
	},

};

const collect = (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
	connectDragPreview: connect.dragPreview(),
	item: monitor.getItem(),
});

class DraggableTab extends React.Component {	
	static propTypes = {
		label: PropTypes.string.isRequired,
		connectDragSource: PropTypes.func.isRequired,
		pane: PropTypes.object.isRequired,
		connectDragPreview: PropTypes.func.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
		moveTabs: PropTypes.func.isRequired,
		isDragging: PropTypes.bool,
		panelId: PropTypes.number,
		item: PropTypes.object,
	}

	componentDidMount() {
		const { connectDragPreview } = this.props;
		if (connectDragPreview) {
			connectDragPreview(getEmptyImage(), { captureDraggingState: true });
		}
	}

	render() {
		const {
			label,
			connectDragSource,
			isDragging,
			pane,
			connectDragPreview,
			connectDropTarget,
			item,
			...rest
		} = this.props;

		return connectDragSource(connectDropTarget(
			<div>
				<Tab
					classes={{
						root: styles.tab,
					}}
					label={label}
					isDragging={item && item.pane.getId() === pane.getId()}
					{...rest}
				/>
			</div>
		));
	}
}

export default DropTarget(
	'TAB',
	tabTarget,
	connect => ({
		connectDropTarget: connect.dropTarget(),
	})
)(
	DragSource(
		'TAB',
		tabSource,
		collect
	)(
		DraggableTab
	)
);