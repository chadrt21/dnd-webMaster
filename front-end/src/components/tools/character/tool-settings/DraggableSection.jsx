import React from 'react';
import PropTypes from 'prop-types';

import {
	Button,
	Icon,
} from '@blueprintjs/core';

import SortableItem from '../../../sortable-item';

import classNames from 'Utility/classNames';

import styles from './styles.less';

const DraggableSection = ({
	index,
	displayName,
	visible,
	handleSettingVisible,
	moveItem,
	id,
}) => (
	<SortableItem
		index={index}
		moveItem={moveItem}
		id={id}
	>
		<div className={styles.sectionOrdering} key={id}>
			<Icon
				icon="drag-handle-horizontal"
				className={classNames(styles.icon, styles.dragHandle)}
			/>
			<Button
				className={styles.button}
				minimal
				icon={
					<Icon icon={visible ? 'eye-open' : 'eye-off'} className={styles.icon} />
				}
				onClick={() => handleSettingVisible(index)}
			/>
			<span>{displayName}</span>
		</div>
	</SortableItem>
);

DraggableSection.propTypes = {
	index: PropTypes.number.isRequired,
	displayName: PropTypes.string.isRequired,
	visible: PropTypes.bool.isRequired,
	handleSettingVisible: PropTypes.func.isRequired,
	moveItem: PropTypes.func.isRequired,
	id: PropTypes.string.isRequired,
	item: PropTypes.object,
};

export default DraggableSection;
