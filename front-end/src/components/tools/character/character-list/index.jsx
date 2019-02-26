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
} from '@blueprintjs/core';

import classNames from 'Utility/classNames';

export default class CharcterList extends React.Component {
	static propTypes = {
		navigateToCharacter: PropTypes.func.isRequired,
		navigateToSettings: PropTypes.func.isRequired,
	}
	
	render() {
		const {
			navigateToCharacter,
			navigateToSettings,
		} = this.props;

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
						<Button
							minimal
							icon={
								<Icon
									icon="plus"
									className={styles.icon}
								/>
							}
							className={styles.button}
						/>
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
						<Button
							minimal
							icon={
								<Icon
									icon="plus"
									className={styles.icon}
								/>
							}
							className={styles.button}
						/>
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