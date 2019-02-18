/**
 * @description This component is responsible for rendering everthing on the left sidebar of the home
 * page. This means the logo and three create buttons.
 * 
 * @author Joseph Stewart
 */

import React from 'react';
import SVG from 'react-inlinesvg';
import {
	Intent,
	Button,
} from '@blueprintjs/core';

import styles from './styles.less';

export default class Sidebar extends React.Component {
	render() {
		return (
			<div className={styles.sidebar}>
				<SVG
					src="/svg/d20.svg"
					className={styles.logo}
				/>
				<Button
					rightIcon="plus"
					intent={Intent.PRIMARY}
					large
					className={styles.button}
				>
					New Campaign
				</Button>
				<Button
					rightIcon="plus"
					intent={Intent.PRIMARY}
					large
					className={styles.button}
				>
					New Character
				</Button>
				<Button
					rightIcon="plus"
					intent={Intent.PRIMARY}
					large
					className={styles.button}
				>
					New Location
				</Button>
				<div className={styles.spacing} />
			</div>
		);
	}
}