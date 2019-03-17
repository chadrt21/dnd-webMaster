/* This is the root container for the project */

import React from 'react';
import Grid from './layout';
import Home from './home-page';
import UserProfilePage from './user-profile-page';
import { DragDropContextProvider } from 'react-dnd';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import HTML5Backend from 'react-dnd-html5-backend';

import { FocusStyleManager } from '@blueprintjs/core';

FocusStyleManager.onlyShowFocusOnTabs();

export default class App extends React.Component {
	render() {
		return (
			<DragDropContextProvider backend={HTML5Backend}>
				<BrowserRouter>
					<Switch>
						<Route path="/app/:id?" component={Grid} />
						<Route path="/profile" component={UserProfilePage} />
						<Route default component={Home} />
					</Switch>
				</BrowserRouter>
			</DragDropContextProvider>
		);
	}
}