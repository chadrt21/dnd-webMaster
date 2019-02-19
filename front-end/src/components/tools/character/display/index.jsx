import React from 'react';
import PropTypes from 'prop-types';

import HeaderRow from '../header-row';

import styles from './styles.less';

export default class CharacterDisplay extends React.Component {
	static propTypes = {
		navigateBack: PropTypes.func.isRequired,
		character: PropTypes.object.isRequired,
		onPropertyChanged: PropTypes.func.isRequired,
		mediaQuery: PropTypes.func.isRequired,
	}
	
	render() {
		const {
			navigateBack,
			character,
			onPropertyChanged,
			mediaQuery,
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
			</div>
		);
	}
}