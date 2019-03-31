import React from 'react';
import ToolBase from '../ToolBase';

import SignInScreen from './sign-in-screen';
import MusicControl from './music-control';

import {
	hasSpotifyAccess,
	spotifyGet,
} from 'Utility/spotify';

export default class MusicTool extends ToolBase {
	state = {
		hasAccess: false,
		playlists: [],
	}
	
	async componentDidMount() {
		super.componentDidMount();
		const hasAccess = await hasSpotifyAccess();
		this.setState({
			hasAccess,
		});
	}

	componentDidUpdate(prevProps, prevState) {
		const {
			hasAccess,
		} = this.state;

		if (hasAccess && !prevState.hasAccess) {
			this.loadPlaylists();
		}
	}

	loadPlaylists = async () => {
		const playlists = await spotifyGet('/me/playlists').then(response => response.json());
		this.setState({
			playlists: playlists.items.map(({ name, uri }) => ({ name, uri })),
		});
	}
	
	render() {
		const { hasAccess, playlists } = this.state;

		if (!hasAccess) {
			return (
				<SignInScreen />
			);
		}

		return (
			<MusicControl
				playlists={playlists}
			/>
		);
	}
}
