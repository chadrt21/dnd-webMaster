import React from 'react';
import PropTypes from 'prop-types';

import {
	Button,
	Icon,
	EditableText,
	Tooltip,
} from '@blueprintjs/core';
import SVG from 'react-inlinesvg';

import Title from '../../../title';

import styles from './styles.less';

export default class HeaderRow extends React.Component {
	static propTypes = {
		navigateBack: PropTypes.func.isRequired,
		onPropertyChanged: PropTypes.func.isRequired,
		mediaQuery: PropTypes.func.isRequired,
		name: PropTypes.string,
		className: PropTypes.string,
		race: PropTypes.string,
		level: PropTypes.number,
		stats: PropTypes.object,
		hp: PropTypes.number,
		ac: PropTypes.number,
		speed: PropTypes.number,
		maxHp: PropTypes.number,
	}

	mapStats = stats => stat => (
		<span>
			<span className={styles.statLabel}>{stat}</span>
			<span className={styles.statValue}>{stats[stat]}</span>
		</span>
	);

	render() {
		const {
			navigateBack,
			onPropertyChanged,
			mediaQuery,
			name,
			level,
			className,
			race,
			stats,
			hp,
			maxHp,
			ac,
			speed,
		} = this.props;

		return (
			<div className={styles.root}>
				<div className={styles.topRow}>
					<Button
						icon={
							<Icon
								className={styles.icon}
								icon="arrow-left"
							/>
						}
						minimal
						className={styles.button}
						onClick={navigateBack}
					/>
					<div className={styles.flexSizing}>
						<Title fontSize={mediaQuery('max-width', 330) ? 20 : 30} className={styles.title}>
							<EditableText
								placeholder="Character Name"
								value={name}
								onChange={onPropertyChanged('name')}
							/>
						</Title>
					</div>
					<div className={styles.spacer} />
					<Button
						icon={
							<Icon
								className={styles.icon}
								icon="cog"
								iconSize={20}
							/>
						}
						minimal
						className={styles.button}
					/>
				</div>
				<div className={styles.row}>
					<span className={styles.level}>Level: {level}</span>
					<span className={styles.class}>{className}</span>
					<span className={styles.race}>{race}</span>
				</div>
				<div
					className={styles.row}
					style={{
						justifyContent: mediaQuery('max-width', 900) ? 'space-around' : null,
					}}
				>
					{stats ? Object.keys(stats).map(this.mapStats(stats)) : null}
				</div>
				<div
					className={styles.row}
					style={{
						justifyContent: mediaQuery('max-width', 900) ? 'space-evenly' : null, 
					}}
				>
					<Tooltip
						content={`HP - Max: ${maxHp}`}
						hoverOpenDelay={750}
					>
						<div className={styles.svg}>
							<SVG
								src="/svg/heart.svg"
							/>
							<span className={styles.svgLabel}>{hp}</span>
						</div>
					</Tooltip>
					<Tooltip
						content="Speed"
						hoverOpenDelay={750}
					>
						<div className={styles.svg}>
							<SVG
								src="/svg/circle.svg"
							/>
							<span className={styles.svgLabel}>{speed}</span>
						</div>
					</Tooltip>
					<Tooltip
						content="AC"
						hoverOpenDelay={750}
					>
						<div className={styles.svg}>
							<SVG
								src="/svg/shield.svg"
							/>
							<span className={styles.svgLabel}>{ac}</span>
						</div>
					</Tooltip>
				</div>
			</div>
		);
	}
}