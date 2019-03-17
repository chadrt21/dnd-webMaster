import React from 'react';
import PropTypes from 'prop-types';

import {
	Button,
	Spinner,
} from '@blueprintjs/core';

import Title from '../../../title';
import List from '../../../list';

import { get, post } from 'Utility/fetch';
import { displayError } from '../../../toast';

import styles from './styles.less';

export default class NotesList extends React.Component {
	static propTypes = {
		campaignID: PropTypes.number.isRequired,
	}

	state = {
		notes: [],
		loading: true,
		creatingNote: false,
	}

	componentDidMount() {
		this.loadNotes();
	}

	loadNotes = async () => {
		try {
			const { campaignID } = this.props;

			const notes = await get(`/api/campaigns/${campaignID}/notes`);

			this.setState({
				notes: notes.map(note => ({ ...note, name: note.noteTitle })),
				loading: false,
			});
		} catch (err) {
			displayError('There was an error retrieving your notes!');
		}
	}

	handleNewNote = () => {
		this.setState({
			creatingNote: true,
		}, async () => {
			try {
				const { campaignID } = this.props;
				await post(`/api/campaigns/${campaignID}/notes`, {});
				this.setState({
					creatingNote: false,
				}, this.loadNotes);
			} catch (err) {
				displayError('There was an error creating the note');
			}
		});
	}

	render() {
		const {
			notes,
			loading,
			creatingNote,
		} = this.state;

		if (loading) {
			return (
				<Spinner size={30} />
			);
		}

		return (
			<div className={styles.root}>
				<Title
					fontSize={25}
					rightComponent={
						<Button
							minimal
							icon="plus"
							className={styles.button}
							loading={creatingNote}
							onClick={this.handleNewNote}
						/>
					}
				>
					Notes
				</Title>

				<List
					items={notes}
					renderItem={item => item.name || 'Untitled'}
				/>
			</div>
		);
	}
}
