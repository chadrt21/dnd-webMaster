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
		// First make sure that the component will even render (If this test fails
		// it probably means that the component was updated. Make sure all other tests
		// pass, delete the snapshot and run it again.)
		it('should render the component', () => {
			// 1) Mount the component
			const component = mount(
				<Title>{TITLE_TEXT}</Title>
			);

			// 2) Expect that the component matches the snapshot we have of it
			expect(component).toMatchSnapshot();
		});

		// Then make sure that it is actually rendering what we want it to and only that
		it('should render the correct text', () => {
			// 1) Mount the component
			const component = mount(
				<Title>{TITLE_TEXT}</Title>
			);

			// 2) Expect the component to have exactly one non-null child
			expect(
				component.childAt(0).getElement().props.children.filter(child => child).length
			).toBe(1);

			// 3) Expect that the component text matches the one we pass down through children
			expect(
				component.text()
			).toBe(TITLE_TEXT);
		});

		// Then make sure that it can render a left hand component on the left hand side
		it('should render the left hand component', () => {
			// 1) Declare the left hand component to be passed down through the props
			const leftComponent = (
				<p id="left-component">{LEFT_COMPONENT_TEXT}</p>
			);

			// 2) Mount the Title component with the left hand component
			const component = mount(
				<Title
					leftComponent={leftComponent}
				>
					{TITLE_TEXT}
				</Title>
			);

			// 3) Expect that the title has exactly two non-null children (the text and the left hand component)
			expect(
				component.childAt(0).getElement().props.children.filter(child => child).length
			).toBe(2);

			// 4) Expect that the first non-null component is the leftComponent (to ensure that the left
			// hand component is rendered on the left side)
			expect(
				component.childAt(0).getElement().props.children.filter(child => child)[0]
			).toBe(leftComponent);

			// 5) Expect that the second non-null child is the title text
			expect(
				component.childAt(0).getElement().props.children.filter(child => child)[1]
			).toBe(TITLE_TEXT);

			// 6) Expect that the left hand component is actually rendering properly to the user
			expect(component.find('p#left-component').props().children).toBe(LEFT_COMPONENT_TEXT);
		});

		// Then we make sure that it can render a right hand component on the right hand side
		it('should render the right hand component', () => {
			// 1) Declare the right hand component to be passed through the props
			const rightComponent = (
				<p id="right-component">{RIGHT_COMPONENT_TEXT}</p>
			);

			// 2) Mount the title component and pass in the right hand component
			const component = mount(
				<Title
					rightComponent={rightComponent}
				>
					{TITLE_TEXT}
				</Title>
			);

			// 3) Expect the title component to have exactly two non-null children
			expect(
				component.childAt(0).getElement().props.children.filter(child => child).length
			).toBe(2);

			// 4) Expect that the first non-null child is the title text
			expect(
				component.childAt(0).getElement().props.children.filter(child => child)[0]
			).toBe(TITLE_TEXT);

			// 5) Expect that the second non-null child is the right hand component
			expect(
				component.childAt(0).getElement().props.children.filter(child => child)[1]
			).toBe(rightComponent);

			// 6) Expect that the right hand component is rendering it's children properly
			expect(component.find('p#right-component').props().children).toBe(RIGHT_COMPONENT_TEXT);
		});

		// Then we make sure that it can render both the right hand component and left hand component
		// in their proper places
		it('should render both right hand and left hand component', () => {
			// 1) Declare the right hand component to be passed in to the Title
			const rightComponent = (
				<p id="right-component">{RIGHT_COMPONENT_TEXT}</p>
			);

			// 2) Declare the left hand component to be passed in to the Title
			const leftComponent = (
				<p id="left-component">{LEFT_COMPONENT_TEXT}</p>
			);

			// 3) Mount the Title component with the left and right hand components passed in through the props
			const component = mount(
				<Title
					rightComponent={rightComponent}
					leftComponent={leftComponent}
				>
					{TITLE_TEXT}
				</Title>
			);

			// 4) Expect that the component has exactly three non-null children
			expect(
				component.childAt(0).getElement().props.children.filter(child => child).length
			).toBe(3);

			// 5) Expect the first non-null child is the left hand component
			expect(
				component.childAt(0).getElement().props.children.filter(child => child)[0]
			).toBe(leftComponent);

			// 6) Expect that the second non-null child is the title text
			expect(
				component.childAt(0).getElement().props.children.filter(child => child)[1]
			).toBe(TITLE_TEXT);

			// 7) Expect the third non-null child is the right hand component
			expect(
				component.childAt(0).getElement().props.children.filter(child => child)[2]
			).toBe(rightComponent);

			// 8) Expect the right hand component to render it's children
			expect(component.find('p#right-component').text()).toBe(RIGHT_COMPONENT_TEXT);

			// 9) Expect the left hand component to render it's children
			expect(component.find('p#left-component').text()).toBe(LEFT_COMPONENT_TEXT)
		});

		// Then we make sure that it can inherit the className that we pass in through <Title />
		it('inherits className from props', () => {
			// 1) Mount the component and pass in the className
			const component = mount(
				<Title
					className={CLASS_NAME}
				>
					{TITLE_TEXT}
				</Title>
			);

			// 2) Expect the root node to have the className passed to the Title component
			expect(component.childAt(0).hasClass(CLASS_NAME)).toBe(true);
		})
	}
);
