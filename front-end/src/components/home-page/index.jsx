import React from 'react';

import Sidebar from './Sidebar';
import Content from './Content';

import styles from './styles.less';

export default class HomePage extends React.Component {
	navigateToCampaign = id => {
		window.location.href = `/app/${id}`;
	}

	navigateToCharacter = id => {
		/* eslint-disable-next-line */
		console.log(id);
	}
	
	render() {
		return (
			<div className={styles.root}>
				<Sidebar />
				<Content
					navigateToCampaign={this.navigateToCampaign}
					navigateToCharacter={this.navigateToCharacter}
				/>
			</div>
		);
	}
}