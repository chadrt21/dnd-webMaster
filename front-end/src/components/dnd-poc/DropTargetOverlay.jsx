import React from 'react';
import { DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';

import styles from './styles.less';

const target = {
	drop: (props, monitor) => {
		if (monitor.didDrop()) {
			return;
		}

		const { onDrop } = props;
		onDrop(monitor.getItem());
	}
};

class DropTargetOverlay extends React.Component {
	static propTypes = {
		type: PropTypes.string.isRequired,
		direction: PropTypes.string.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
		isDragging: PropTypes.bool,
		itemType: PropTypes.string,
		isOver: PropTypes.bool,
		children: PropTypes.node,
	}
	
	render() {
		const {
			type,
			direction,
			isDragging,
			itemType,
			isOver,
			children,
			connectDropTarget
		} = this.props;

		if (!isDragging || itemType !== 'TAB') {
			return null;
		}

		const inlineStyle = {
			position: 'absolute',
			height: '100%',
			width: '100%',
			top: 0,
			zIndex: 50,
			display: !isDragging ? 'none' : undefined
		};

		if (type === 'full') {
			inlineStyle.width = '100%';
		} else if (type === 'half') {
			inlineStyle.width = '50%';
		} else if (type === 'bottom-half') {
			inlineStyle.height = '30%';
			inlineStyle.bottom = 0;
			inlineStyle.top = undefined;
		} else if (type === 'bottom-quarter') {
			inlineStyle.height = '15%';
			inlineStyle.bottom = 0;
			inlineStyle.top = undefined;
		} else if (type === 'top-half') {
			inlineStyle.height = '30%';
		} else if (type === 'top-quarter') {
			inlineStyle.height = '15%';
		} else {
			inlineStyle.width = '25%';
		}

		if (direction === 'left') {
			inlineStyle.left = 0;
		} else {
			inlineStyle.right = 0;
		}

		if (isOver) {
			inlineStyle.backgroundColor = `rgba(83, 83, 83, ${
				type === 'full' || type === 'top-half' || type === 'bottom-half' || type === 'half' ?
					'0.308'
					: '0.5'
			})`;
		}

		return connectDropTarget(
			<div className={styles.dragTargetOverlay} style={inlineStyle}>
				{children}
			</div>
		);
	}
}

export default DropTarget('TAB', target, (connect, monitor) => ({
	isOver: monitor.isOver({ shallow: true }),
	isDragging: !monitor.didDrop(),
	connectDropTarget: connect.dropTarget(),
	itemType: monitor.getItemType(),
}))(DropTargetOverlay);