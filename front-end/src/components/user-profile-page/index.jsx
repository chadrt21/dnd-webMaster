import React from 'react';
import PropTypes from 'prop-types';

import {
	Button,
} from '@blueprintjs/core';

import parseQueryString from 'Utility/query-string';

import styles from './styles.less';

export default class UserProfilePage extends React.Component {
	static propTypes = {
		location: PropTypes.object,
	}

	state = {
		back: null,
	}
	
	componentDidMount() {
		const { location } = this.props;
		const { back } = parseQueryString(location.search);
		
		this.setState({
			back,
		});
	}

	onBack = () => {
		const { back } = this.state;
		if (!back) {
			window.location.href = '/';
		} else {
			window.location.href = back;
		}
	}
	
	render() {
		return (
			<div>
				<Button
					minimal
					icon="arrow-left"
					className={styles.button}
					onClick={this.onBack}
				/>
			</div>
		);
	}
}
