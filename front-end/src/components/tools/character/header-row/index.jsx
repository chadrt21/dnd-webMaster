import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'Utility/classNames';

import {
	Button,
	Icon,
	EditableText,
	Tooltip,
	Popover,
} from '@blueprintjs/core';
import SVG from 'react-inlinesvg';

import Title from '../../../title';
import NumericInput from '../../../calculator-input';

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

	mapStats = stats => stat => {
		const { onPropertyChanged } = this.props;
		return (
			<Popover
				modifiers={{ arrow: false }}
				content={
					<NumericInput
						onChange={onPropertyChanged(`stats.${stat}`)}
						value={stats[stat]}
						autoFocus
					/>
				}
			>
				<span>
					<span className={styles.statLabel}>{stat}</span>
					<span className={classNames(styles.statValue, styles.editable)}>{stats[stat]}</span>
				</span>
			</Popover>
		);
	};

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
					<Popover
						content={
							<NumericInput
								onChange={onPropertyChanged('level')}
								value={level}
								autoFocus
							/>
						}
						modifiers={{ arrow: false }}
					>
						<span className={classNames(styles.level, styles.editable)}>Level: {level}</span>
					</Popover>
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
					<Popover
						content={
							<NumericInput
								onChange={onPropertyChanged('currentHp')}
								autoFocus
								value={hp}
							/>
						}
						modifiers={{ arrow: false }}
					>
						<Tooltip
							content={`HP - Max: ${maxHp}`}
							hoverOpenDelay={750}
						>
							<div className={styles.svg}>
								<SVG
									src="/svg/heart.svg"
								/>
								<span className={classNames(styles.svgLabel, styles.editable)}>{hp}</span>
							</div>
						</Tooltip>
					</Popover>
					<Popover
						content={
							<NumericInput
								value={speed}
								onChange={onPropertyChanged('speed')}
								autoFocus
							/>
						}
						modifiers={{ arrow: false }}
					>
						<Tooltip
							content="Speed"
							hoverOpenDelay={750}
						>
							<div className={styles.svg}>
								<SVG
									src="/svg/circle.svg"
								/>
								<span className={classNames(styles.svgLabel, styles.editable)}>{speed}</span>
							</div>
						</Tooltip>
					</Popover>
					<Popover
						content={
							<NumericInput
								value={ac}
								onChange={onPropertyChanged('baseAc')}
								autoFocus
							/>
						}
						modifiers={{ arrow: false }}
					>
						<Tooltip
							content="AC"
							hoverOpenDelay={750}
						>
							<div className={styles.svg}>
								<SVG
									src="/svg/shield.svg"
								/>
								<span className={classNames(styles.svgLabel, styles.editable)}>{ac}</span>
							</div>
						</Tooltip>
					</Popover>
				</div>
			</div>
		);
	}
}