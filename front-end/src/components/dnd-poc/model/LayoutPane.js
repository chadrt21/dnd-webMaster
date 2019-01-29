export default class LayoutPane {
	type = '';
	paneId = -1;
	parent = null;

	constructor(jsonModel, parent) {
		this.paneId = LayoutPane._generateId();
		this.type = jsonModel.type;
		if (parent) {
			this.parent = parent;
		}
	}

	getType = () => this.type;
	getId = () => this.paneId;

	toJson = () => ({
		type: this.type
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