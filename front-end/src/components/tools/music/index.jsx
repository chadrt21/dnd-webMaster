import React from 'react';
import ToolBase from '../ToolBase';

import SignInScreen from './sign-in-screen';
import MusicControl from './music-control';
import { displayError } from '../../toast';

import {
	hasSpotifyAccess,
} from 'Utility/spotify';
import {
	get,
	post,
} from 'Utility/fetch';

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
		const { campaignID } = this.props;
		const playlists = await get(`/api/campaigns/${campaignID}/playlists`);
		this.setState({
			playlists,
		});
	}

	linkPlaylists = async items => {
		const { campaignID } = this.props;
		try {
			await post(
				`/api/campaigns/${campaignID}/playlists`,
				{ items }
			);
			await this.loadPlaylists();
		} catch (err) {
			displayError('Could not link playlists');
		}
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
				onLinkPlaylists={this.linkPlaylists}
			/>
		);
	}
}
