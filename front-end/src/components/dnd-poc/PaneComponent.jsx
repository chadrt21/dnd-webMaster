/* This is the base class for the tool components. Use this instead of React.Component
in order to preserve state when the layout re-renders */

import React from 'react';
import PropTypes from 'prop-types';

export default class PaneComponent extends React.Component {
	static propTypes = {
		pane: PropTypes.object.isRequired,
	}
	
	state = {}

	componentDidMount() {
		const { pane } = this.props;
		if (!pane) return;
		this.setState((state) => ({
			...state,
			...pane.getState(),
		}));
	}

	componentWillUnmount() {
		const { pane } = this.props;
		if (!pane) return;
		pane.setState(this.state);
	}

	componentWillReceiveProps(nextProps) {
		const nextPane = nextProps.pane;
		const { pane } = this.props;

		if (!nextPane || !pane) return;

		if (nextPane.getId() !== pane.getId()) {
			this.setState(nextPane.getState());
		}
	}

	setState(change, callback) {
		super.setState(change, () => {
			const { pane } = this.props;
			if (callback) {
				callback();
			}
			if (!pane) return;
			pane.setState(this.state);
		});
	}
}