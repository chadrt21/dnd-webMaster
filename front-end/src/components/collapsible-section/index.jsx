import React from 'react';
import PropTypes from 'prop-types';

import {
	Button,
	Icon,
} from '@blueprintjs/core';

import Title from '../title';

import styles from './styles.less';

export default class CollapsibleSection extends React.Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
		expanded: PropTypes.bool.isRequired,
		changeExpanded: PropTypes.func.isRequired,
		children: PropTypes.node.isRequired,
		className: PropTypes.string,
	}

	render() {
		const {
			className,
			title,
			expanded,
			changeExpanded,
			children,
		} = this.props;

		return (
			<div className={className}>
				<Title
					fontSize={20}
					className={styles.title}
					rightComponent={
						<Button
							className={styles.button}
							minimal
							icon={
								<Icon
									icon={expanded ? 'chevron-down' : 'chevron-up'}
									className={styles.icon}
								/>
							}
							onClick={() => changeExpanded(!expanded)}
						/>
					}
					onClick={() => changeExpanded(!expanded)}
				>
					{title}
				</Title>
				{expanded ? children : null}
			</div>
		);
	}
}