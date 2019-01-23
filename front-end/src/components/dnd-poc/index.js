import React from 'react';

import PanelGroup from 'react-panelgroup';
import Content from './Content';
import styles from './styles.less';

export default class Grid extends React.Component {
	state = {
		layout: [
			[ 1, 2 ],
			[ [
				[ 3 ],
				[ 4, 5 ],
				[ 6 ],
			], 7 ]
		]
	}

	mapLayoutRows = row => {
		if (!Array.isArray(row)) {
			return null;
		}
		return (
			<PanelGroup borderColor="black">
				{row.map(this.mapLayoutContentItems)}
			</PanelGroup>
		)
	}

	mapLayoutContentItems = contentItem => {
		if (Array.isArray(contentItem)) {
			return (
				<PanelGroup borderColor="black" direction="column">
					{contentItem.map(this.mapLayoutRows)}
				</PanelGroup>
			)
		}

		return (
			<Content id={contentItem} />
		)
	}

	removePanel = pid => {
		this.setState(({layout}) => ({
			layout: layout.map(this.findAndRemoveItem(pid))
		}));
	}

	findAndRemoveItem = pid => item => {
		let arr = [];
		for (let i = 0; i < item.length; i++) {
			if (Array.isArray(item[i])) {
				arr.push(item[i].map(this.findAndRemoveItem(pid)));
			} else if (pid !== item[i]) {
				arr.push(item[i]);
			}
		}
		return arr;
	}

	movePanel = (direction, pid, to) => {
		/*this.setState(({ layout }) => ({
			layout: layout.map(this.findAndMoveItem(direction, pid, to))
		}));*/
		const layout = this.state.layout.map(this.findAndMoveItem(direction, pid, to));
		this.setState({ layout });
	}

	findAndMoveItem = (direction, pid, to) => item => {
		let arr = [];
		for (let i = 0; i < item.length; i++) {
			if (Array.isArray(item[i])) {
				arr.push(item[i].map(this.findAndMoveItem(direction, pid, to)));
			} else if (to === item[i]) {
				arr.push(direction === 'after' ? to : pid);
				arr.push(direction === 'after' ? pid : to);
			} else if (pid !== item[i]) {
				arr.push(item[i]);
			}
		}
		return arr;
	}

	renderLayout = () => {
		const { layout } = this.state;
		return (
			<PanelGroup borderColor="black" direction="column">
				{layout.map(this.mapLayoutRows)}
			</PanelGroup>
		)
	}

	render() {
		return (
			<div className={styles.root}>
				<div className={styles.toolbar}>
					<button onClick={() => this.removePanel(2)}>Remove Pane 2</button>
					<button onClick={() => this.removePanel(4)}>Remove Pane 4</button>
					<button onClick={() => this.movePanel('before', 4, 1)}>Move pane 4 before pane 1</button>
					<button onClick={() => this.movePanel('after', 6, 7)}>Move pane 6 before pane 7</button>
				</div>
				<div className={styles.grid}>
					{this.renderLayout()}
				</div>
			</div>
		)
	}
}