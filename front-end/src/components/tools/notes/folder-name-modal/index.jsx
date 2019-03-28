import React from 'react';
import PropTypes from 'prop-types';

import Title from '../../../title';
import Modal from '../../../modal';
import {
	InputGroup,
	Keys,
	Button,
	Intent,
} from '@blueprintjs/core';

import styles from './styles.less';

export default class FolderNameModal extends React.Component {
	static propTypes = {
		open: PropTypes.bool.isRequired,
		onSubmit: PropTypes.func.isRequired,
		onCancel: PropTypes.func.isRequired,
	}

	state = {
		name: '',
	}

	handleKeyDown = event => {
		const { onSubmit } = this.props;
		const { name } = this.state;

		if (event.keyCode === Keys.ENTER) {
			onSubmit(name);
		}
	}
	
	render() {
		const {
			open,
			onSubmit,
			onCancel,
		} = this.props;
		const { name } = this.state;

		return (
			<Modal
				open={open}
				onOpening={() => this.setState({ name: '' })}
			>
				<Title fontSize={24}>Give this folder a name!</Title>
				<InputGroup
					onChange={event => this.setState({ name: event.target.value })}
					value={name}
					autoFocus
					className={styles.input}
					onKeyDown={this.handleKeyDown}
				/>
				<div className={styles.buttonContainer}>
					<Button
						minimal
						className={styles.buttonMinimal}
						onClick={onCancel}
					>
						Close
					</Button>
					<Button
						intent={Intent.PRIMARY}
						onClick={() => onSubmit(name)}
					>
						Submit
					</Button>
				</div>
			</Modal>
		);
	}
}
