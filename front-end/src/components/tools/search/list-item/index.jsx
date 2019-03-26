import React from 'react';
import PropTypes from 'prop-types';

import Title from '../../../title';

import classNames from 'Utility/classNames';

import styles from './styles.less';

export default class SearchListItem extends React.Component {
	static propTypes = {
		result: PropTypes.object.isRequired,
		resultFormat: PropTypes.object.isRequired,
		index: PropTypes.number.isRequired,
		onNavigateToResult: PropTypes.func.isRequired,
	}

	mapSubtitle = subTitle => {
		const { result } = this.props;

		if (!subTitle.includeInPreview) {
			return null;
		}

		return (
			<span className={styles.subtitle}>
				<span className={styles.subtitleKey}>{subTitle.display}</span>
				<span className={styles.subtitleValue}>{
					subTitle.getValue ?
						subTitle.getValue(result)
						:
						result[subTitle.key]
				}</span>
			</span>
		);
	}

	render() {
		const { result, resultFormat, index, onNavigateToResult } = this.props;

		return (
			<div
				className={classNames(
					styles.item,
					index % 2 === 1 ? styles.dark : null
				)}
				onClick={onNavigateToResult}
			>
				<Title fontSize={22} className={styles.title}>{result[resultFormat.displayName]}</Title>
				<div className={styles.subtitleContainer}>
					{resultFormat.data.map(this.mapSubtitle)}
				</div>
				<p className={styles.description}>{result[resultFormat.description]}</p>
			</div>
		);
	}
}
