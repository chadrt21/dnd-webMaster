import React from 'react';
import ToolBase from '../ToolBase';

import SignInScreen from './sign-in-screen';

import {
	hasSpotifyAccess,
} from 'Utility/spotify';
import { AnchorButton } from '@blueprintjs/core';

export default class MusicTool extends ToolBase {
	state = {
		hasAccess: false,
	}
	
	async componentDidMount() {
		super.componentDidMount();
		const hasAccess = await hasSpotifyAccess();
		this.setState({
			hasAccess,
		});
	}
	
	render() {
		const { hasAccess } = this.state;

		if (!hasAccess) {
			return (
				<SignInScreen />
			);
		}

		return (
			<div>
				<p>You are authenticated with spotify!</p>
				<AnchorButton href="/api/spotify/clear-tokens">
					Sign out
				</AnchorButton>
			</div>
		);
	}
}
