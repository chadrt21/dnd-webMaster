/**
 * @description In this component, users can see a list of available characters and navigate to one of 
 * those characters. They can also create new characters.
 * 
 * @author Joseph Stewart
 */

import React from 'react';
import PropTypes from 'prop-types';

import Title from '../../../title';
import List from '../../../list';

import styles from './styles.less';

import {
	Button,
	Icon,
	Popover,
	InputGroup,
	Keys,
	Spinner,
} from '@blueprintjs/core';

import { get, post } from 'Utility/fetch';
import classNames from 'Utility/classNames';

export default class CharacterList extends React.Component {
	static propTypes = {
		navigateToCharacter: PropTypes.func.isRequired,
		navigateToSettings: PropTypes.func.isRequired,
		campaignID: PropTypes.number.isRequired,
	}

	state = {
		newPCName: '',
		newNPCName: '',
		creatingPC: false,
		creatingNPC: false,
		characters: [],
	}

	componentDidMount() {
		this.fetchCharacters();
	}

	fetchCharacters = async () => {
		const { campaignID } = this.props;
		const characters = await get(`/api/campaigns/${campaignID}/characters`);
		this.setState({
			characters: characters.map(character => ({
				id: character.characterID,
				name: character.characterName,
				isNPC: character.isNPC,
			})),
		});
	}

	handleEnter = (name, isNPC) => event => {
		if (event.keyCode === Keys.ENTER) {
			this.handleNewCharacter(name, isNPC);
		}
	}

	handleNewCharacter = (characterName, isNPC) => {
		const { campaignID } = this.props;
		this.setState({
			[isNPC ? 'creatingNPC' : 'creatingPC']: true,
		}, async () => {
			await post(`/api/campaigns/${campaignID}/characters`, { characterName, isNPC });
			await this.fetchCharacters();
			this.setState({
				[isNPC ? 'creatingNPC' : 'creatingPC']: false,
				[isNPC ? 'newNPCName' : 'newPCName']: '',
			});
		});
	}
	
	render() {
		const {
			navigateToCharacter,
			navigateToSettings,
		} = this.props;

		const {
			newPCName,
			newNPCName,
			characters,
			creatingNPC,
			creatingPC,
		} = this.state;

		return (
			<div className={styles.root}>
				<Title
					fontSize={28}
					rightComponent={
						<Button
							minimal
							icon={
								<Icon
									icon="cog"
									className={styles.icon}
								/>
							}
							onClick={navigateToSettings}
							className={styles.button}
						/>
					}
					className={classNames(styles.title, styles.header)}
				>
					Characters
				</Title>
				<Title
					fontSize={20}
					rightComponent={
						<Popover popoverClassName={styles.popover}>
							<Button
								minimal
								icon="plus"
								className={styles.button}
							/>
							<div className={styles.popoverContent}>
								<p className={styles.popoverContentTitle}>Character&#39;s Name</p>
								<InputGroup
									autoFocus
									value={newPCName}
									onChange={event => this.setState({ newPCName: event.target.value })}
									rightElement={creatingPC ?
										<Spinner size={20}/>
										:
										<Button
											minimal
											icon="tick"
											onClick={() => this.handleNewCharacter(newPCName, false)}
										/>
									}
									onKeyDown={this.handleEnter(newPCName, false)}
								/>
							</div>
						</Popover>
					}
					className={styles.title}
				>
					PCs
				</Title>
				<List
					items={characters.filter(character => !character.isNPC)}
					className={styles.list}
					onItemSelected={navigateToCharacter}
				/>

				<Title
					fontSize={20}
					rightComponent={
						<Popover popoverClassName={styles.popover}>
							<Button
								minimal
								icon="plus"
								className={styles.button}
							/>
							<div className={styles.popoverContent}>
								<p className={styles.popoverContentTitle}>NPC&#39;s Name</p>
								<InputGroup
									autoFocus
									value={newNPCName}
									onChange={event => this.setState({ newNPCName: event.target.value })}
									rightElement={creatingNPC ?
										<Spinner size={20} />
										:
										<Button
											minimal
											icon="tick"
											onClick={() => this.handleNewCharacter(newNPCName, true)}
										/>
									}
									onKeyDown={this.handleEnter(newNPCName, true)}
								/>
							</div>
						</Popover>
					}
					className={styles.title}
				>
					NPCs
				</Title>
				<List
					items={characters.filter(character => character.isNPC)}
					className={styles.list}
					onItemSelected={navigateToCharacter}
				/>
			</div>
		);
	}
}