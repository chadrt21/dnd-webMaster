import React from 'react';
import ToolBase from '../ToolBase';

import SearchListDisplay from './search-list-display';
import SearchResultDisplay from './search-result-display';

import styles from './styles.less';

export default class SearchTool extends ToolBase {
	state = {
		view: 'list',
	}
	
	render() {
		const { view } = this.state;

		if (view === 'list') {
			return (
				<div className={styles.root}>
					<SearchListDisplay
					
					/>
				</div>
			);
		}

		return (
			<div className={styles.root}>
				<SearchResultDisplay

				/>
			</div>
		);
	}
}
