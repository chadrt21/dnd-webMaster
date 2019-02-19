/* This component is the root layout component, it manages which tools are on the screen
and where they go. It also handles rearranging of tools through drag and drop. */

import React from 'react';
import {
	NonIdealState,
} from '@blueprintjs/core';

import PanelGroup from './PanelGroup';
import ContentPanel from './ContentPanel';
import CustomDragLayer from './CustomDragLayer';
import Toolbar from './toolbar';

import styles from './styles.less';

import { addPane, movePane } from './model/layout-manager';

import Layout from './model/Layout';
import tools from '../tools';

const defaultLayout = {
	rows: [
		{ panels: [
			{ panes: [
				{ type: 'map' },
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
	state = {
		layout: new Layout(defaultLayout),
		reloading: false,
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
				renderContent={currentTab => (
					<React.Fragment>
						{panel.getPanes().map(this.mapContent(currentTab))}
					</React.Fragment>
				)}
				tools={tools}
			/>
		);
	}

	mapContent = currentTab => (pane, index) => {
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

		return (
			<div style={{ display: currentTab !== index ? 'none' : undefined }}>
				<Content
					key={`pane-${pane.getId()}`}
					pane={pane}
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

	saveLayout = () => {
		const { layout } = this.state;
		/* eslint-disable-next-line */
		console.log(layout.toJson());
	}

	goHome = () => {
		window.location.href = '/';
	}

	render() {
		const { layout } = this.state;

		return (
			<div className={styles.root}>
				<div className={styles.rootFlex}>
					<Toolbar
						saveLayout={this.saveLayout}
						addTool={this.addPane}
						goHome={this.goHome}
						tools={tools}
					/>
					<div className={styles.grid}>
						{this.renderLayout(layout)}
					</div>
				</div>
				<CustomDragLayer />
			</div>
		);
	}
}