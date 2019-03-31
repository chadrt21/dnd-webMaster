import React from 'react';
import PropTypes from 'prop-types';

import {
	Button,
	Icon,
} from '@blueprintjs/core';

import styles from './styles.less';

export default class CurrentTrackControls extends React.Component {
	static propTypes = {
		onSkip: PropTypes.func.isRequired,
		onPrevious: PropTypes.func.isRequired,
		onTogglePlay: PropTypes.func.isRequired,
		canSkip: PropTypes.bool,
		canGoBack: PropTypes.bool,
		trackImage: PropTypes.string,
		isPlaying: PropTypes.bool,
		trackTitle: PropTypes.string,
		artists: PropTypes.string,
	}

	render() {
		const {
			trackImage,
			trackTitle,
			artists,
			onSkip,
			onPrevious,
			canSkip,
			canGoBack,
			onTogglePlay,
			isPlaying,
		} = this.props;

		return (
			<div className={styles.root}>
				{trackImage ?
					<img src={trackImage} className={styles.image} />
					:
					<div className={styles.noSongContainer}>
						<Icon
							icon="music"
							className={styles.icon}
							iconSize={40}
						/>
					</div>
				}
				<div className={styles.infoAndControls}>
					<div className={styles.artistAndTitle}>
						<p className={styles.title}>{trackTitle}</p>
						<p className={styles.artist}>{artists}</p>
					</div>
					<div className={styles.buttonControls}>
						<Button
							disabled={!canGoBack}
							onClick={onPrevious}
							icon="step-backward"
							minimal
							className={styles.button}
							small
						/>
						<Button
							onClick={onTogglePlay}
							icon={isPlaying ? 'pause' : 'play'}
							minimal
							className={styles.button}
							small
						/>
						<Button
							disabled={!canSkip}
							onClick={onSkip}
							icon="step-forward"
							minimal
							className={styles.button}
							small
						/>
					</div>
				</div>
			</div>
		);
	}
}
