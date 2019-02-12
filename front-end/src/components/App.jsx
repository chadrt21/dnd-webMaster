import React from 'react';
import Grid from './dnd-poc';
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