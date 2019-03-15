/**
 * @description This is the modal that allows the user to give their saved layout a name
 */

import React from 'react';
import PropTypes from 'prop-types';

import {
	Overlay,
	InputGroup,
	Button,
	Intent,
	Classes,
} from '@blueprintjs/core';

import Title from '../../title';

import classNames from 'Utility/classNames';

import styles from './styles.less';

export default class SaveLayoutDialog extends React.Component {
	static propTypes = {
		onCancel: PropTypes.func.isRequired,
		saveLayout: PropTypes.func.isRequired,
		open: PropTypes.bool,
	}

	state = {
		name: '',
	}
	
	render() {
		const {
			open,
			onCancel,
			saveLayout,
		} = this.props;

		const { name } = this.state;

		return (
			<Overlay
				isOpen={open}
				backdropClassName={styles.dialogRoot}
				onOpening={() => this.setState({ name: '' })}
			>
				<div className={styles.dialogRoot}>
					<div className={classNames(styles.dialogCard, Classes.ELEVATION_3)}>
						<Title fontSize={25} className={styles.title}>Give this layout a title!</Title>
						<InputGroup
							className={styles.input}
							autoFocus
							onChange={event => this.setState({ name: event.target.value })}
							value={name}
						/>
						<div
							className={styles.buttonContainer}
						>
							<Button
								text="Cancel"
								className={styles.buttonMinimal}
								minimal
								onClick={onCancel}
							/>
							<Button
								intent={Intent.PRIMARY}
								text="Save Layout"
								onClick={() => saveLayout(name)}
							/>
						</div>
					</div>
				</div>
			</Overlay>
		);
	}
}
