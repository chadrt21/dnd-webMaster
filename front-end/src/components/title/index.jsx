import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.less';

const Title = ({ children, color }) => (
	<h1
		className={`${styles.title} ${styles[color] || ''}`}
	>
		{children}
	</h1>
);

Title.propTypes = {
	children: PropTypes.node,
	color: PropTypes.oneOf([
		'primary',
	]),
};

export default Title;