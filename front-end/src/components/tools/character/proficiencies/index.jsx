import React from 'react';
import PropTypes from 'prop-types';

import {
	Tag,
	Button,
	Icon,
	Tooltip,
} from '@blueprintjs/core';

import ResourceSelect from '../../../resource-select';

import styles from './styles.less';

export default class Proficiencies extends React.Component {
	static propTypes = {
		onRemove: PropTypes.func.isRequired,
		onNew: PropTypes.func.isRequired,
		proficiencies: PropTypes.array.isRequired,
	}

	mapTags = (prof, index) => {
		const { onRemove } = this.props;
		return (
			<Tooltip content={prof.skill} key={`${prof.proficiencyName}-${index}`}>
				<Tag
					onRemove={() => onRemove(prof)}
					className={styles.tag}
				>
					{prof.proficiencyName}
				</Tag>
			</Tooltip>
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
				<ResourceSelect
					onResourceSelected={onNew}
					endpoint="/api/search/proficiencies"
					idKey="proficiencyID"
					nameKey="proficiencyName"
					queryOptions={{
						count: 8,
					}}
					fetchOnMount={true}
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
				</ResourceSelect>
			</div>
		);
	}
}