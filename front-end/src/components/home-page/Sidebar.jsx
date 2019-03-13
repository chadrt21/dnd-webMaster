/**
 * @description This component is responsible for rendering everthing on the left sidebar of the home
 * page. This means the logo and three create buttons.
 * 
 * @author Joseph Stewart
 */

import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';
import {
	Intent,
	Button,
	Popover,
	InputGroup,
	Keys,
	Spinner,
} from '@blueprintjs/core';

import styles from './styles.less';

export default class Sidebar extends React.Component {
	static propTypes = {
		createNewCampaign: PropTypes.func.isRequired,
		loadingCampaignCreation: PropTypes.bool.isRequired,
	}

	state = {
		newCampaignTitle: '',
	}

	handleCampaignKeyDown = event => {
		if (event.keyCode === Keys.ENTER) {
			this.emitCreateNewCampaign();
		}
	}

	emitCreateNewCampaign = () => {
		const { createNewCampaign } = this.props;
		const { newCampaignTitle } = this.state;

		createNewCampaign(newCampaignTitle);
	}

	render() {
		const { newCampaignTitle } = this.state;
		const {
			loadingCampaignCreation,
		} = this.props;

		return (
			<div className={styles.sidebar}>
				<SVG
					src="/svg/d20.svg"
					className={styles.logo}
				/>
				<Popover popoverClassName={styles.popover} className={styles.buttonContainer}>
					<Button
						rightIcon="plus"
						intent={Intent.PRIMARY}
						large
						className={styles.button}
						fill
					>
						New Campaign
					</Button>
					<div className={styles.popoverContent}>
						<p className={styles.popoverContentTitle}>Campaign Name</p>
						<InputGroup
							autoFocus
							value={newCampaignTitle}
							onChange={event => this.setState({ newCampaignTitle: event.target.value })}
							onKeyDown={this.handleCampaignKeyDown}
							rightElement={
								loadingCampaignCreation ?
									<Spinner size={20} />
									:
									<Button
										icon="tick"
										className={styles.button}
										minimal
										onClick={this.emitCreateNewCampaign}
									/>
							}
						/>
					</div>
				</Popover>
				<Popover popoverClassName={styles.popover} className={styles.buttonContainer}>
					<Button
						rightIcon="plus"
						intent={Intent.PRIMARY}
						large
						className={styles.button}
						fill
					>
						New Character
					</Button>
					<div className={styles.popoverContent}>
						<p className={styles.popoverContentTitle}>Character Name</p>
						<InputGroup
							autoFocus
						/>
					</div>
				</Popover>
				<Popover popoverClassName={styles.popover} className={styles.buttonContainer}>
					<Button
						rightIcon="plus"
						intent={Intent.PRIMARY}
						large
						className={styles.button}
						fill
					>
						New Location
					</Button>
					<div className={styles.popoverContent}>
						<p className={styles.popoverContentTitle}>Location Name</p>
						<InputGroup
							autoFocus
						/>
					</div>
				</Popover>
				<div className={styles.spacing} />
			</div>
		);
	}
}