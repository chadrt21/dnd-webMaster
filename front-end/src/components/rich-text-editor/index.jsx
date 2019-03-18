import React from 'react';
import PropTypes from 'prop-types';

import ReactQuill, { Quill } from 'react-quill';

import Toolbar from './Toolbar';

import Mention from './mention/Mention';
import getMentionBlot from './mention/MentionBlot';

Quill.register('modules/mention', Mention);
Quill.register(getMentionBlot(Quill));

export default class RichTextEditor extends React.Component {
	static propTypes = {
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

	render() {
		const { value: propValue } = this.props;
		const { value: stateValue } = this.state;

		return (
			<React.Fragment>
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
			</React.Fragment>
		);
	}
}
