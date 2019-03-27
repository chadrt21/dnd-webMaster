/* This component is the root layout component, it manages which tools are on the screen
and where they go. It also handles rearranging of tools through drag and drop. */

import React from 'react';
import PropTypes from 'prop-types';
import {
	NonIdealState,
	Spinner,
} from '@blueprintjs/core';

import PanelGroup from './PanelGroup';
import ContentPanel from './ContentPanel';
import CustomDragLayer from './CustomDragLayer';
import Toolbar from './toolbar';

import styles from './styles.less';

import { addPane, movePane, insertPaneIntoPanel } from './model/layout-manager';
import { get } from 'Utility/fetch';

import Layout from './model/Layout';
import tools from '../tools';
import { displayError } from '../toast';

const defaultLayout = {
	rows: [
		{ panels: [
			{ panes: [
				{ type: 'character' },
			] },
			{ rows: [
				{ panels: [
					{ panes: [
						{ type: 'npc 1' }, { type: 'npc 2' }, { type: 'npc 3' },
					] },
				] },
				{ panels: [
					{ panes: [
						{ type: 'pc' }, { type: 'pc' },
					] },
				] },
			] },
		] },
	],
};

export default class Grid extends React.Component {
	static propTypes = {
		match: PropTypes.object,
	}
	
	state = {
		layout: new Layout(defaultLayout),
		reloading: false,
		currentCampaignID: 0,
		campaignTitle: '',
		savedLayouts: [],
		validating: true,
	}

	fetchCampaign = () => {
		
	}

	async componentDidMount() {
		const { match } = this.props;
		const currentCampaignID = match.params.id;
		const campaign = await get(`/api/campaigns/${currentCampaignID}/exists`);
		if (campaign.exists) {
			this.setState({
				currentCampaignID,
				validating: false,
			});
		} else {
			// TODO: Handle case where campaign does not exist for user
		}
	}

	renderLayout = layout => (
		<PanelGroup
			borderColor="black"
			direction="column"
			panelWidths={layout.getPanelWidths()}
			onUpdate={layout.monitorUpdates()}
			key={`layout-${layout.getId()}`}
		>
			{layout.getRows().map(this.mapLayoutRows)}
		</PanelGroup>
	)

	mapLayoutRows = row => (
		<PanelGroup
			borderColor="black"
			panelWidths={row.getPanelWidths()}
			onUpdate={row.monitorUpdates()}
			key={`row-${row.getId()}`}
		>
			{row.getPanels().map(this.mapLayoutPanels)}
		</PanelGroup>
	)

	mapLayoutPanels = panel => {
		if (panel.constructor === Layout) {
			return this.renderLayout(panel);
		}

		return (
			<ContentPanel
				panes={panel.getPanes()}
				removePane={pane => {
					if (pane.remove()) {
						// Reload rendered layout if the pane was removed
						this.setLayout(this.state.layout);
					}
				}}
				dropPaneIntoPanel={(pane, cb) => {
					if (pane.getParent() !== panel && pane.remove()) {
						panel.addPane(pane);
						panel.focusPane(pane);
						this.setLayout(this.state.layout, cb);
					}
				}}
				movePane={(direction, variant, pane) => {
					if (movePane(direction, variant, pane, panel)) {
						this.setLayout(this.state.layout);
					}
				}}
				onTabChanged={panel.monitorUpdates()}
				defaultSelected={panel.getSelectedTab()}
				panelId={panel.getId()}
				key={`panel-${panel.getId()}`}
				renderContent={(currentTab, width, height) => (
					<React.Fragment>
						{panel.getPanes().map(this.mapContent(currentTab, width, height, panel))}
					</React.Fragment>
				)}
				tools={tools}
				moveTabs={(from, to) => {
					panel.swapPanes(from, to);
					this.setLayout(this.state.layout);
				}}
				insertPaneIntoPanel={
					(type, state, tabName) => this.insertPaneIntoPanel({ type, state, tabName }, panel)
				}
			/>
		);
	}

	mapContent = (currentTab, width, height, panel) => (pane, index) => {
		const tool = tools.find(tool => tool.name === pane.getType());
		let Content;

		if (tool && tool.component) {
			Content = tool.component;
		} else {
			Content = () => (
				<NonIdealState
					title="Tool Not Found"
					description={
						<span>
							We could not find a tool with the type <strong>{pane.getType()}</strong>.
						</span>
					}
					icon="error"
				/>
			);
		}

		const { currentCampaignID } = this.state;

		return (
			<div style={{ display: currentTab !== index ? 'none' : undefined }}>
				<Content
					key={`pane-${pane.getId()}`}
					pane={pane}
					width={width}
					height={height}
					campaignID={currentCampaignID}
					setTabName={name => {
						pane.tabName = name;
						this.setLayout(this.state.layout);
					}}
					insertPaneIntoPanel={
						(type, state, tabName) => this.insertPaneIntoPanel({ type, state, tabName }, panel)
					}
				/>
			</div>
		);
	}

	setLayout = newLayout => {
		this.setState(
			{ reloading: true },
			() => {
				this.setState(
					{ layout: newLayout },
					() => this.setState({ reloading: false })
				);
			});
	}

	addPane = type => {
		const { layout } = this.state;
		this.setLayout(addPane(layout, type));
	}

	insertPaneIntoPanel = (paneObject, target) => {
		insertPaneIntoPanel(paneObject, target);
		this.setLayout(this.state.layout);
	}

	loadLayout = layoutData => {
		this.setState(() => {

			let layout = {};
			try {
				layout = new Layout(layoutData);
			} catch (err) {
				displayError('There was an error loading the layout');
			}

			return {
				layout,
			};

		});
	}

	goHome = () => {
		window.location.href = '/';
	}

	render() {
		const { layout, validating, currentCampaignID } = this.state;

		return (
			<div className={styles.root}>
				<div className={styles.rootFlex}>
					<Toolbar
						loadLayout={this.loadLayout}
						addTool={this.addPane}
						goHome={this.goHome}
						tools={tools}
						campaignID={currentCampaignID}
						currentLayout={layout}
					/>
					{validating ?
						<div className={styles.spinnerContainer}>
							<Spinner />
						</div>
						:
						<div className={styles.grid}>
							{this.renderLayout(layout)}
						</div>
					}
				</div>
				<CustomDragLayer />
			</div>
		);
	}
}