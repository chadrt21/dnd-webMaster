import React from 'react';
import PropTypes from 'prop-types';

import {
	Button,
	Icon,
} from '@blueprintjs/core';

import Title from '../../../title';
import DraggableSection from './DraggableSection';

import styles from './styles.less';

export default class ToolSettings extends React.Component {
	static propTypes = {
		toolSettings: PropTypes.object.isRequired,
		navigateBack: PropTypes.func.isRequired,
		handleSettingChange: PropTypes.func.isRequired,
	}

	handleSettingVisible = index => {
		const { toolSettings, handleSettingChange } = this.props;
		toolSettings.orderings[index].visible = !toolSettings.orderings[index].visible;
		handleSettingChange(toolSettings);
	}

	moveItem = (from, to) => {
		const { toolSettings, handleSettingChange } = this.props;
		const temp = { ...toolSettings.orderings[from] };
		toolSettings.orderings[from] = toolSettings.orderings[to];
		toolSettings.orderings[to] = temp;
		handleSettingChange(toolSettings);
	}

	mapOrdering = (config, index) => (
		<DraggableSection
			visible={config.visible}
			index={index}
			id={config.name}
			displayName={config.displayName}
			handleSettingVisible={this.handleSettingVisible}
			moveItem={this.moveItem}
			key={config.name}
		/>
	)
	
	render() {
		const { toolSettings, navigateBack } = this.props;

		return (
			<div className={styles.root}>
				<div className={styles.header}>
					<Button
						minimal
						className={styles.button}
						icon={
							<Icon icon="arrow-left" className={styles.icon} />
						}
						onClick={navigateBack}
					/>
					<Title fontSize={24}>Settings</Title>
				</div>
				<div className={styles.body}>
					{toolSettings.orderings.map(this.mapOrdering)}
				</div>
			</div>
		);
	}
}