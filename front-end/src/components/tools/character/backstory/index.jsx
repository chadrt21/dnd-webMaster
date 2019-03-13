import React from 'react';
import PropTypes from 'prop-types';

import {
	TextArea,
} from '@blueprintjs/core';

import styles from './styles.less';

const Backstory = ({ value, onPropertyChanged }) => (
	<TextArea
		value={value}
		onChange={event => onPropertyChanged('backstory')(event.target.value)}
		fill
		className={styles.textarea}
	/>
);

Backstory.propTypes = {
	onPropertyChanged: PropTypes.func.isRequired,
	value: PropTypes.string,
};

export default Backstory;