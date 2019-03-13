import React from 'react';
import PropTypes from 'prop-types';

import Table from '../../../table';

export default class KlassFeatures extends React.Component {
	static propTypes = {
		features: PropTypes.array.isRequired,
		sortingDirection: PropTypes.string.isRequired,
		sortingColumn: PropTypes.string.isRequired,
		handleSortingChange: PropTypes.func.isRequired,
	}
	
	render() {
		const {
			features,
			sortingColumn,
			sortingDirection,
			handleSortingChange,
		} = this.props;

		return (
			<Table
				items={features}
				sortingColumn={sortingColumn}
				sortingDirection={sortingDirection}
				handleSortChange={handleSortingChange}
				head={{
					featName: {
						name: 'Feature',
					},
					featLevel: {
						name: 'Level',
					},
				}}
				fullWidth
			/>
		);
	}
}