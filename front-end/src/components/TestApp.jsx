/* This is the root container for the project */

import React from 'react';
import Grid from './layout';
import Home from './home-page';
import UserProfilePage from './user-profile-page';
import { DragDropContextProvider } from 'react-dnd';
import { MemoryRouter, Switch, Route } from 'react-router';
import HTML5Backend from 'react-dnd-html5-backend';
import PropTypes from 'prop-types';

import { FocusStyleManager } from '@blueprintjs/core';

FocusStyleManager.onlyShowFocusOnTabs();

export default class App extends React.Component {
	static propTypes = {
		href: PropTypes.string,
	}

	render() {
		const { href } = this.props;

		return (
			<DragDropContextProvider backend={HTML5Backend}>
				<MemoryRouter initialEntries={[ href || '/' ]}>
					<Switch>
						<Route path="/app/:id?" component={Grid} />
						<Route path="/profile" component={UserProfilePage} />
						<Route default component={Home} />
					</Switch>
				</MemoryRouter>
			</DragDropContextProvider>
		);
	}
}
