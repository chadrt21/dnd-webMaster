import React from 'react';
import PropTypes from 'prop-types';

import {
	Button,
	Spinner,
} from '@blueprintjs/core';

import Title from '../../../title';
import List from '../../../list';
import FolderNameModal from '../folder-name-modal';
import FolderListItem from '../folder-list-item';
import NoteListItem from '../note-list-item';
import FolderBackButton from '../folder-back-button';

import { get, post, httpDelete } from 'Utility/fetch';
import classNames from 'Utility/classNames';
import { displayError } from '../../../toast';

import styles from './styles.less';

export default class NotesList extends React.Component {
	static propTypes = {
		campaignID: PropTypes.number.isRequired,
		openNote: PropTypes.func.isRequired,
	}

	state = {
		results: [],
		currentFolder: {},
		loading: true,
		creatingNote: false,
		folderID: null,
		creatingFolder: false,
		nameFolderModalOpen: false,
		renameFolderModalOpen: false,
		renameFolderID: 0,
	}

	componentDidMount() {
		this.loadNotes();
	}

	loadNotes = async () => {
		try {
			const { campaignID } = this.props;
			const { folderID } = this.state;

			const apiResponse = await get(`/api/campaigns/${campaignID}/notes${folderID ? `?folderID=${folderID}` : ''}`);

			const results = [
				...apiResponse.folders.map(folder => ({ ...folder, name: folder.folderName, type: 'folder' })),
				...apiResponse.notes.map(note => ({ ...note, name: note.noteTitle, type: 'note' })),
			];

			this.setState({
				results,
				currentFolder: apiResponse.currentFolder,
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
				const { folderID } = this.state;

				await post(`/api/campaigns/${campaignID}/notes`, { folderID });
				this.setState({
					creatingNote: false,
				}, this.loadNotes);
			} catch (err) {
				displayError('There was an error creating the note');
			}
		});
	}

	handleBack = () => {
		const { currentFolder } = this.state;

		this.setState({
			folderID: currentFolder.parentID,
		}, this.loadNotes);
	}

	handleNewFolder = title => {
		this.setState({
			creatingFolder: true,
			nameFolderModalOpen: false,
		}, async () => {
			try {
				const { campaignID } = this.props;
				const { folderID } = this.state;

				await post(`/api/campaigns/${campaignID}/notes/folders`, { parentID: folderID, title });
				this.setState({
					creatingFolder: false,
				}, this.loadNotes);
			} catch (err) {
				displayError('There was an error creating the folder');
			}
		});
	}

	moveIntoFolder = async (dest, body) => {
		try {
			const { campaignID } = this.props;
			await post(`/api/campaigns/${campaignID}/notes/folders/move-into/${dest}`, body);
			this.loadNotes();
		} catch (err) {
			displayError('Could not move item');
		}
	}

	moveUpOneDirectory = async body => {
		const { currentFolder } = this.state;

		try {
			const { campaignID } = this.props;
			await post(`/api/campaigns/${campaignID}/notes/folders/move-into/${currentFolder.parentID || '0'}`, body);
			this.loadNotes();
		} catch (err) {
			displayError('Could not move item');
		}
	}

	renderListItem = item => {
		if (item.type === 'note') {
			return (
				<NoteListItem
					noteID={item.noteID}
					onDelete={event => {
						event.stopPropagation();
						this.deleteNote(item.noteID);
					}}
					noteName={item.name}
				/>
			);	
		} else {
			return (
				<FolderListItem
					folderName={item.name}
					moveIntoFolder={this.moveIntoFolder}
					onDelete={event => {
						event.stopPropagation();
						this.deleteFolder(item.noteFolderID);
					}}
					onEdit={event => {
						event.stopPropagation();
						this.setState({
							renameFolderModalOpen: true,
							renameFolderID: item.noteFolderID,
						});
					}}
					folderID={item.noteFolderID}
				/>
			);
		}
	}

	handleItemClick = item => {
		const { openNote } = this.props;

		if (item.type === 'note') {
			openNote(item.noteID);
		} else {
			this.setState({
				folderID: item.noteFolderID,
			}, this.loadNotes);
		}
	}

	deleteNote = async noteID => {
		try {
			const { campaignID } = this.props;
			await httpDelete(`/api/campaigns/${campaignID}/notes/${noteID}`);
			this.loadNotes();
		} catch (err) {
			displayError('Could not delete note');
		}
	}

	deleteFolder = async folderID => {
		try {
			const { campaignID } = this.props;
			await httpDelete(`/api/campaigns/${campaignID}/notes/folders/${folderID}`);
			this.loadNotes();
		} catch (err) {
			displayError('Could not delete folder');
		}
	}

	renameFolder = async title => {
		try {
			const { campaignID } = this.props;
			const { renameFolderID } = this.state;
			await post(`/api/campaigns/${campaignID}/notes/folders/rename/${renameFolderID}`, { title });
			this.setState({
				renameFolderID: 0,
				renameFolderModalOpen: false,
			}, this.loadNotes);
		} catch (err) {
			displayError('Could not rename folder');
		}
	}

	render() {
		const {
			results,
			loading,
			creatingNote,
			creatingFolder,
			currentFolder,
			nameFolderModalOpen,
			renameFolderModalOpen,
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
						<div className={styles.buttonContainer}>
							<Button
								minimal
								icon="plus"
								className={styles.button}
								loading={creatingNote}
								onClick={this.handleNewNote}
							/>
							<Button
								minimal
								icon="folder-new"
								className={styles.button}
								loading={creatingFolder}
								onClick={() => this.setState({ nameFolderModalOpen: true })}
							/>
						</div>
					}
					leftComponent={
						currentFolder.noteFolderID ?
							<FolderBackButton
								className={classNames(styles.button, styles.left)}
								onBack={this.handleBack}
								moveIntoFolder={this.moveUpOneDirectory}
							/>
							:
							undefined
					}
				>
					{currentFolder.noteFolderID ? currentFolder.folderName : 'Notes'}
				</Title>
				<List
					items={results}
					renderItem={this.renderListItem}
					onItemSelected={this.handleItemClick}
				/>
				<FolderNameModal
					open={nameFolderModalOpen}
					onSubmit={this.handleNewFolder}
					onCancel={() => this.setState({ nameFolderModalOpen: false })}
				/>
				<FolderNameModal
					open={renameFolderModalOpen}
					onSubmit={this.renameFolder}
					onCancel={() => this.setState({ renameFolderModalOpen: false })}
				/>
			</div>
		);
	}
}
