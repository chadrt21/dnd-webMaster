import React from 'react';
import PropTypes from 'prop-types';

import ReactQuill, { Quill } from 'react-quill';

import Toolbar from './Toolbar';

import Mention from './mention/Mention';
import getMentionBlot from './mention/MentionBlot';

import styles from './mention/mention.less';

const MentionBlot = getMentionBlot(Quill);

Quill.register('modules/mention', Mention);
Quill.register(MentionBlot);

export default class RichTextEditor extends React.Component {
	static propTypes = {
		insertPaneIntoPanel: PropTypes.func.isRequired,
		value: PropTypes.string,
		onChange: PropTypes.func,
	}

	state = {
		value: '',
	}

	handleChange = value => {
		const { onChange, value: propValue } = this.props;

		if (onChange) {
			onChange(value);
		}

		if (propValue === undefined) {
			this.setState({ value });
		}
	}

	handleClick = event => {
		if (event.target.parentElement.classList.contains(styles.mentionBlot)) {
			const { insertPaneIntoPanel } = this.props;
			const value = MentionBlot.value(event.target.parentElement);
			insertPaneIntoPanel('example', { clickValue: value });
		}
	}

	render() {
		const { value: propValue } = this.props;
		const { value: stateValue } = this.state;

		return (
			<div onClick={this.handleClick}>
				<Toolbar />
				<ReactQuill
					value={propValue === undefined ? stateValue : propValue}
					onChange={this.handleChange}
					theme="bubble"
					modules={{
						toolbar: {
							container: '#toolbar',
						},
						mention: {
							container: '.ql-container',
							endpoint: '/api/search/spells',
							idKey: 'spellID',
							nameKey: 'spellName',
						},
					}}
					placeholder="Your note..."
				/>
			</div>
		);
	}
}
