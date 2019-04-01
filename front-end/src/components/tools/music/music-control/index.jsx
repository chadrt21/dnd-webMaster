import React from 'react';
import PropTypes from 'prop-types';

import {
	Button,
} from '@blueprintjs/core';

import Title from '../../../title';
import CurrentTrackControls from '../current-track-controls';
import LinkedPlaylistList from '../linked-playlist-list';
import LinkPlaylistModal from '../link-playlist-modal';

import {
	playPlaylist,
	registerStateHook,
	unregisterStateHook,
	getCurrentPlayerState,
	togglePlay,
	skip,
	previous,
} from 'Utility/spotify';

import styles from './styles.less';

export default class MusicControl extends React.Component {
	static propTypes = {
		playlists: PropTypes.array.isRequired,
		loadPlaylists: PropTypes.func.isRequired,
		onLinkPlaylists: PropTypes.func.isRequired,
	}

	state = {
		playerState: {},
		linkPlaylistModalOpen: false,
	}

	async componentDidMount() {
		registerStateHook(this.playerStateUpdated);
		const playerState = await getCurrentPlayerState();
		this.setState({ playerState: playerState || {} });
	}

	componentWillUnmount() {
		unregisterStateHook(this.playerStateUpdated);
	}

	playerStateUpdated = playerState => {
		if (playerState) {
			this.setState({
				playerState,
			});
		} else {
			this.setState({
				playerState: {},
			});
		}
	}

	render() {
		const {
			playlists,
			onLinkPlaylists,
		} = this.props;

		const { playerState, linkPlaylistModalOpen } = this.state;

		return (
			<div className={styles.root}>
				<CurrentTrackControls
					isPlaying={playerState.paused === false}
					trackImage={
						playerState.track_window &&
						playerState.track_window.current_track.album.images[1].url
					}
					trackTitle={
						playerState.track_window &&
						playerState.track_window.current_track.name
					}
					canSkip={
						playerState.disallows &&
						!playerState.disallows.skipping_next
					}
					canGoBack={
						playerState.disallows &&
						!playerState.disallows.skipping_prev
					}
					artists={
						playerState.track_window &&
						playerState.track_window.current_track.artists.map(artist => artist.name).join(', ')
					}
					onTogglePlay={togglePlay}
					onSkip={skip}
					onPrevious={previous}
				/>

				<Title
					fontSize={18}
					className={styles.title}
					rightComponent={
						<Button
							className={styles.button}
							minimal
							icon="cog"
							onClick={() => this.setState({ linkPlaylistModalOpen: true })}
						/>
					}
				>
					Playlists
				</Title>
				<LinkedPlaylistList
					playlists={playlists}
					onItemSelected={item => playPlaylist(item.spotifyUri)}
					isPlaying={playerState.paused === false}
					onTogglePlay={togglePlay}
					onHotKeyChanged={(spotifyUri, hotkey) => console.log(spotifyUri, hotkey)}
					currentlyPlayingContextUri={
						playerState.context &&
						playerState.context.uri
					}
					onOpenLinkPlaylistModal={() => this.setState({ linkPlaylistModalOpen: true })}
				/>
				<LinkPlaylistModal
					open={linkPlaylistModalOpen}
					onClose={() => this.setState({ linkPlaylistModalOpen: false })}
					onLinkPlaylists={async playlists => {
						await onLinkPlaylists(playlists);
						this.setState({ linkPlaylistModalOpen: false });
					}}
					defaultSelected={playlists}
				/>
			</div>
		);
	}
}
