import React from 'react';
import PropTypes from 'prop-types';

import Tab from './DraggableTab';
import DropTargetOverlay from './DropTargetOverlay';
import TabContainer from './TabContainerDropTarget';

import styles from './styles.less';

export default class ContentPanel extends React.Component {
	static propTypes = {
		onTabChanged: PropTypes.func.isRequired,
		defaultSelected: PropTypes.number,
		removePane: PropTypes.func.isRequired,
		panes: PropTypes.array,
		dropPaneIntoPanel: PropTypes.func,
		movePane: PropTypes.func,
		renderContent: PropTypes.func,
	}
	
	state = {
		currentTab: 0
	}

	handleTabChanged = (currentTab, cb) => {
		const { onTabChanged } = this.props;
		this.setState({ currentTab }, () => {
			onTabChanged(currentTab);
			if (cb) {
				cb();
			}
		});
	}

	componentDidMount() {
		const { defaultSelected } = this.props;
		this.setState({ currentTab: defaultSelected });
	}

	handleRemovePane = (index, pane) => event => {
		event.stopPropagation();
		const { removePane } = this.props;
		const { currentTab } = this.state;
		if (currentTab > 0) {
			this.handleTabChanged(0, () => removePane(pane) );
		} else {
			removePane(pane);
		}
	}

	mapTabs = (pane, index) => {
		const { currentTab } = this.state;

		return (
			<Tab
				label={`Pane ${pane.getType()}`}
				pane={pane}
				selected={currentTab === index}
				onClick={() => this.handleTabChanged(index)}
				onClose={this.handleRemovePane(index, pane)}
				key={index}
			/>
		);
	}

	componentWillReceiveProps(nextProps) {
		const { currentTab } = this.state;
		if (!nextProps.panes[currentTab]) {
			this.setState({ currentTab: 0 });
		}
	}

	render() {
		const { panes, dropPaneIntoPanel, movePane, renderContent } = this.props;
		const { currentTab } = this.state;

		return (
			<div className={styles.pane}>
				<div className={styles.paneHeader}>
					<TabContainer onDrop={item => {
						dropPaneIntoPanel(item.pane, () => {
							this.focusPane(item.pane);
						});
					}}>
						{panes && panes.map(this.mapTabs)}
					</TabContainer>
				</div>
				<div className={styles.paneContent}>
					{renderContent(currentTab)}
					<DropTargetOverlay
						type="half"
						direction="left"
						onDrop={item => movePane('before', 'soft', item.pane)}
					/>
					
					<DropTargetOverlay
						type="half"
						onDrop={item => movePane('after', 'soft', item.pane)}
					/>
					
					<DropTargetOverlay
						type="top-half"
						onDrop={item => movePane('above', 'soft', item.pane)}
					/>
					
					<DropTargetOverlay
						type="bottom-half"
						onDrop={item => movePane('below', 'soft', item.pane)}
					/>
				</div>
			</div>
		);
	}
}