import React from 'react';
import PropTypes from 'prop-types';

import { DropTarget } from 'react-dnd';

import {
	Button,
} from '@blueprintjs/core';

const folderBackButtonDropTarget = {
	drop: (props, monitor) => {
		const item = monitor.getItem();
		props.moveIntoFolder(item);
	},
};

const FolderBackButton = ({ onBack, connectDropTarget, className }) => connectDropTarget(
	<span>
		<Button
			minimal
			icon="arrow-left"
			className={className}
			onClick={onBack}
		/>
	</span>
);

FolderBackButton.propTypes = {
	onBack: PropTypes.func.isRequired,
	className: PropTypes.string.isRequired,
	connectDropTarget: PropTypes.func.isRequired,
	moveIntoFolder: PropTypes.func.isRequired,
};

export default DropTarget(
	'NOTE_ITEM',
	folderBackButtonDropTarget,
	connect => ({ connectDropTarget: connect.dropTarget() })
)(
	FolderBackButton
);
