import Layout from './Layout';
import LayoutRow from './LayoutRow';
import LayoutPanel from './LayoutPanel';
import LayoutPane from './LayoutPane';

export const addPane = (layout, type) => {
	const jsonModel = layout.toJson({});
	let newModel = {};
	if (jsonModel.rows.length > 1) {
		newModel = { rows: [
			{ panels: [
				jsonModel,
				{ panes: [
					{ type },
				] },
			] },
		] };
	} else if (jsonModel.rows.length === 1) {
		newModel = { rows: [
			{ panels: [
				...jsonModel.rows[0].panels,
				{ panes: [
					{ type },
				] },
			] },
		] };
	} else {
		newModel = { rows: [
			{ panels: [
				{ panes: [
					{ type },
				] },
			] },
		] };
	}
	return new Layout(newModel);
};

export const insertPaneIntoPanel = (object, target) => {
	target.addPane(new LayoutPane(object));
};

export const movePane = (direction, variant, pane, targetPanel) => {
	if ((direction === 'before' || direction === 'after') && variant === 'soft') {
		return movePaneNextToSoft(direction, pane, targetPanel);
	} else if ((direction === 'above' || direction === 'below') && variant === 'soft') {
		return movePaneVerticallySoft(direction, pane, targetPanel);
	}
	return false;
};

const movePaneNextToSoft = (direction, pane, targetPanel) => {
	const paneJson = pane.toJson({});
	if (pane.remove()) {
		const parentRow = targetPanel.getParent();
		parentRow.addPanel(new LayoutPanel({
			panes: [
				paneJson,
			],
		}), direction, targetPanel);
		return true;
	}
	return false;
};

const movePaneVerticallySoft = (direction, pane, targetPanel) => {
	const paneJson = pane.toJson({ ignoreWidths: true });
	if (pane.remove()) {
		const parentRow = targetPanel.getParent();
		if (parentRow.getPanels().length === 1) {
			const parentLayout = parentRow.getParent();
			parentLayout.addRow(new LayoutRow({ panels: [
				{ panes: [ paneJson ] },
			] }), direction, parentRow);
		} else {
			const targetPanelJson = targetPanel.toJson({});
			parentRow.replace(targetPanel, new Layout({ rows: [
				{ panels: [ targetPanelJson ] },
				{ panels: [
					{ panes: [ paneJson ] },
				] },
			] }));
		}
		return true;
	}
	return false;
};