import LayoutPane from './LayoutPane';

export default class LayoutPanel {
	panes = [];
	selectedPane = 0;
	panelId = -1;
	parent = null;

	constructor(jsonModel, parent) {
		this.panelId = LayoutPanel._generateId();
		if (parent) {
			this.parent = parent;
		}
		if (jsonModel.selectedPane) {
			this.selectedPane = jsonModel.selectedPane;
		}
		this.panes = jsonModel.panes.map(pane => new LayoutPane(pane, this));
	}

	getPanes = () => this.panes;

	toJson = ({ ignoreState }) => ({
		panes: this.panes.map(pane => pane.toJson({ ignoreState })),
		selectedPane: this.selectedPane,
	})

	removePane = pane => {
		const index = this.panes.indexOf(pane);
		if (index > -1) {
			if (this.selectedPane === index && index === this.panes.length - 1) {
				this.selectedPane = 0;
			}
			
			this.panes.splice(index, 1);

			if (this.panes.length === 0 && this.parent) {
				this.parent.removePanel(this);
			}
			return true;
		}
		return false;
	}

	addPane = pane => {
		this.panes.push(pane);
		pane.setParent(this);
	}

	focusPane = pane => {
		const index = this.panes.indexOf(pane);
		if (index > -1) {
			this.selectedPane = index;
		}
	}

	swapPanes = (from, to) => {
		const temp = this.panes[from];
		this.panes[from] = this.panes[to];
		this.panes[to] = temp;
	}

	getSelectedTab = () => this.selectedPane;
	getId = () => this.panelId;
	monitorUpdates = () => tab => this.selectedPane = tab;
	getParent = () => this.parent;
	setParent = parent => this.parent = parent;
}

LayoutPanel._lastPanelId = 0;
LayoutPanel._generateId = () => LayoutPanel._lastPanelId++;