import React from 'react';
import ToolBase from '../ToolBase';

import NotesList from './notes-list';
import NoteEditor from './note-editor';

import { get, post } from 'Utility/fetch';
import debounce from 'Utility/debounce';
import { displayError } from '../../toast';

export default class NotesTool extends ToolBase {
	state = {
		view: 'list',
		note: {
			noteContent: '',
			noteTitle: '',
		},
		noteID: 0,
		savingNote: false,
	}

	loadNote = async () => {
		try {
			const { campaignID } = this.props;
			const { noteID } = this.state;
			const note = await get(`/api/campaigns/${campaignID}/notes/${noteID}`);

			this.setState({
				note,
				view: 'editor',
			});
		} catch (err) {
			displayError('There was an error loading your note!');
		}
	}

	onBack = () => {
		this.setState({
			view: 'list',
		});
	}

	onPropertyChanged = property => value => {
		this.setState(({ note }) => ({
			note: {
				...note,
				[property]: value,
			},
			savingNote: true,
		}), () => {
			if (property === 'noteTitle') {
				this.postTitle();
			} else if (property === 'noteContent') {
				this.postNoteContent();
			}
		});
	}

	postTitle = debounce(
		async () => {
			const { note, noteID } = this.state;
			const { campaignID } = this.props;
			try {
				await post(`/api/campaigns/${campaignID}/notes/${noteID}`, {
					field: 'noteTitle',
					value: note.noteTitle,
				});
				this.setState({ savingNote: false });
			} catch (err) {
				displayError('There was an error saving the note title');
			}
		},
		250,
	)

	postNoteContent = debounce(
		async () => {
			const { note, noteID } = this.state;
			const { campaignID } = this.props;
			try {
				await post(`/api/campaigns/${campaignID}/notes/${noteID}`, {
					field: 'noteContent',
					value: note.noteContent,
				});
				this.setState({ savingNote: false });
			} catch (err) {
				displayError('There was an error saving the note content');
			}
		},
		250
	)

	openNote = noteID => {
		this.setState(
			{ noteID },
			this.loadNote
		);
	}
	
	render() {
		const { campaignID, insertPaneIntoPanel } = this.props;
		const { view, note, savingNote } = this.state;

		if (view === 'editor') {
			return (
				<NoteEditor
					note={note.noteContent}
					title={note.noteTitle}
					onBack={this.onBack}
					onPropertyChanged={this.onPropertyChanged}
					savingNote={savingNote}
					insertPaneIntoPanel={insertPaneIntoPanel}
				/>
			);
		}

		return (
			<NotesList
				campaignID={campaignID}
				openNote={this.openNote}
			/>
		);
	}
}
