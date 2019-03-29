import React from 'react';
import PropTypes from 'prop-types';

import { DropTarget } from 'react-dnd';

import {
	Button,
	Tooltip,
} from '@blueprintjs/core';

const folderBackButtonDropTarget = {
	drop: (props, monitor) => {
		const item = monitor.getItem();
		props.moveIntoFolder(item);
	},
};

const FolderBackButton = ({ onBack, connectDropTarget, className, isDragging }) => connectDropTarget(
	<span>
		<Tooltip
			content="Move out of folder"
			isOpen={isDragging}
		>
			<Button
				minimal
				icon="arrow-left"
				className={className}
				onClick={onBack}
			/>
		</Tooltip>
	</span>
);

FolderBackButton.propTypes = {
	onBack: PropTypes.func.isRequired,
	className: PropTypes.string.isRequired,
	connectDropTarget: PropTypes.func.isRequired,
	moveIntoFolder: PropTypes.func.isRequired,
	isOver: PropTypes.bool,
};

export default DropTarget(
	'NOTE_ITEM',
	folderBackButtonDropTarget,
	(connect, monitor) => ({
		connectDropTarget: connect.dropTarget(),
		isDragging: !!monitor.getItem(),
	})
)(
	FolderBackButton
);
