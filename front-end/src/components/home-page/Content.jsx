/**
 * @description This component is responsible for rendering everything on the right hand of the homepage
 * @author Joseph Stewart
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	Intent,
	Icon,
	Popover,
	Menu,
	MenuItem,
	Position,
} from '@blueprintjs/core';

import Carousel from './carousel';

import styles from './styles.less';

export default class Content extends React.Component { 
	static propTypes = {
		navigateToCampaign: PropTypes.func.isRequired,
		campaigns: PropTypes.array.isRequired,
	}

	render() {
		const {
			navigateToCampaign,
			campaigns,
		} = this.props;

		return (
			<div className={styles.content}>
				<div className={styles.headerRow}>
					<Popover
						minimal
						position={Position.BOTTOM_RIGHT}
					>
						<Button
							minimal
							icon={
								<Icon
									icon="user"
									iconSize={24}
								/>
							}
							large
							intent={Intent.PRIMARY}
						/>
						<Menu>
							<MenuItem text="Logout" href="/api/auth/logout" />
							<MenuItem text="Profile" href="/profile" />
						</Menu>
					</Popover>
				</div>
				<Carousel
					title="Campaigns"
					items={campaigns}
					defaultImage="/svg/d20.svg"
					onItemSelected={navigateToCampaign}
					noItemsText="No Campaigns"
				/>
			</div>
		);
	}
}