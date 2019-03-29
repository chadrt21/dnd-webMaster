import React from 'react';
import PropTypes from 'prop-types';

import { DropTarget, DragSource } from 'react-dnd';

import {
	Icon,
	Button,
} from '@blueprintjs/core';

import styles from './styles.less';

const folderListItemDropTarget = {
	drop: (props, monitor) => {
		const item = monitor.getItem();
		if (item.sourceFolderID && item.sourceFolderID === props.folderID) {
			return false;
		}

		props.moveIntoFolder(
			props.folderID,
			{
				sourceNoteID: item.sourceNoteID,
				sourceFolderID: item.sourceFolderID,
			}
		);
	},
};

const folderListDragSource = {
	beginDrag: ({ folderID }) => ({ sourceFolderID: folderID }),
};

class FolderListItem extends React.Component {
	static propTypes = {
		folderName: PropTypes.string.isRequired,
		onDelete: PropTypes.func.isRequired,
		onEdit: PropTypes.func.isRequired,
		moveIntoFolder: PropTypes.func.isRequired,
		folderID: PropTypes.number.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
		connectDragSource: PropTypes.func.isRequired,
		isOver: PropTypes.bool,
	}

	render() {
		const {
			folderName,
			onDelete,
			onEdit,
			connectDragSource,
			connectDropTarget,
			isOver,
		} = this.props;

		return connectDragSource(connectDropTarget(
			<div className={styles.listItemContainer}>
				<span className={styles.folderContainer}>
					<Icon
						icon={isOver ? 'folder-open' : 'folder-close'}
						className={styles.icon}
					/>
					<span>{folderName}</span>
				</span>
				<div className={styles.spacer} />
				<div className={styles.actionButtons}>
					<Button
						icon="edit"
						small
						className={styles.button}
						onClick={onEdit}
						minimal
					/>
					<Button
						icon="trash"
						small
						className={styles.button}
						onClick={onDelete}
						minimal
					/>
				</div>
			</div>
		));
	}
}

export default DropTarget(
	'NOTE_ITEM',
	folderListItemDropTarget,
	(connect, monitor) => ({
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
	})
)(
	DragSource(
		'NOTE_ITEM',
		folderListDragSource,
		connect => ({
			connectDragSource: connect.dragSource(),
		})
	)(
		FolderListItem
	)
);
