/**
 * @description This component is responsible for rendering everything on the right hand of the homepage
 * @author Joseph Stewart
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
	InputGroup,
	Button,
	Intent,
	Icon,
} from '@blueprintjs/core';

import Carousel from './carousel';

import { bindKeys, unbindKeys } from '../../utility/keyboard';

import styles from './styles.less';

import characters from '../../dummy-data/characters';

export default class Content extends React.Component { 
	static propTypes = {
		navigateToCampaign: PropTypes.func.isRequired,
		navigateToCharacter: PropTypes.func.isRequired,
		campaigns: PropTypes.array.isRequired,
	}
	
	bindings = {
		'ctrl + s': event => {
			event.stopPropagation();
			event.preventDefault();
			if (this.searchInput) {
				this.searchInput.focus();
			}
		},
	}

	componentWillMount() {
		bindKeys(this.bindings);
	}

	componentWillUnmount() {
		unbindKeys(this.bindings);
	}
	
	render() {
		const {
			navigateToCampaign,
			navigateToCharacter,
			campaigns,
		} = this.props;

		return (
			<div className={styles.content}>
				<div className={styles.headerRow}>
					<InputGroup
						large
						leftIcon="search"
						placeholder="Ctrl-S..."
						inputRef={ref => this.searchInput = ref}
					/>
					<div className={styles.spacing}></div>
					<Button
						minimal
						icon={
							<Icon
								icon="cog"
								iconSize={24}
							/>
						}
						large
						intent={Intent.PRIMARY}
					/>
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
				</div>
				<Carousel
					title="Campaigns"
					items={campaigns}
					defaultImage="/svg/d20.svg"
					onItemSelected={navigateToCampaign}
					noItemsText="No Campaigns"
				/>
				<Carousel
					title="Characters"
					items={characters}
					defaultImage="/svg/item.svg"
					onItemSelected={navigateToCharacter}
					noItemsText="No Characters"
				/>
			</div>
		);
	}
}