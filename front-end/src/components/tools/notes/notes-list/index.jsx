import React from 'react';
import PropTypes from 'prop-types';

import {
	Button,
	Spinner,
	Icon,
} from '@blueprintjs/core';

import Title from '../../../title';
import List from '../../../list';

import { get, post } from 'Utility/fetch';
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

	handleNewFolder = () => {
		this.setState({
			creatingFolder: true,
		}, async () => {
			try {
				const { campaignID } = this.props;
				const { folderID } = this.state;

				await post(`/api/campaigns/${campaignID}/notes/folders`, { parentID: folderID, title: 'Test Folder' });
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
			return item.name || 'Untitled';
		} else {
			return (
				<span className={styles.folderContainer}>
					<Icon
						icon="folder-close"
						className={styles.icon}
					/>
					<span>{item.name}</span>
				</span>
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

	render() {
		const {
			results,
			loading,
			creatingNote,
			creatingFolder,
			currentFolder,
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
								onClick={this.handleNewFolder}
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
			</div>
		);
	}
}
