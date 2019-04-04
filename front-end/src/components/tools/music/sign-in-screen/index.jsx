import React from 'react';
import {
	NonIdealState,
	AnchorButton,
	Intent,
} from '@blueprintjs/core';

import styles from './styles.less';

export default class SignInScreen extends React.Component {
	render() {
		return (
			<div className={styles.root}>
				<NonIdealState
					title="Sign into Spotify"
					icon="music"
					description="In order to use this tool, please sign in with a spotify account. This will only need to happen once."
					action={
						<AnchorButton
							intent={Intent.PRIMARY}
							href={`/api/spotify/authorize?redirectUrl=${window.location.href}`}
						>
							Sign in with Spotify
						</AnchorButton>
					}
				/>
			</div>
		);
	}
}
