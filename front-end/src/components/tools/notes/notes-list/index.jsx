import React from 'react';
import PropTypes from 'prop-types';

import {
	Button,
	Spinner,
	Icon,
} from '@blueprintjs/core';

import Title from '../../../title';
import List from '../../../list';
import FolderNameModal from '../folder-name-modal';

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

	renderListItem = item => {
		if (item.type === 'note') {
			return (
				<div className={styles.listItemContainer}>
					<span>{item.name || 'Untitled'}</span>
					<div className={styles.spacer} />
					<div className={styles.actionButtons}>
						<Button
							icon="trash"
							className={styles.button}
							onClick={event => {
								event.stopPropagation();
								this.deleteNote(item.noteID);
							}}
							minimal
							small
						/>
					</div>
				</div>
			);	
		} else {
			return (
				<div className={styles.listItemContainer}>
					<span className={styles.folderContainer}>
						<Icon
							icon="folder-close"
							className={styles.icon}
						/>
						<span>{item.name}</span>
					</span>
					<div className={styles.spacer} />
					<div className={styles.actionButtons}>
						<Button
							icon="trash"
							small
							className={styles.button}
							onClick={event => {
								event.stopPropagation();
								this.deleteFolder(item.noteFolderID);
							}}
							minimal
						/>
					</div>
				</div>
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

	render() {
		const {
			results,
			loading,
			creatingNote,
			creatingFolder,
			currentFolder,
			nameFolderModalOpen,
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
							<Button
								minimal
								icon="arrow-left"
								className={classNames(styles.button, styles.left)}
								onClick={this.handleBack}
							/>
							:
							undefined
					}
				>
					Notes{currentFolder.noteFolderID ? `/${currentFolder.filepath}` : ''}
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
			</div>
		);
	}
}
