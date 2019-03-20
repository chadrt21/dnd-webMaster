export default Quill => {
	const InlineBlot = Quill.import('blots/embed');

	class MentionBlot extends InlineBlot {
		static blotName = 'mention';
		static tagName = 'A';
		static className = 'ql-mention-blot';
	
		static create(value) {
			const node = super.create(value);
			/* eslint-disable-next-line */
			node.innerText = `@${value.name}`;
			node.setAttribute('data-resource-id', value.id);
			return node;
		}

		static value(node) {
			let name = node.innerText.split('@')[1];
			if (!name) {
				name = 'Name not found';
			}
			const id = node.getAttribute('data-resource-id');
			return {
				id,
				name,
			};
		}
	}
	
	return MentionBlot;
};
