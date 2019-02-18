/**
 * @description This item renders the title and image (or default image) for an item in a carousel
 * 
 * @author Joseph Stewart
 */

import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';

import styles from './styles.less';

export default class CarouselItem extends React.Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
		defaultImage: PropTypes.string.isRequired,
		imageUrl: PropTypes.string,
		onItemSelected: PropTypes.func,
	}
	
	render() {
		const {
			title,
			imageUrl,
			defaultImage,
			onItemSelected,
		} = this.props;

		return (
			<div className={styles.item} onClick={onItemSelected}>
				<p className={styles.title}>{title}</p>
				<div className={styles.imageContainer}>
					{
						imageUrl ?
							<img
								src={imageUrl}
								className={styles.image}
							/>
							:
							<SVG
								src={defaultImage}
								className={styles.defaultImage}
							/> 
					}
				</div>
			</div>
		);
	}
}