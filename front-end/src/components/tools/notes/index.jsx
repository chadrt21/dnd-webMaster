import React from 'react';
import ToolBase from '../ToolBase';

import NotesList from './notes-list';
import NoteEditor from './note-editor';

import { get } from 'Utility/fetch';
import { displayError } from '../../toast';

export default class NotesTool extends ToolBase {
	state = {
		view: 'list',
		note: {
			noteContent: '',
			noteTitle: '',
		},
		noteID: 0,
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
		}));
	}

	openNote = noteID => {
		this.setState(
			{ noteID },
			this.loadNote
		);
	}
	
	render() {
		const { campaignID } = this.props;
		const { view, note } = this.state;

		if (view === 'editor') {
			return (
				<NoteEditor
					note={note.noteContent}
					title={note.noteTitle}
					onBack={this.onBack}
					onPropertyChanged={this.onPropertyChanged}
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
