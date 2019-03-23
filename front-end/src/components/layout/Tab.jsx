/* This is the Tab UI component to indicate which panel is being displayed.
It handles the click event but does not implement click logic. That is passed through props */

import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from '@blueprintjs/core';
import styles from './styles.less';

import classNames from 'Utility/classNames';

export default class Tab extends React.Component {
	static propTypes = {
		selected: PropTypes.bool,
		label: PropTypes.string,
		onClick: PropTypes.func,
		onClose: PropTypes.func,
		isDragging: PropTypes.bool,
	}

	render() {
		const { selected, label, onClick, onClose, isDragging } = this.props;

		return (
			<div
				className={classNames(
					styles.tab,
					selected ? styles.tabSelected : null,
					isDragging ? styles.tabDragging : null
				)}
				onClick={onClick}>
				<span className={styles.text}>{label}</span>
				{selected ?
					<Icon iconSize={12} icon="cross" onClick={onClose} className={styles.tabClose} />
					: null
				}
			</div>
		);
	}
}