import React from 'react';

import Tab from './Tab';

import styles from './styles.less';

import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

const tabSource = {
	beginDrag: ({ label, pane }) => {
		return { label, pane };
	}
}

const collect = (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
	connectDragPreview: connect.dragPreview(),
})

class DraggableTab extends React.Component {	

	componentDidMount() {
		const { connectDragPreview } = this.props;
		if (connectDragPreview) {
			connectDragPreview(getEmptyImage(), { captureDraggingState: true });
		}
	}

	render() {
		const { label, connectDragSource, isDragging, pane, connectDragPreview, ...rest } = this.props;
		return connectDragSource(
			<div>
				<Tab
					classes={{
						root: styles.tab
					}}
					label={label}
					{...rest} />
			</div>
		);
	}
}

export default DragSource('TAB', tabSource, collect)(DraggableTab);