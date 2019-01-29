import React from 'react';

import Icon from '@material-ui/core/Icon';
import styles from './styles.less';

export default class Tab extends React.Component {
	render() {
		const { selected, label, onClick, onClose } = this.props;

		return (
			<div className={`${styles.tab} ${selected ? styles.tabSelected : ''}`} onClick={onClick}>
				{label}
				{selected ?
					<Icon className={styles.tabClose} onClick={onClose}>close</Icon>
				: null}
			</div>
		)
	}
}