import React from 'react';
import PaneComponent from './PaneComponent';

const TextEditor = props => {
	return (
		<div>
			<p>Controlled by child state (i.e. third party library)</p>
			<input type="text" />
		</div>
	)
}

export default class Content extends PaneComponent {
	state = {
		value: 0,
		text: '',
	}

	render() {
		return (
			<div>
				<p>I am pane type {this.props.pane.getType()} with an id of {this.props.pane.getId()}</p>
				<p>The number in my state {this.state.value}</p>
				<button onClick={() => this.setState(({ value }) => ({ value: value + 1 }))}>++!</button>
				<TextEditor value={this.state.text} onChange={event => this.setState({ text: event.target.value })} />
			</div>
		)
	}
}

