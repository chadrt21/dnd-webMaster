import debounce from 'Utility/debounce';
import { get } from 'Utility/fetch';
import styles from './mention.less';

import { Classes } from '@blueprintjs/core';

export default class Mention {
	tracking = false;
	query = '';
	atIndex = null;
	length = 0;
	dropdownContainer = null;
	idKey = '';
	nameKey = '';
	selectedIndex = 0;
	results = [];

	// Initialize mention module by setting onchange listener,
	// dropdown container, key bindings, and API config
	constructor(quill, options) {
		this.quill = quill;
		this.options = options;

		const rootContainer = document.querySelector(options.container);
		this.dropdownContainer = document.createElement('ul');
		this.dropdownContainer.classList.add(
			Classes.MENU,
			styles.dropDown,
			styles.hidden
		);
		rootContainer.appendChild(this.dropdownContainer);

		this.endpoint = options.endpoint;
		this.nameKey = options.nameKey;
		this.idKey = options.idKey;

		quill.on('text-change', this.update);
		quill.on('selection-change', this.selectionChange);

		// Down arrow key
		quill.keyboard.addBinding({
			key: 40,
			collapsed: true,
		}, this.handleArrow('down'));

		// Up arrow key
		quill.keyboard.addBinding({
			key: 38,
			collapsed: true,
		}, this.handleArrow('up'));

		// Enter key
		quill.keyboard.addBinding({
			key: 13,
			collapsed: true,
		}, this.handleEnter.bind(this));

		quill.keyboard.addBinding({
			key: 32,
			collapsed: true,
		}, this.handleSpace);

		quill.keyboard.bindings[13].unshift(quill.keyboard.bindings[13].pop());
	}

	handleSpace = () => {
		const selection = this.quill.getSelection();
		const [
			blot,
			position,
		] = this.quill.getLeaf(selection.index);
		if (blot.statics.blotName === 'mention' && position === 1) {
			this.quill.insertText(selection.index, ' ');
			this.quill.setSelection(selection.index + 1, 0);
		} else {
			return true;
		}
	}

	selectionChange = range => {
		if (this.tracking && range.index < this.atIndex) {
			this.stopTracking();
		}
	}

	// Listen to text input from user
	update = delta => {
		if (!this.tracking && delta.ops.find(op => op.insert === '@')) {
			this.startTracking();
		} else if (this.tracking) {
			this.updateQuery();
		}
		return true;
	}

	// Begin tracking text input after the at symbol
	startTracking = () => {
		const selection = this.quill.getSelection();
		if (selection) {
			this.tracking = true;
			this.query = '';
			this.atIndex = selection.index;
			this.positionDropdown(selection);
		}
	}

	// Stop tracking text input from the user
	stopTracking = () => {
		this.tracking = false;
		this.dropdownContainer.classList.add(styles.hidden);
	}

	// Update query
	updateQuery = debounce(
		async () => {
			const selection = this.quill.getSelection();
			if (selection) {
				const { index } = selection;
				if (index < this.atIndex) {
					this.stopTracking();
				}
				this.length = selection.index - this.atIndex;
				const query = this.quill.getText(this.atIndex, this.length);
				this.results = await get(`${this.endpoint}?query=${query}&count=5`);
				if (this.selectedIndex > this.results.length - 1) {
					this.selectedIndex = this.results.length - 1;
				}
				if (this.selectedIndex < 0) {
					this.selectedIndex = 0;
				}
				this.renderDropdown(this.results);
			}
		},
		250
	)

	// Renders the results in a dropdown list
	renderDropdown = results => {
		while (this.dropdownContainer.firstChild) {
			this.dropdownContainer.removeChild(this.dropdownContainer.firstChild);
		}

		results.forEach(
			(result, index) => {
				const container = document.createElement('li');
				container.classList.add(styles.dropDownChild);
				if (index === this.selectedIndex) {
					container.classList.add(styles.selected);
				}

				const link = document.createElement('a');
				link.classList.add(Classes.MENU_ITEM);
				link.classList.add(styles.menuItem);
				link.innerText = result[this.nameKey];

				link.onclick = () => this.handleSelect(index);

				container.appendChild(link);

				this.dropdownContainer.appendChild(container);
			}
		);

		if (this.tracking) {
			this.dropdownContainer.classList.remove(styles.hidden);
		}
	}

	// Positions the dropdown under the at index
	positionDropdown = selection => {
		const bounds = this.quill.getBounds(selection.index, 0);
		this.dropdownContainer.style.left = bounds.left;
		this.dropdownContainer.style.top = bounds.top + bounds.height + 5;
	}

	// Sets the selected highlighter on the dropdown
	setIndex = () => {
		[ ...this.dropdownContainer.childNodes ].forEach(
			(node, index) => {
				if (this.selectedIndex !== index) {
					node.classList.remove(styles.selected);
				} else {
					node.classList.add(styles.selected);
				}
			}
		);
	}

	// Handle when the user navigates with the arrow keys
	handleArrow = keyType => () => {
		if (!this.tracking) {
			return true;
		}
		if (keyType === 'up' && this.selectedIndex > 0) {
			this.selectedIndex--;
			this.setIndex();
		} else if (keyType === 'down' && this.selectedIndex < this.results.length - 1) {
			this.selectedIndex++;
			this.setIndex();
		}
	}

	// Handle selection of a resource
	handleSelect = index => {
		this.quill.deleteText(this.atIndex - 1, this.length + 1);
		this.quill.insertEmbed(this.atIndex - 1, 'mention', {
			name: this.results[index][this.nameKey],
			id: this.results[index][this.idKey],
		});
		this.quill.insertText(this.atIndex, ' ');
		this.quill.setSelection(this.atIndex + 1, 0);
		this.stopTracking();
	}

	// Handle the enter key
	handleEnter = () => {
		if (!this.tracking) {
			return true;
		}
		this.handleSelect(this.selectedIndex);
	}
}
