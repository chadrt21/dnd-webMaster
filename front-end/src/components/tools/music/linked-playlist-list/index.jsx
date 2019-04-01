import React from 'react';
import PropTypes from 'prop-types';

import {
	Button,
	Menu,
	MenuItem,
	Popover,
	Intent,
} from '@blueprintjs/core';

import List from '../../../list';

import possibleHotkeys from '../../../../utility/possibleMusicHotkeys';

import styles from './styles.less';

export default class LinkedPlaylistList extends React.Component {
	static propTypes = {
		playlists: PropTypes.array.isRequired,
		onHotKeyChanged: PropTypes.func.isRequired,
		onTogglePlay: PropTypes.func.isRequired,
		onItemSelected: PropTypes.func.isRequired,
		onOpenLinkPlaylistModal: PropTypes.func.isRequired,
		isPlaying: PropTypes.bool,
		currentlyPlayingContextUri: PropTypes.string,
	}

	renderMenuItem = spotifyUri => possibleHotkey => {
		const { onHotKeyChanged } = this.props;

		return (
			<MenuItem
				text={possibleHotkey}
				onClick={() => onHotKeyChanged(spotifyUri, possibleHotkey)}
			/>
		);
	}

	renderListItem = playlist => {
		const {
			currentlyPlayingContextUri,
			isPlaying,
			onTogglePlay,
		} = this.props;

		return (
			<div className={styles.listItem}>
				{
					currentlyPlayingContextUri &&
					currentlyPlayingContextUri.includes(playlist.spotifyUri) ?
						<Button
							icon={isPlaying ? 'pause' : 'play'}
							onClick={event => {
								event.stopPropagation();
								onTogglePlay();
							}}
							minimal
							className={styles.button}
						/>
						:
						null
				}
				<span>{playlist.playlistName}</span>
				<div className={styles.spacer} />
				<div onClick={event => event.stopPropagation()}>
					<Popover
						modifiers={{ arrow: false }}
					>
						<Button
							minimal
							className={styles.button}
							rightIcon="caret-down"
							small
						>
							{playlist.hotkey || <em>No Hotkey</em>}
						</Button>
						<Menu>
							{possibleHotkeys.map(this.renderMenuItem(playlist.spotifyUri))}
						</Menu>
					</Popover>
				</div>
			</div>
		);
	}

	render() {
		const {
			playlists,
			onItemSelected,
			onOpenLinkPlaylistModal,
		} = this.props;

		if (playlists.length === 0) {
			return (
				<div className={styles.noResults}>
					<p className={styles.description}>No linked playlists!</p>
					<Button
						intent={Intent.PRIMARY}
						onClick={onOpenLinkPlaylistModal}
					>
						Link a playlist
					</Button>
				</div>
			);
		}

		return (
			<List
				items={playlists}
				onItemSelected={onItemSelected}
				renderItem={this.renderListItem}
			/>
		);
	}
}
