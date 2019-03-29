import React from 'react';
import PropTypes from 'prop-types';

import { DragSource } from 'react-dnd';

import {
	Button,
} from '@blueprintjs/core';

import styles from './styles.less';

const noteListItemDragSource = {
	beginDrag: ({ noteID }) => ({ sourceNoteID: noteID }),
};

class NoteListItem extends React.Component {
	static propTypes = {
		noteName: PropTypes.string.isRequired,
		noteID: PropTypes.number.isRequired,
		onDelete: PropTypes.func.isRequired,
		connectDragSource: PropTypes.func.isRequired,
	}

	render() {
		const {
			noteName,
			onDelete,
			connectDragSource,
		} = this.props;

		return connectDragSource(
			<div className={styles.listItemContainer}>
				<span>{noteName || 'Untitled'}</span>
				<div className={styles.spacer} />
				<div className={styles.actionButtons}>
					<Button
						icon="trash"
						className={styles.button}
						onClick={onDelete}
						minimal
						small
					/>
				</div>
			</div>
		);
	}
}

export default DragSource(
	'NOTE_ITEM',
	noteListItemDragSource,
	connect => ({ connectDragSource: connect.dragSource() })
)(
	NoteListItem
);
