/**
 * @description This component renders title text using our style
 * @author Joseph Stewart
 */

import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.less';

const Title = ({ children, color, fontSize, rightComponent, className, ...props }) => (
	<h1
		className={[ styles.title, styles[color], className ].join(' ')}
		style={{
			fontSize,
		}}
		{...props}
	>
		{children}
		{rightComponent || null}
	</h1>
);

Title.propTypes = {
	children: PropTypes.node,
	color: PropTypes.oneOf([
		'primary',
		'secondary',
	]),
	fontSize: PropTypes.number,
	rightComponent: PropTypes.node,
	className: PropTypes.string,
};

export default Title;