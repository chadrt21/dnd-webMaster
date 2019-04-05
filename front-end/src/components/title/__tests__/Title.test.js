import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Title from '../index';

configure({ adapter: new Adapter() });

const TITLE_TEXT = 'Here is the title';
const LEFT_COMPONENT_TEXT = 'I am the left hand component';
const RIGHT_COMPONENT_TEXT = 'I am the right hand component';
const CLASS_NAME = 'test-class';

describe(
	'TitleComponent',
	() => {
		it('should render the component', () => {
			const component = mount(
				<Title>{TITLE_TEXT}</Title>
			);
			expect(component).toMatchSnapshot();
		});

		it('should render the correct text', () => {
			const component = mount(
				<Title>{TITLE_TEXT}</Title>
			);
			expect(component.props().children).toBe(TITLE_TEXT);
		});

		it('should render the left hand component', () => {
			const component = mount(
				<Title
					leftComponent={
						<p>{LEFT_COMPONENT_TEXT}</p>
					}
				>
					{TITLE_TEXT}
				</Title>
			);
			expect(component.find('p').props().children).toBe(LEFT_COMPONENT_TEXT);
		});

		it('should render the right hand component', () => {
			const component = mount(
				<Title
					rightComponent={
						<p>{RIGHT_COMPONENT_TEXT}</p>
					}
				>
					{TITLE_TEXT}
				</Title>
			);
			expect(component.find('p').props().children).toBe(RIGHT_COMPONENT_TEXT);
		});

		it('should render both right hand and left hand component', () => {
			const component = mount(
				<Title
					rightComponent={
						<p className="prop-component">{RIGHT_COMPONENT_TEXT}</p>
					}
					leftComponent={
						<p className="prop-component">{LEFT_COMPONENT_TEXT}</p>
					}
				>
					{TITLE_TEXT}
				</Title>
			);
			let hasRight = false;
			let hasLeft = false;
			const pElements = component.find('p.prop-component');
			pElements.forEach(propComponent => {
				const propComponentText = propComponent.props().children;
				if (propComponentText === RIGHT_COMPONENT_TEXT) {
					hasRight = true;
				} else if (propComponentText === LEFT_COMPONENT_TEXT) {
					hasLeft = true;
				}
			})
			expect(hasRight && hasLeft && pElements.length === 2).toBe(true);
		});

		it('inherits className from props', () => {
			const component = mount(
				<Title
					className={CLASS_NAME}
				>
					{TITLE_TEXT}
				</Title>
			);
			expect(component.find('h1').hasClass(CLASS_NAME)).toBe(true);
		})
	}
);
