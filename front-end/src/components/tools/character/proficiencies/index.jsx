import React from 'react';
import PropTypes from 'prop-types';

import {
	Tag,
	Button,
	Icon,
	Tooltip,
	MenuItem,
} from '@blueprintjs/core';

import {
	Select,
} from '@blueprintjs/select';

import allProficiencies from '../../../../dummy-data/proficiencies';

import styles from './styles.less';

export default class Proficiencies extends React.Component {
	static propTypes = {
		onRemove: PropTypes.func.isRequired,
		onNew: PropTypes.func.isRequired,
		proficiencies: PropTypes.array,
	}

	mapTags = prof => {
		const { onRemove } = this.props;
		return (
			<Tooltip content={prof.skill} key={prof.name}>
				<Tag
					onRemove={() => onRemove(prof)}
					className={styles.tag}
				>
					{prof.name}
				</Tag>
			</Tooltip>
		);
	}

	renderSelectOption = (item, props, index) => {
		if (index > 10) {
			return null;
		}

		return (
			<MenuItem
				text={`${item.name} (${item.skill})`}
				onClick={props.handleClick}
				className={[
					styles.menuItem,
					props.modifiers.active ? styles.active : null,
				].join(' ')}
			/>
		);
	}
	
	render() {
		const { proficiencies, onNew } = this.props;

		return (
			<div>
				{proficiencies.map(this.mapTags)}
				{proficiencies.length === 0 ?
					<span className={styles.noResults}>No Proficiencies</span>
					:
					null
				}
				<Select
					items={allProficiencies.filter(item => proficiencies.findIndex(myItem => myItem.name === item.name) === -1)}
					itemRenderer={this.renderSelectOption}
					itemPredicate={(query, item) => item.name.includes(query)}
					onItemSelect={onNew}
					popoverProps={{
						modifiers: {
							arrow: false,
						},
					}}
					resetOnClose
				>
					<Button
						className={styles.button}
						minimal
						icon={
							<Icon
								icon="plus"
								className={styles.icon}
							/>
						}
					/>
				</Select>
			</div>
		);
	}
}