import React from 'react';

import PanelGroup from 'react-panelgroup';
import ContentPanel from './ContentPanel';
import CustomDragLayer from './CustomDragLayer';
import styles from './styles.less';

import { addPane, movePane } from './model/layout-manager';

import Layout from './model/Layout';

const defaultLayout = {
	rows: [
		{panels: [
			{panes: [
				{ type: 'map' }
			]},
			{rows: [
				{panels: [
					{panes: [
						{ type: 'npc 1' }, { type: 'npc 2' }, { type: 'npc 3' }
					]},
				]},
				{panels: [
					{panes: [
						{type: 'pc' }, { type: 'pc' }
					]}
				]}
			]}
		]}
	]
}

export default class Grid extends React.Component {
	state = {
		layout: new Layout(defaultLayout),
		reloading: false
	}

	renderLayout = layout => {
		return (
			<PanelGroup
				borderColor="black"
				direction="column"
				panelWidths={layout.getPanelWidths()}
				onUpdate={layout.monitorUpdates()}
			>
				{layout.getRows().map(this.mapLayoutRows)}
			</PanelGroup>
		)
	}

	mapLayoutRows = row => {
		return (
			<PanelGroup
				borderColor="black"
				panelWidths={row.getPanelWidths()}
				onUpdate={row.monitorUpdates()}
			>
				{row.getPanels().map(this.mapLayoutPanels)}
			</PanelGroup>
		)
	}

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
			/>
		)
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
		console.log(layout.toJson());
	}

	render() {
		const { reloading, layout } = this.state;

		return (
			<div className={styles.root}>
				<div className={styles.rootFlex}>
					<div className={styles.toolbar}>
						<button onClick={this.saveLayout}>Save layout</button>
						<button onClick={() => this.addPane('diceroller')}>Add dice roller!</button>
					</div>
					<div className={styles.grid}>
						{!reloading ? this.renderLayout(layout) : null}
					</div>
				</div>
				<CustomDragLayer />
			</div>
		)
	}
}