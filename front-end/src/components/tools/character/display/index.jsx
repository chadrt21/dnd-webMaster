import React from 'react';
import PropTypes from 'prop-types';

import CollapsibleSection from '../../../collapsible-section';
import HeaderRow from '../header-row';
import Proficiencies from '../proficiencies';

import styles from './styles.less';

export default class CharacterDisplay extends React.Component {
	static propTypes = {
		navigateBack: PropTypes.func.isRequired,
		character: PropTypes.object.isRequired,
		onPropertyChanged: PropTypes.func.isRequired,
		mediaQuery: PropTypes.func.isRequired,

		sections: PropTypes.object.isRequired,
		handleSectionExpandedChange: PropTypes.func.isRequired,
	}

	handleProficiencyRemove = prof => {
		const {
			character,
			onPropertyChanged,
		} = this.props;

		onPropertyChanged('proficiencies')(character.proficiencies.filter(item => item !== prof));
	}

	handleProficiencyNew = prof => {
		const {
			character,
			onPropertyChanged,
		} = this.props;

		onPropertyChanged('proficiencies')([
			...character.proficiencies,
			prof,
		]);
	}
	
	render() {
		const {
			navigateBack,
			character,
			onPropertyChanged,
			mediaQuery,
			sections,
			handleSectionExpandedChange,
		} = this.props;

		return (
			<div className={styles.root}>
				<HeaderRow
					navigateBack={navigateBack}
					name={character.name}
					level={character.level}
					className={character.className}
					race={character.race}
					stats={character.stats}
					ac={character.baseAc}
					hp={character.currentHp}
					maxHp={character.maxHp}
					speed={character.speed}
					onPropertyChanged={onPropertyChanged}
					mediaQuery={mediaQuery}
				/>
				<CollapsibleSection
					title="Proficiencies"
					expanded={sections.proficiencies}
					changeExpanded={handleSectionExpandedChange('proficiencies')}
					className={styles.section}
				>
					<Proficiencies
						proficiencies={character.proficiencies}
						onRemove={this.handleProficiencyRemove}
						onNew={this.handleProficiencyNew}
					/>
				</CollapsibleSection>
				<CollapsibleSection
					title="Class Information"
					expanded={sections.classInfo}
					changeExpanded={handleSectionExpandedChange('classInfo')}
					className={styles.section}
				>
					<span>What is supposed to go here again?</span>
				</CollapsibleSection>
			</div>
		);
	}
}