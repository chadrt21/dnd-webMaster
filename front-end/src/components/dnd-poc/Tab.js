import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from '@blueprintjs/core';
import styles from './styles.less';

export default class Tab extends React.Component {
	static propTypes = {
		selected: PropTypes.bool.isRequired,
		label: PropTypes.string.isRequired,
		onClick: PropTypes.func.isRequired,
		onClose: PropTypes.func.isRequired,
	}

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