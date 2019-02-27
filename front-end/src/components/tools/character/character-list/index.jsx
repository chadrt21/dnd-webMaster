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

import characters from '../../../../dummy-data/characters';
import {
	Button,
	Icon,
	Popover,
	InputGroup,
	Keys,
} from '@blueprintjs/core';

import classNames from 'Utility/classNames';

export default class CharcterList extends React.Component {
	static propTypes = {
		navigateToCharacter: PropTypes.func.isRequired,
		navigateToSettings: PropTypes.func.isRequired,
		handleNewCharacter: PropTypes.func.isRequired,
	}

	state = {
		newPCName: '',
		newNPCName: '',
	}

	handleEnter = (name, isNPC) => event => {
		if (event.keyCode === Keys.ENTER) {
			const { handleNewCharacter } = this.props;
			handleNewCharacter(name, isNPC);
		}
	}
	
	render() {
		const {
			navigateToCharacter,
			navigateToSettings,
			handleNewCharacter,
		} = this.props;

		const {
			newPCName,
			newNPCName,
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
									rightElement={
										<Button
											minimal
											icon="tick"
											onClick={() => handleNewCharacter(newPCName, false)}
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
					items={characters.filter(character => !character.isNpc)}
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
									rightElement={
										<Button
											minimal
											icon="tick"
											onClick={() => handleNewCharacter(newNPCName, true)}
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
					items={characters.filter(character => character.isNpc)}
					className={styles.list}
					onItemSelected={navigateToCharacter}
				/>
			</div>
		);
	}
}