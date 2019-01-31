import React from 'react';
import Grid from './dnd-poc';
import StatePersistenceDemo from './state-persistence';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

export default class App extends React.Component {
	render() {
		return (
			<DragDropContextProvider backend={HTML5Backend}>
				<Grid />
			</DragDropContextProvider>
		)
	}
}