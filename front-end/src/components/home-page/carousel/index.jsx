import React from 'react';
import PropTypes from 'prop-types';
import {
	Button,
} from '@blueprintjs/core';

import Title from '../../title';
import CarouselItem from './CarouselItem';

import styles from './styles.less';

export default class Carousel extends React.Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
		items: PropTypes.array.isRequired,
		defaultImage: PropTypes.string.isRequired,
		onItemSelected: PropTypes.func.isRequired,
	}

	mapItem = item => {
		const { defaultImage, onItemSelected } = this.props;

		return (
			<CarouselItem
				title={item.title}
				imageUrl={item.imageUrl}
				defaultImage={defaultImage}
				onItemSelected={() => onItemSelected(item.id)}
			/>
		);
	}

	scrollLeft = () => {
		if (this.content) {
			let scrollOffset;
			if (this.content.scrollLeft % 260 !== 0) {
				scrollOffset = this.content.scrollLeft % 260;
			} else {
				scrollOffset = 260;
			}
			this.content.scroll({
				left: this.content.scrollLeft - scrollOffset,
				behavior: 'smooth',
			});
		}
	}

	scrollRight = () => {
		if (this.content) {
			this.content.scroll({
				left: this.content.scrollLeft + 260,
				behavior: 'smooth',
			});
		}
	}
	
	render() {
		const {
			title,
			items,
		} = this.props;

		return (
			<div className={styles.root}>
				<Title color="primary">{title}</Title>
				<div className={styles.carousel}>
					<Button
						icon="chevron-left"
						minimal
						className={styles.button}
						onClick={this.scrollLeft}
					/>
					<div
						className={styles.carouselContent}
						ref={ref => this.content = ref}
					>
						{items.map(this.mapItem)}
					</div>
					<Button
						icon="chevron-right"
						minimal
						className={styles.button}
						onClick={this.scrollRight}
					/>
				</div>
			</div>
		);
	}
}