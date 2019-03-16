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

import SaveLayoutDialog from './SaveLayoutDialog';

import { displayError } from '../../toast';
import { get, post } from 'Utility/fetch';

import styles from './styles.less';

export default class Toolbar extends React.Component {
	static propTypes = {
		loadLayout: PropTypes.func.isRequired,
		addTool: PropTypes.func.isRequired,
		goHome: PropTypes.func.isRequired,
		tools: PropTypes.array.isRequired,
		campaignID: PropTypes.number.isRequired,
		currentLayout: PropTypes.object,
	}

	state = {
		savedLayouts: [],
		nameDialogOpen: false,
	}

	componentWillReceiveProps(nextProps) {
		this.loadLayouts(nextProps);
	}

	mapTool = tool => {
		const { addTool } = this.props;

		return (
			<MenuItem text={tool.displayName} onClick={() => addTool(tool.name)} />
		);
	}

	saveLayout = name => {
		const { currentLayout } = this.props;
		const layout = currentLayout.toJson({ ignoreState: true });

		this.setState(({ savedLayouts }) => ({
			savedLayouts: [
				...savedLayouts,
				{
					name,
					layout,
				},
			],
			nameDialogOpen: false,
		}), async () => {
			try {
				const { campaignID } = this.props;
				const { savedLayouts } = this.state;
				await post(
					`/api/campaigns/${campaignID}/layouts`,
					{
						layoutData: savedLayouts,
					}
				);
			} catch (err) {
				displayError('There was an error saving the layout');
			}
		});
	}

	loadLayouts = async ({ campaignID, loadLayout }) => {
		const savedLayouts = await get(`/api/campaigns/${campaignID}/layouts`);
		this.setState({ savedLayouts }, () => {
			const { savedLayouts } = this.state;
			for (let i = 0; i < savedLayouts.length; i++) {
				if (savedLayouts[i].default) {
					loadLayout(savedLayouts[i].layout);
					break;
				}
			}
		});
	}

	mapLayoutMenuItem = layoutItem => {
		const { loadLayout } = this.props;

		return (
			<MenuItem text={layoutItem.name} onClick={() => loadLayout(layoutItem.layout)} />
		);
	}
	
	render() {
		const {
			tools,
			goHome,
			campaignID,
		} = this.props;
		const {
			savedLayouts,
			nameDialogOpen,
		} = this.state;

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
				<Popover
					position={Position.BOTTOM_LEFT}
					minimal
				>
					<Button
						minimal
						className={styles.toolbarButton}
					>
						Layout
					</Button>
					<Menu className={styles.toolbarMenu}>
						<MenuItem
							text="Saved Layouts"
							popoverProps={{
								hoverCloseDelay: 400,
								captureDismiss: true,
							}}
						>
							{savedLayouts.map(this.mapLayoutMenuItem)}
						</MenuItem>
						<MenuItem
							text="Save This Layout"
							onClick={() => this.setState({ nameDialogOpen: true })}
						/>
					</Menu>
				</Popover>
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
				<SaveLayoutDialog
					open={nameDialogOpen}
					onCancel={() => this.setState({ nameDialogOpen: false })}
					saveLayout={this.saveLayout}
				/>
			</div>
		);
	}
}