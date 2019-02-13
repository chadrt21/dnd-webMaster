import Layout from './Layout';
import LayoutPanel from './LayoutPanel';

export default class LayoutRow {
	panels = [];
	widths = [];
	rowId = -1;
	parent = null;

	constructor(jsonModel, parent) {
		this.rowId = LayoutRow._generateId();
		if (parent) {
			this.parent = parent;
		}
		
		this.panels = jsonModel.panels.map(panel => {
			if (panel.rows && Array.isArray(panel.rows)) {
				return new Layout(panel, this);
			}
			return new LayoutPanel(panel, this);
		});

		if (jsonModel.widths) {
			this.widths = jsonModel.widths;
		} else {
			for (let i = 0; i < this.panels.length; i++) {
				this.widths.push({ size: 256, resize: 'stretch' });
			}
		}
	}

	getPanelWidths = () => this.widths;
	getPanels = () => this.panels;
	getParent = () => this.parent;
	setParent = parent => (this.parent = parent);
	monitorUpdates = () => widths => {this.widths = widths;};
	getId = () => this.rowId;

	toJson = ignoreWidths => {
		const obj = {
			panels: this.panels.map(panel => panel.toJson(ignoreWidths))
		};

		if (!ignoreWidths) {
			obj.widths = this.widths;
		}

		return obj;
	}

	updateWidths = () => {
		this.widths = [];
		for (let i = 0; i < this.panels.length; i++) {
			this.widths.push({ size: 256, resize: 'stretch' });
		} 
	}

	removePanel = panel => {
		const index = this.panels.indexOf(panel);
		if (index > -1) {
			this.panels.splice(index, 1);
			this.updateWidths();
			if (this.panels.length === 0 && this.parent) {
				this.parent.removeRow(this);
			}
			return true;
		}
		return false;
	}

	addPanel = (panel, direction, targetPanel) => {
		panel.setParent(this);
		let index = this.panels.indexOf(targetPanel);
		if (index > -1) {
			if (direction === 'after') {
				index++;
			}
			this.panels.splice(index, 0, panel);
		} else {
			this.panels.push(panel);
		}
	}

	replace = (oldPanel, newPanel) => {
		const index = this.panels.indexOf(oldPanel);
		if (index > -1) {
			this.panels.splice(index, 1, newPanel);
			newPanel.setParent(this);
		}
	}
}

LayoutRow._lastRowId = 0;
LayoutRow._generateId = () => LayoutRow._lastRowId++;