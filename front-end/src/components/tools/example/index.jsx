/* Demo Component to show how Pane Content state is managed */

import React from 'react';
import ToolBase from '../ToolBase';
import { EditableText, H3 } from '@blueprintjs/core';

const TextEditor = () => (
	<div>
		<p>Controlled by child state (i.e. third party library)</p>
		<input type="text" />
	</div>
);

export default class Content extends ToolBase {
	state = {
		value: 0,
		text: '',
	}

	render() {
		const { width, height } = this.props;

		return (
			<div>
				<H3>
					<EditableText
						placeholder="Edit me"
					/>
				</H3>
				<p>I am pane type {this.props.pane.getType()} with an id of {this.props.pane.getId()}</p>
				<p>The number in my state {this.state.value}</p>
				<button onClick={() => this.setState(({ value }) => ({ value: value + 1 }))}>++!</button>
				<TextEditor value={this.state.text} onChange={event => this.setState({ text: event.target.value })} />
				<p>Width: {width}</p>
				<p>Height: {height}</p>
			</div>
		);
	}
}

