import React from 'react';
import PropTypes from 'prop-types';

import {
	Button,
} from '@blueprintjs/core';

import Title from '../../../title';

import styles from './styles.less';

export default class SearchResultDisplay extends React.Component {
	static propTypes = {
		result: PropTypes.object.isRequired,
		resultFormat: PropTypes.object.isRequired,
		onNavigateBack: PropTypes.func.isRequired,
	}

	mapInlineData = data => {
		const { result } = this.props;

		const displayValue =
			data.getValue ?
				data.getValue(result)
				:
				result[data.key];

		if (data.type === 'block' || (data.hideOnNullValue && !displayValue)) {
			return null;
		}
		
		return (
			<div className={styles.inlineData}>
				<span className={styles.inlineDataKey}>
					{data.display}
				</span>
				<span className={styles.inlineDataValue}>
					{displayValue || 'NA'}
				</span>
			</div>
		);
	}

	mapBlockData = data => {
		const { result } = this.props;

		const displayValue =
			data.getValue ?
				data.getValue(result)
				:
				result[data.key];

		if (data.type !== 'block' || (data.hideOnNullValue && !displayValue)) {
			return null;
		}

		return (
			<div className={styles.blockDataContainer}>
				<Title fontSize={20}>{data.display}</Title>
				<p>{displayValue || 'NA'}</p>
			</div>
		);
	}
	
	render() {
		const {
			onNavigateBack,
			result,
			resultFormat,
		} = this.props;

		return (
			<div className={styles.root}>
				<div className={styles.header}>
					<Button
						icon="arrow-left"
						minimal
						className={styles.button}
						onClick={onNavigateBack}
					/>
					<Title
						fontSize={28}
					>
						{result[resultFormat.displayName]}
					</Title>
				</div>
				<div className={styles.inlineDataContainer}>
					{resultFormat.data.map(this.mapInlineData)}
				</div>
				{result[resultFormat.description] ?
					<div className={styles.blockDataContainer}>
						<Title fontSize={20}>Description</Title>
						<p>{result[resultFormat.description]}</p>
					</div>
					:
					null
				}
				{resultFormat.data.map(this.mapBlockData)}
			</div>
		);
	}
}
