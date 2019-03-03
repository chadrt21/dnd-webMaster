/**
 * @description This is the first page that the user sees when they log-in. Here they can see
 * all of the campaigns, characters, and locations that they have created and make new ones
 * or navigate to them.
 * 
 * @author Joseph Stewart
 */

import React from 'react';

import Sidebar from './Sidebar';
import Content from './Content';

import { post, get } from '../../utility/fetch';

import styles from './styles.less';

export default class HomePage extends React.Component {
	state = {
		loadingCreateCampaign: false,
		campaigns: [],
	}

	async componentDidMount() {
		this.loadCampaigns();
	}
	
	navigateToCampaign = id => {
		window.location.href = `/app/${id}`;
	}

	navigateToCharacter = id => {
		/* eslint-disable-next-line */
		console.log(id);
	}

	/*
		When a user creates a new campaign, we want to show the loading indicator
		for new campaigns, make the post request, if it is successful, hide the
		loading indicator and reload the campaigns
	*/
	createNewCampaign = campaignTitle => {
		this.setState({
			loadingCampaignCreation: true,
		}, async () => {
			try {
				const campaign = await post(
					'/api/campaigns',
					{
						campaignTitle,
					}
				);
	
				this.setState({
					loadingCampaignCreation: false,
				}, () => this.navigateToCampaign(campaign.campaignID));
			} catch (err) {
				// TODO: Handle error state
			}
		});
	}

	loadCampaigns = async () => {
		try {
			const campaigns = await get('/api/campaigns');
			this.setState({
				campaigns: campaigns.map(item => ({
					title: item.campaignTitle,
					id: item.campaignID,
				})),
			});
		} catch (err) {
			// TODO: Handle error state
		}
	}
	
	render() {
		const {
			loadingCampaignCreation,
			campaigns,
		} = this.state;
		return (
			<div className={styles.root}>
				<Sidebar
					createNewCampaign={this.createNewCampaign}
					loadingCampaignCreation={loadingCampaignCreation}
				/>
				<Content
					navigateToCampaign={this.navigateToCampaign}
					navigateToCharacter={this.navigateToCharacter}
					campaigns={campaigns}
				/>
			</div>
		);
	}
}