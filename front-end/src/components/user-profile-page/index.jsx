import React from 'react';
import PropTypes from 'prop-types';

import {
	Button,
	EditableText,
	TextArea,
} from '@blueprintjs/core';

import Title from '../title';

import parseQueryString from 'Utility/query-string';
import { get, post } from 'Utility/fetch';
import { displayError } from '../toast';

import styles from './styles.less';

export default class UserProfilePage extends React.Component {
	static propTypes = {
		location: PropTypes.object,
	}

	state = {
		back: null,
		dmName: '',
		dmBio: '',
	}
	
	componentDidMount() {
		const { location } = this.props;
		const { back } = parseQueryString(location.search);
		
		this.setState({
			back,
		}, this.fetchProfile);
	}

	onBack = () => {
		const { back } = this.state;
		if (!back) {
			window.location.href = '/';
		} else {
			window.location.href = back;
		}
	}

	onPropertyChange = field => value => {
		this.setState({
			[field]: value,
		}, async () => {
			try {
				const results = await post(
					'/api/user/profile',
					{
						field,
						value,
					}
				);

				if (results.reload) {
					this.fetchProfile();
				}
			} catch (err) {
				displayError('There was an error updating your profile');
				this.fetchProfile();
			}
		});
	}

	fetchProfile = async () => {
		const results = await get('/api/user/profile');
		this.setState({
			dmName: results.dmName,
			dmBio: results.dmBio,
		});
	}
	
	render() {
		const {
			dmName,
			dmBio,
		} = this.state;

		return (
			<div className={styles.root}>
				<div className={styles.headerRow}>
					<Button
						minimal
						icon="arrow-left"
						className={styles.button}
						onClick={this.onBack}
					/>
					<Title fontSize={26}>
						Your Profile
					</Title>
				</div>
				<Title fontSize={22}>
					<EditableText
						value={dmName}
						onChange={this.onPropertyChange('dmName')}
						placeholder="John Doe..."
					/>
				</Title>
				<TextArea
					value={dmBio}
					onChange={event => this.onPropertyChange('dmBio')(event.target.value)}
					placeholder="Write a short bio for yourself! We want to get to know you!"
					fill
					className={styles.textArea}
					rows={5}
				/>
			</div>
		);
	}
}
