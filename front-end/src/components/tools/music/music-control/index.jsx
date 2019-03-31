import React from 'react';
import PropTypes from 'prop-types';

import Title from '../../../title';
import List from '../../../list';
import CurrentTrackControls from '../current-track-controls';

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
	}

	state = {
		playerState: {},
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
		} = this.props;

		const { playerState } = this.state;

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
				>
					Playlists
				</Title>
				<List
					items={playlists}
					onItemSelected={item => playPlaylist(item.uri)}
				/>
			</div>
		);
	}
}
