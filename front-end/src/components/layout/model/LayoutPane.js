export default class LayoutPane {
	type = '';
	paneId = -1;
	parent = null;
	state = {};
	tabName = null;

	constructor(jsonModel, parent) {
		if (!jsonModel.id && typeof jsonModel.id !== 'number') {
			this.paneId = LayoutPane._generateId();
		} else {
			this.paneId = jsonModel.id;
		}
		this.type = jsonModel.type;
		if (parent) {
			this.parent = parent;
		}
		if (jsonModel.state) {
			this.state = jsonModel.state;
		}
		if (jsonModel.tabName) {
			this.tabName = jsonModel.tabName;
		}
	}

	getType = () => this.type;
	getId = () => this.paneId;
	setState = state => {
		this.state = {
			...this.state,
			...state,
		};
	}
	getState = () => this.state;

	toJson = ({ ignoreState }) => {
		const obj = {
			type: this.type,
			id: this.paneId,
		};

		if (!ignoreState) {
			obj.state = this.state;
			obj.tabName = this.tabName;
		}

		return obj;
	};

	remove = () => {
		if (this.parent) {
			return this.parent.removePane(this);
		}
		return false;
	}

	getParent = () => this.parent;
	setParent = parent => (this.parent = parent)
}

LayoutPane._lastId = 0;
LayoutPane._generateId = () => LayoutPane._lastId++;