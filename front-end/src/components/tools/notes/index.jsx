import React from 'react';
import ToolBase from '../ToolBase';

import NotesList from './notes-list';

export default class NotesTool extends ToolBase {
	render() {
		const { campaignID } = this.props;

		return (
			<NotesList
				campaignID={campaignID}
			/>
		);
	}
}
