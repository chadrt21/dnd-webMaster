export default class LayoutPane {
	type = '';
	paneId = -1;
	parent = null;
	state = {};

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

	toJson = () => ({
		type: this.type,
		id: this.paneId,
		state: this.state,
	});

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