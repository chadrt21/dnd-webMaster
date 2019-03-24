/* This component renders a row of tabs for a panel and handles when the user drops
a Tab into an existing panel */

import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import styles from './styles.less';

const target = {
	drop: (props, monitor) => {
		if (monitor.didDrop()) {
			return;
		}

		const { onDrop } = props;
		onDrop(monitor.getItem());
	},
};

class TabContainerDropTarget extends React.Component {
	static propTypes = {
		connectDropTarget: PropTypes.func.isRequired,
		onDrop: PropTypes.func.isRequired,
		children: PropTypes.node,
		isOver: PropTypes.bool,
		item: PropTypes.object,
		panelId: PropTypes.number,
	}
	
	render() {
		const { children, connectDropTarget, isOver, item, panelId } = this.props;

		const style = {
			backgroundColor: isOver && item.panelId !== panelId ? '#DACAAE' : undefined,
		};

		return connectDropTarget(
			<div className={styles.tabContainer} style={style}>
				{children}
			</div>
		);
	}
}

export default DropTarget('TAB', target, (connect, monitor) => ({
	isOver: monitor.isOver(),
	connectDropTarget: connect.dropTarget(),
	item: monitor.getItem(),
}))(TabContainerDropTarget);