import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Title from '../index';

// Set up the adapter that allows us to test render React components
configure({ adapter: new Adapter() });

// Set up constants that we will use in testing
const TITLE_TEXT = 'Here is the title';
const LEFT_COMPONENT_TEXT = 'I am the left hand component';
const RIGHT_COMPONENT_TEXT = 'I am the right hand component';
const CLASS_NAME = 'test-class';

describe(
	'TitleComponent',
	() => {
		// First make sure that the component will even render
		it('should render the component', () => {
			const component = mount(
				<Title>{TITLE_TEXT}</Title>
			);
			expect(component).toMatchSnapshot();
		});

		// Then make sure that it is actually rendering what we want it to and only that
		it('should render the correct text', () => {
			const component = mount(
				<Title>{TITLE_TEXT}</Title>
			);
			expect(
				component.childAt(0).getElement().props.children.filter(child => child).length
			).toBe(1);
			expect(
				component.text()
			).toBe(TITLE_TEXT);
		});

		// Then make sure that it can render a left hand component on the left hand side
		it('should render the left hand component', () => {
			const leftComponent = (
				<p id="left-component">{LEFT_COMPONENT_TEXT}</p>
			);
			const component = mount(
				<Title
					leftComponent={leftComponent}
				>
					{TITLE_TEXT}
				</Title>
			);
			expect(
				component.childAt(0).getElement().props.children.filter(child => child).length
			).toBe(2);
			expect(
				component.childAt(0).getElement().props.children.filter(child => child)[0]
			).toBe(leftComponent);
			expect(component.find('p#left-component').props().children).toBe(LEFT_COMPONENT_TEXT);
		});

		// Then we make sure that it can render a right hand component on the right hand side
		it('should render the right hand component', () => {
			const rightComponent = (
				<p id="right-component">{RIGHT_COMPONENT_TEXT}</p>
			);
			const component = mount(
				<Title
					rightComponent={rightComponent}
				>
					{TITLE_TEXT}
				</Title>
			);
			expect(
				component.childAt(0).getElement().props.children.filter(child => child).length
			).toBe(2);
			expect(
				component.childAt(0).getElement().props.children.filter(child => child)[1]
			).toBe(rightComponent);
			expect(component.find('p#right-component').props().children).toBe(RIGHT_COMPONENT_TEXT);
		});

		// Then we make sure that it can render both the right hand component and left hand component
		// in their proper places
		it('should render both right hand and left hand component', () => {
			const rightComponent = (
				<p id="right-component">{RIGHT_COMPONENT_TEXT}</p>
			);
			const leftComponent = (
				<p id="left-component">{LEFT_COMPONENT_TEXT}</p>
			);
			const component = mount(
				<Title
					rightComponent={rightComponent}
					leftComponent={leftComponent}
				>
					{TITLE_TEXT}
				</Title>
			);

			expect(
				component.childAt(0).getElement().props.children.filter(child => child).length
			).toBe(3);
			expect(
				component.childAt(0).getElement().props.children.filter(child => child)[0]
			).toBe(leftComponent);
			expect(
				component.childAt(0).getElement().props.children.filter(child => child)[2]
			).toBe(rightComponent);
			expect(component.find('p#right-component').text()).toBe(RIGHT_COMPONENT_TEXT);
			expect(component.find('p#left-component').text()).toBe(LEFT_COMPONENT_TEXT)
		});

		// Then we make sure that it can inherit the className that we pass in through <Title />
		it('inherits className from props', () => {
			const component = mount(
				<Title
					className={CLASS_NAME}
				>
					{TITLE_TEXT}
				</Title>
			);
			expect(component.childAt(0).hasClass(CLASS_NAME)).toBe(true);
		})
	}
);
