import {
	promiseQuery,
} from '../../utility';

/**
 * @description Gets all of the equipments for a specific character
 */
export const getEquipmentForCharacter = (characterID, connection) => promiseQuery(
	connection,
	`
		SELECT
			equipment.equipmentID,
			equipmentName,
			equipmentDesc,
			categoryName
		FROM
			equipmentlist
				JOIN
			equipment ON equipmentlist.equipmentID = equipment.equipmentID
		WHERE
			characterID = :characterID
	`,
	{ characterID }
);

/**
 * @description Update equipments for character
 */
export const updateEquipmentForCharacter = async (characterID, connection, values) => {
	// Figure out what our old equipments are
	const equipments = await getEquipmentForCharacter(characterID, connection);
	// See what new ones we are trying to add
	const newEquipment = values.filter(
		equipment => !equipments.find(myEquipment => myEquipment.equipmentID === equipment)
	);
	// See what ones we are trying to remove
	const removeEquipment = equipments.filter(
		myEquipment => !values.find(equipment => myEquipment.equipmentID === equipment)
	).map(equipment => equipment.equipmentID);

	// If we are trying to remove some equipments, form and execute a query
	if (removeEquipment.length > 0) {
		let removeConditional = '';
		const removeObject = {};
		for (let i = 0; i < removeEquipment.length; i++) {
			removeConditional = `(${removeConditional}equipmentID = :remove${i} AND characterID = :characterID)`;
			removeObject[`remove${i}`] = removeEquipment[i];
			if (i < removeEquipment.length - 1) {
				removeConditional += 'OR ';
			}
		}
		await promiseQuery(
			connection,
			`DELETE FROM equipmentlist WHERE ${removeConditional}`,
			{ ...removeObject, characterID }
		);
	}

	// If we are trying to add some equipments, form and execute a query
	if (newEquipment.length > 0) {
		const newObject = {};
		const valuesStatement = [];
		for (let i = 0; i < newEquipment.length; i++) {
			valuesStatement.push(`(:add${i}, :characterID)`);
			newObject[`add${i}`] = newEquipment[i];
		}
		await promiseQuery(
			connection,
			`
				INSERT INTO equipmentlist
				(equipmentID, characterID)
				VALUES
				${valuesStatement.join(', ')}
			`,
			{ ...newObject, characterID }
		);
	}
};