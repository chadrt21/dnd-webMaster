import React from 'react';
import PropTypes from 'prop-types';

import {
	Checkbox,
	Button,
} from '@blueprintjs/core';

import Modal from '../../../modal';
import Title from '../../../title';
import List from '../../../list';

import {
	spotifyGet,
} from 'Utility/spotify';

import styles from './styles.less';

const COUNT = 10;

export default class LinkPlaylistModal extends React.Component {
	static propTypes = {
		open: PropTypes.bool.isRequired,
		onClose: PropTypes.func.isRequired,
		onLinkPlaylists: PropTypes.func.isRequired,
		defaultSelected: PropTypes.array,
	}

	state = {
		hasNext: false,
		hasPrevious: false,
		offset: 0,
		selected: [],
		playlists: [],
		changesMade: false,
	}

	async componentDidMount() {
		this.fetchPlaylists();
		this.setDefaultSelected();
	}

	getSelectedIndex = playlist => {
		const { selected } = this.state;
		return selected.findIndex(selectedPlaylist => selectedPlaylist.spotifyUri === playlist.uri);
	}

	toggleSelected = playlist => () => {
		const index = this.getSelectedIndex(playlist);

		if (index === -1) {
			this.setState(
				({ selected }) => {
					selected.push({
						spotifyUri: playlist.uri,
						type: 'playlist',
						playlistName: playlist.name,
					});
					return { selected, changesMade: true };
				}
			);
		} else {
			this.setState(
				({ selected }) => {
					selected.splice(index, 1);
					return { selected, changesMade: true };
				}
			);
		}
	}

	fetchPlaylists = async () => {
		const { offset } = this.state;
		const playlists = await spotifyGet(`/me/playlists?limit=${COUNT}&offset=${offset}`);
		this.setState({
			playlists: playlists.items,
			hasNext: Boolean(playlists.next),
			hasPrevious: Boolean(playlists.previous),
		});
	}

	nextButtonPressed = () => {
		this.setState(
			({ offset }) => ({
				offset: offset + COUNT,
			}),
			this.fetchPlaylists
		);
	}

	previousButtonPressed = () => {
		this.setState(
			({ offset }) => ({
				offset: offset - COUNT >= 0 ? offset - COUNT : 0,
			}),
			this.fetchPlaylists
		);
	}

	renderListItem = playlist => (
		<div className={styles.listItem}>
			<Checkbox
				label={playlist.name}
				checked={this.getSelectedIndex(playlist) !== -1}
				className={styles.checkbox}
				onChange={this.toggleSelected(playlist)}
			/>
		</div>
	);

	setDefaultSelected = () => {
		const { defaultSelected } = this.props;

		if (defaultSelected) {
			this.setState({ selected: defaultSelected });
		}
	}

	render() {
		const {
			open,
			onClose,
			onLinkPlaylists,
		} = this.props;
		const {
			playlists,
			hasNext,
			hasPrevious,
			changesMade,
			selected,
		} = this.state;

		return (
			<Modal
				open={open}
				onOpening={this.setDefaultSelected}
			>
				<Title fontSize={20}>
					Link Your Spotify Playlists!
				</Title>
				<List
					items={playlists}
					renderItem={this.renderListItem}
				/>
				<div className={styles.buttonContainer}>
					<Button
						minimal
						onClick={this.previousButtonPressed}
						className={styles.button}
						icon="caret-left"
						disabled={!hasPrevious}
					/>
					<Button
						minimal
						onClick={this.nextButtonPressed}
						className={styles.button}
						icon="caret-right"
						disabled={!hasNext}
					/>
					<div className={styles.spacer} />
					{changesMade ?
						<Button
							minimal
							onClick={() => onLinkPlaylists(selected)}
							className={styles.button}
						>
							Save
						</Button>
						:
						null
					}
					<Button
						minimal
						onClick={onClose}
						className={styles.button}
					>
						Close
					</Button>
				</div>
			</Modal>
		);
	}
}
