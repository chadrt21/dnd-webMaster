import LayoutRow from './LayoutRow';

export default class Layout {
	rows = [];
	widths = [];
	layoutId = -1;
	parent = null;

	constructor(jsonModel, parent) {
		this.layoutId = Layout._generateId();
		if (parent) {
			this.parent = parent;
		}

		this.rows = jsonModel.rows.map(row => new LayoutRow(row, this));

		if (jsonModel.widths) {
			this.widths = jsonModel.widths;
		} else {
			for (let i = 0; i < this.rows.length; i++) {
				this.widths.push({ size: 256, resize: 'stretch' });
			}
		}
	}

	getPanelWidths = () => this.widths;
	getRows = () => this.rows;
	getParent = () => this.parent;
	setParent = parent => (this.parent = parent);
	monitorUpdates = () => widths => {this.widths = widths;}
	getId = () => this.layoutId;

	hasOnePanel = () => {
		if (this.rows.length > 1) return null;
		if (this.rows[0] && this.rows[0].getPanels().length > 1) return null;
		return this.rows[0].getPanels()[0];
	}

	toJson = ignoreWidths => {
		const obj = {
			rows: this.rows.map(row => row.toJson(ignoreWidths))
		};

		if (!ignoreWidths) {
			obj.widths = this.widths;
		}

		return obj;
	}

	updateWidths = () => {
		this.widths = [];
		for (let i = 0; i < this.rows.length; i++) {
			this.widths.push({ size: 256, resize: 'stretch' });
		} 
	}

	removeRow = row => {
		const index = this.rows.indexOf(row);
		if (index > -1) {
			this.rows.splice(index, 1);
			this.updateWidths();
			if (this.rows.length === 0 && this.parent) {
				this.parent.removePanel(this);
			}
			return true;
		}
		return false;
	}

	addRow = (row, direction, targetRow) => {
		row.setParent(this);
		let index = this.rows.indexOf(targetRow);
		if (index > -1) {
			if (direction === 'below') {
				index++;
			}
			this.rows.splice(index, 0, row);
		} else {
			this.rows.push(row);
		}
	}
}

Layout._lastLayoutId = 0;
Layout._generateId = () => Layout._lastLayoutId++;