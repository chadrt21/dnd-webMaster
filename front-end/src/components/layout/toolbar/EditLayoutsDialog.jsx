import React from 'react';
import PropTypes from 'prop-types';

import {
	Overlay,
	Button,
	Classes,
	Keys,
	Icon,
	EditableText,
	Tooltip,
} from '@blueprintjs/core';

import Title from '../../title';
import SortableItem from '../../sortable-item';

import classNames from 'Utility/classNames';

import styles from './styles.less';

export default class EditLayoutsDialog extends React.Component {
	static propTypes = {
		onCancel: PropTypes.func.isRequired,
		updateLayouts: PropTypes.func.isRequired,
		layouts: PropTypes.array.isRequired,
		open: PropTypes.bool,
	}

	state = {
		name: '',
	}

	onKeyDown = event => {
		const { onCancel } = this.props;

		if (event.keyCode === Keys.ENTER) {
			onCancel();
		}
	}

	sortLayouts = (from, to) => {
		const { layouts, updateLayouts } = this.props;
		const temp = { ...layouts[from] };
		layouts[from] = layouts[to];
		layouts[to] = temp;
		updateLayouts(layouts);
	}

	editName = layout => name => {
		const { layouts, updateLayouts } = this.props;
		layout.name = name;
		updateLayouts(layouts);
	}

	deleteLayout = layout => () => {
		const { layouts, updateLayouts } = this.props;
		const newLayouts = layouts.filter(item => item !== layout);
		updateLayouts(newLayouts);
	}

	makeLayoutDefault = layout => () => {
		const { layouts, updateLayouts } = this.props;
		layouts.forEach(item => {
			if (item !== layout) {
				item.default = false;
			}
		});
		layout.default = !layout.default;
		updateLayouts(layouts);
	}

	mapSortableItems = (layout, index) => (
		<SortableItem
			index={index}
			id={layout.id}
			moveItem={this.sortLayouts}
		>
			<div className={styles.sortableItem}>
				<Icon
					icon="drag-handle-horizontal"
					className={classNames(styles.icon, styles.dragHandle)}
				/>
				<span className={styles.name}>
					<EditableText
						value={layout.name}
						onChange={this.editName(layout)}
					/>
				</span>
				<div className={styles.spacer} />
				<Tooltip
					content="Toggle default"
					hoverOpenDelay={500}
					modifiers={{
						arrow: false,
					}}
				>
					<Button
						className={classNames(
							styles.buttonMinimal,
							styles.defaultButton,
							layout.default ? styles.defaultSelected : null,
						)}
						icon="tick"
						minimal
						onClick={this.makeLayoutDefault(layout)}
					/>
				</Tooltip>
				<Button
					icon="trash"
					className={styles.buttonMinimal}
					minimal
					onClick={this.deleteLayout(layout)}
				/>
			</div>
		</SortableItem>
	)
	
	render() {
		const {
			open,
			onCancel,
			layouts,
		} = this.props;

		return (
			<Overlay
				isOpen={open}
				backdropClassName={styles.dialogRoot}
			>
				<div className={styles.dialogRoot}>
					<div className={classNames(styles.dialogCardEditLayouts, Classes.ELEVATION_3)}>
						<Title fontSize={25} className={styles.title}>Edit Saved Layouts</Title>
						<div className={styles.sortableItemContainer}>
							<div className={styles.sortableItemContent}>
								{layouts.map(this.mapSortableItems)}
							</div>
						</div>
						<div
							className={styles.buttonContainerEditLayouts}
						>
							<Button
								text="Close"
								className={styles.buttonMinimal}
								minimal
								onClick={onCancel}
							/>
						</div>
					</div>
				</div>
			</Overlay>
		);
	}
}
