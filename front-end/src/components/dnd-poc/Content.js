import React from 'react';
import styles from './styles.less';

export default class ContentPane extends React.Component {
	render() {
		const { id } = this.props;

		return (
			<div className={styles.content}>
				This is content pane {id}
			</div>
		)
	}
}