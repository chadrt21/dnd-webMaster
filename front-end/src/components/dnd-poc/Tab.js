import React from 'react';

import { Icon } from '@blueprintjs/core';
import styles from './styles.less';

export default class Tab extends React.Component {
	render() {
		const { selected, label, onClick, onClose } = this.props;

		return (
			<div className={`${styles.tab} ${selected ? styles.tabSelected : ''}`} onClick={onClick}>
				{label}
				{selected ?
					<Icon iconSize={12} icon="cross" onClick={onClose} className={styles.tabClose} />
				: null}
			</div>
		)
	}
}