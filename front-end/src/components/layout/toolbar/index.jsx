/**
 * @description This is the layout toolbar component from which users can add tools to the layout,
 * save/load custom layout configurations, and navigate to the settings and home pages.
 * 
 * @author Joseph Stewart
 */

import React from 'react';
import PropTypes from 'prop-types';

import {
	Button,
	Icon,
	Popover,
	Position,
	Menu,
	MenuItem,
} from '@blueprintjs/core';

import styles from './styles.less';

export default class Toolbar extends React.Component {
	static propTypes = {
		saveLayout: PropTypes.func.isRequired,
		addTool: PropTypes.func.isRequired,
		goHome: PropTypes.func.isRequired,
		tools: PropTypes.array.isRequired,
		campaignID: PropTypes.number.isRequired,
	}

	mapTool = tool => {
		const { addTool } = this.props;

		return (
			<MenuItem text={tool.displayName} onClick={() => addTool(tool.name)} />
		);
	}
	
	render() {
		const {
			saveLayout,
			tools,
			goHome,
			campaignID,
		} = this.props;

		return (
			<div className={styles.toolbar}>
				<Button
					minimal
					onClick={goHome}
					className={styles.toolbarButton}
				>
					Home
				</Button>
				<Popover
					position={Position.BOTTOM_LEFT}
					minimal
				>
					<Button
						minimal
						className={styles.toolbarButton}
					>
						Tools
					</Button>
					<Menu className={styles.toolbarMenu}>
						{tools.map(this.mapTool)}
					</Menu>
				</Popover>
				<Button
					minimal
					onClick={saveLayout}
					className={styles.toolbarButton}
				>
					Layout
				</Button>
				<Button
					minimal
					className={styles.toolbarButton}
				>
					Settings
				</Button>
				<div className={styles.spacer} />
				<Popover minimal>
					<Button
						icon={
							<Icon
								icon="user"
								color="#F7E3AF"
								iconSize={24}
							/>
						}
						minimal
						className={styles.toolbarButton}
						large
					/>
					<Menu className={styles.toolbarMenu}>
						<MenuItem text="Logout" href="/api/auth/logout" />
						<MenuItem text="Profile" href={`/profile?back=/app/${campaignID}`} />
					</Menu>
				</Popover>
			</div>
		);
	}
}