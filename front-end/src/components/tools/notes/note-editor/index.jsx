import React from 'react';
import PropTypes from 'prop-types';

import ReactQuill from 'react-quill';

import {
	EditableText,
	Button,
	Spinner,
} from '@blueprintjs/core';

import Title from '../../../title';
import Toolbar from './Toolbar';

import styles from './styles.less';

export default class NoteEditor extends React.Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
		note: PropTypes.string.isRequired,
		onPropertyChanged: PropTypes.func.isRequired,
		onBack: PropTypes.func.isRequired,
		savingNote: PropTypes.bool,
	}

	render() {
		const {
			title,
			note,
			onBack,
			onPropertyChanged,
			savingNote,
		} = this.props;

		return (
			<div className={styles.root}>
				<Title
					leftComponent={
						<Button
							icon="arrow-left"
							onClick={onBack}
							className={styles.button}
							minimal
						/>
					}
					rightComponent={
						savingNote ?
							<Spinner size={20} className={styles.spinner} />
							:
							null
					}
					fontSize={25}
					className={styles.title}
				>
					<EditableText
						value={title}
						onChange={onPropertyChanged('noteTitle')}
						placeholder="Title..."
					/>
				</Title>
				<Toolbar />
				<ReactQuill
					value={note}
					onChange={onPropertyChanged('noteContent')}
					theme="bubble"
					modules={{
						toolbar: {
							container: '#toolbar',
						},
					}}
					placeholder="Your note..."
				/>
			</div>
		);
	}
}
