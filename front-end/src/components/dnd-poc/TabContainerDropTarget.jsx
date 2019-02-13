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
		children: PropTypes.node,
		isOver: PropTypes.bool,
	}
	
	render() {
		const { children, connectDropTarget, isOver } = this.props;

		const style = {
			backgroundColor: isOver ? '#AAA' : '#DDD',
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
}))(TabContainerDropTarget);