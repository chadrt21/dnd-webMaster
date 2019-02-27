import React from 'react';
import PropTypes from 'prop-types';

import SVG from 'react-inlinesvg';

import {
	Icon,
	TextArea,
	Popover,
	InputGroup,
	Position,
} from '@blueprintjs/core';

import NumericInput from '../../../calculator-input';

import styles from './styles.less';

export default class Appearance extends React.Component {
	static propTypes = {
		onPropertyChanged: PropTypes.func.isRequired,
		hairDesc: PropTypes.string,
		skinDesc: PropTypes.string,
		age: PropTypes.number,
		weight: PropTypes.number,
		height: PropTypes.string,
		imageUrl: PropTypes.string,
		description: PropTypes.string,
	}
	
	render() {
		const {
			imageUrl,
			hairDesc,
			skinDesc,
			age,
			weight,
			height,
			description,
			onPropertyChanged,
		} = this.props;

		return (
			<div className={styles.root}>
				<div className={styles.row}>
					<div className={styles.imageContainer}>
						{imageUrl?
							<img className={styles.image} src={imageUrl} />
							:
							<SVG src="/svg/item.svg" className={styles.svg}/>
						}
						<div className={styles.imageOverlay}>
							<Icon
								icon="camera"
								iconSize={50}
								className={styles.icon}
							/>
						</div>
					</div>
					<ul className={styles.propertyList}>
						<li>
							<Popover
								content= {
									<NumericInput 
										onChange={onPropertyChanged('age')}
										autoFocus
										value={age}
									/>
								}
								modifiers={{ arrow: false }}
								position={Position.TOP_LEFT}
							>
								<span>
									<span className={styles.label}>Age</span>
									<span className={styles.value}>{age || <span className={styles.empty}>None</span>}</span>
								</span>
							</Popover>
						</li>
						<li>
							<Popover
								content= {
									<InputGroup 
										onChange={event => onPropertyChanged('height')(event.target.value)}
										value={height}
										autoFocus
									/>
								}
								modifiers={{ arrow: false }}
								position={Position.TOP_LEFT}
							> 
								<span>
									<span className={styles.label}>Height</span>
									<span className={styles.value}>{height || <span className={styles.empty}>None</span>}</span>
								</span>
							</Popover>
						</li>
						<li>
							<Popover
								content= {
									<NumericInput 
										onChange={onPropertyChanged('weight')}
										value={weight}
										autoFocus
									/>
								}
								modifiers={{ arrow: false }}
								position={Position.TOP_LEFT}
							>
								<span>
									<span className={styles.label}>Weight</span>
									<span className={styles.value}>{weight || <span className={styles.empty}>None</span>}</span>
									<span>lbs</span>
								</span>
							</Popover>
						</li>
						<li>
							<Popover
								content= {
									<InputGroup 
										onChange={event => onPropertyChanged('hairDesc')(event.target.value)}
										autoFocus
										value={hairDesc}
									/>
								}
								modifiers={{ arrow: false }}
								position={Position.TOP_LEFT}
							> 
								<span>
									<span className={styles.label}>Hair</span>
									<span className={styles.value}>{hairDesc || <span className={styles.empty}>None</span>}</span>
								</span>
							</Popover>
						</li>
						<li>
							<Popover
								content= {
									<InputGroup 
										onChange={event => onPropertyChanged('skinDesc')(event.target.value)}
										autoFocus
										value={skinDesc}
									/>
								}
								modifiers={{ arrow: false }}
								position={Position.TOP_LEFT}
							>
								<span>
									<span className={styles.label}>Skin</span>
									<span className={styles.value}>{skinDesc || <span className={styles.empty}>None</span>}</span>
								</span>
							</Popover>
						</li>
					</ul>
				</div>
				<TextArea
					value={description}
					onChange={event => onPropertyChanged('characterDesc')(event.target.value)}
					fill
					className={styles.description}
					placeholder="Physcial Description"
				/>
			</div>
		);
	}
}