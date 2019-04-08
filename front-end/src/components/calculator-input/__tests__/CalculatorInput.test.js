import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CalculatorInput from '../';
import { Keys } from '@blueprintjs/core';

configure({ adapter: new Adapter() });

const NON_NUMERIC_TEXT = 'These characters are non numeric';

describe('CalculatorInput', () => {
	// First make sure that it renders correctly
	it('renders correctly', () => {
		// 1) Mount the component
		const component = mount(
			<CalculatorInput />
		);

		// 2) Expect the component to match the last snapshot (if this test fails, then the component
		// was probably updated and snapshot probably needs to be deleted)
		expect(component).toMatchSnapshot();
	});

	// Then make sure that it renders the correct default value (with no props should be 0)
	it('renders the correct uncontrolled default value', () => {
		// 1) Mount the component
		const component = mount(
			<CalculatorInput />
		);

		// 2) Find the actual input component
		const input = component.find('input');

		// 3) Expect the rendered value of the input to be the default of 0
		expect(input.render().val()).toBe('0');
	});

	// Then make sure that it can render with the default value
	it('can be rendered with default value', () => {
		// 1) Mount the component
		const component = mount(
			<CalculatorInput
				value={9}
			/>
		);

		// 2) Find the actual input component
		const input = component.find('input');

		// 3) Expect the rendered value of the input to be the given value of 9
		expect(input.render().val()).toBe('9');
	});

	// Then make sure that it can function in an uncontrolled environment
	it('can be uncontrolled', () => {
		// 1) Mount the component
		const component = mount(
			<CalculatorInput />
		);

		// 2) Find the actual input component
		const input = component.find('input');

		// 3) Expect the value to be the default of 0
		expect(input.render().val()).toBe('0');

		// 4) Simulate an event in which the user sets the text to a non numeric value
		input.simulate('change', { target: { value: NON_NUMERIC_TEXT }});

		// 5) Expect that the input renders that non numeric text
		expect(input.render().val()).toBe(NON_NUMERIC_TEXT);
	});

	// Then make sure that it will actually call the on change method
	it('will call the on change method', () => {
		// 1) Create the mock function to monitor the on change function
		const onChangeMock = jest.fn();

		// 2) Mount the component
		const component = mount(
			<CalculatorInput
				onChange={onChangeMock}
			/>
		);

		// 3) Find the actual input component
		const input = component.find('input');

		// 4) Simulate an event in which the user changes the input value to the number 20
		input.simulate('change', { target: { value: '20' }});

		// 5) Expect that the on change function was called and the value of the input was passed into it
		expect(onChangeMock).toBeCalledWith(20);
	});

	// Then make sure that it will not call on change when non-numeric text is entered
	it('wont call the on change method when non-numeric text is entered', () => {
		// 1) Create the mock function to monitor the on change function
		const onChangeMock = jest.fn();

		// 2) Mount the component
		const component = mount(
			<CalculatorInput
				onChange={onChangeMock}
			/>
		);

		// 3) Find the actual input component
		const input = component.find('input');

		// 4) Simulate an event in which the user changes the text to a non numeric value
		input.simulate('change', { target: { value: NON_NUMERIC_TEXT }});

		// 5) Expect that the on change function was not called
		expect(onChangeMock).not.toHaveBeenCalled();
	});

	// Then make sure that the on change function isn't called when the input blurs with an invalid value	
	it('will not call the on change function if the input blurs with an invalid value', () => {
		// 1) Create the mock function to monitor the on change function
		const onChangeMock = jest.fn();

		// 2) Mount the component
		const component = mount(
			<CalculatorInput
				onChange={onChangeMock}
			/>
		);

		// 3) Find the actual input component
		const input = component.find('input');

		// 4) Simulate an on blur event in which the value of the input is non numeric
		input.simulate('blur', { target: { value: NON_NUMERIC_TEXT } });

		// 5) Expect that the on change function wasn't called
		expect(onChangeMock).not.toHaveBeenCalled();
	});

	// Then make sure that the on change function is called when the input blurs with a numeric value
	it('will call the on change function if the input blurs with a valid numeric value', () => {
		// 1) Create the mock function to monitor the on change function
		const onChangeMock = jest.fn();

		// 2) Mount the component
		const component = mount(
			<CalculatorInput
				onChange={onChangeMock}
			/>
		);

		// 3) Find the actual input component
		const input = component.find('input');

		// 4) Simulate a blur event in which the input blurs with a value of 20
		input.simulate('blur', { target: { value: '20' }});

		// 5) Expect that the onChange function was called
		expect(onChangeMock).toHaveBeenCalledTimes(1);
	});

	// THen make sure that the input is cleared if the user presses enter with a non mathematical value
	it('will set the input back to zero when the user presses enter with a non mathematical value', () => {
		// 1) Create the mock function to monitor the on change function
		const onChangeMock = jest.fn();

		// 2) Mount the component
		const component = mount(
			<CalculatorInput
				onChange={onChangeMock}
			/>
		);

		// 3) Find the actual input component
		const input = component.find('input');

		// 4) Simulate an event in which the user changes the input to non numeric text
		input.simulate('change', { target: { value: NON_NUMERIC_TEXT }});

		// 5) Expect the input to be rendered with a value of the non numeric text
		expect(input.render().val()).toBe(NON_NUMERIC_TEXT);

		// 6) Simulate an event in which the user presses the enter key
		input.simulate('keyDown', { keyCode: Keys.ENTER });

		// 7) Expect that the rendered value of the input is falsy
		expect(input.render().val()).toBeFalsy();
	});

	// Now let's test the calculator features of this input
	
	// First let's make sure that on change isn't called when valid mathematical expression is called
	it('wont call the on change function if the input has a valid mathematical expression', () => {
		// 1) Create the mock function to monitor the on change function
		const onChangeMock = jest.fn();

		// 2) Mount the component
		const component = mount(
			<CalculatorInput
				onChange={onChangeMock}
			/>
		);

		// 3) Find the actual input component
		const input = component.find('input');

		// 4) Simulate an event in which the user changes the input to '2 + 2'
		input.simulate('change', { target: { value: '2 + 2' }});

		// 5) Expect that the on change function was not called
		expect(onChangeMock).not.toHaveBeenCalled();

		// 6) Expect that the input renders the text '2 + 2'
		expect(input.render().val()).toBe('2 + 2');
	});

	// Then let's make sure that when we press enter, it will call on change with the computed value
	it('will calculate the given mathematical expression when enter is pressed', () => {
		// 1) Create the mock function to monitor the on change function
		const onChangeMock = jest.fn();

		// 2) Mount the component
		const component = mount(
			<CalculatorInput
				onChange={onChangeMock}
			/>
		);

		// 3) Find the actual input component
		const input = component.find('input');

		// 4-5) Simulate an event in which the user changes the input to '2 + 2' and
		// an then presses the enter key
		input.simulate('change', { target: { value: '2 + 2' }});
		input.simulate('keyDown', { keyCode: Keys.ENTER });

		// 6-7) Expect the on change function to be called with the computed value of 4 and
		// render the value in the input
		expect(onChangeMock).toBeCalledWith(4);
		expect(input.render().val()).toBe('4');

		// 8-9) Simulate an event in which the user changes the input to '2+ 2' and
		// an then presses the enter key (this is to ensure that the parsing of the numbers
		// do not rely on whitespace and this test only needs to be done once)
		input.simulate('change', { target: { value: '2+ 2' }});
		input.simulate('keyDown', { keyCode: Keys.ENTER });

		// 10-11) Expect the on change function to be called with the computed value of 4 and
		// render the value in the input
		expect(onChangeMock).toBeCalledWith(4);
		expect(input.render().val()).toBe('4');

		// 12-13) Simulate an event in which the user changes the input to '2+2' and
		// an then presses the enter key (again, this is to ensure that the parsing of the numbers
		// do not rely on whitespace)
		input.simulate('change', { target: { value: '2+2' }});
		input.simulate('keyDown', { keyCode: Keys.ENTER });

		// 14-15) Expect the on change function to be called with the computed value of 4 and
		// render the value in the input
		expect(onChangeMock).toBeCalledWith(4);
		expect(input.render().val()).toBe('4');

		// 16-17) Simulate an event in which the user changes the input to '2 * 2' and
		// an then presses the enter key
		input.simulate('change', { target: { value: '2 * 2' }});
		input.simulate('keyDown', { keyCode: Keys.ENTER });

		// 18-19) Expect the on change function to be called with the computed value of 4 and
		// render the value in the input
		expect(onChangeMock).toBeCalledWith(4);
		expect(input.render().val()).toBe('4');

		// 20-21) Simulate an event in which the user changes the input to '2 / 2' and
		// an then presses the enter key
		input.simulate('change', { target: { value: '2 / 2' }});
		input.simulate('keyDown', { keyCode: Keys.ENTER });

		// 22-23) Expect the on change function to be called with the computed value of 1 and
		// render the value in the input
		expect(onChangeMock).toBeCalledWith(1);
		expect(input.render().val()).toBe('1');

		// 24-25) Simulate an event in which the user changes the input to '3 - 2' and
		// an then presses the enter key
		input.simulate('change', { target: { value: '3 - 2' }});
		input.simulate('keyDown', { keyCode: Keys.ENTER });

		// 26-27) Expect the on change function to be called with the computed value of 1 and
		// render the value in the input
		expect(onChangeMock).toBeCalledWith(1);
		expect(input.render().val()).toBe('1');
	});

	// Then let's make sure that when we blur the element it will call on change with the computed value
	it('will calculate the given mathematical expression when the input blurs', () => {
		// 1) Create the mock function to monitor the on change function
		const onChangeMock = jest.fn();

		// 2) Mount the component
		const component = mount(
			<CalculatorInput
				onChange={onChangeMock}
			/>
		);

		// 3) Find the actual input component
		const input = component.find('input');

		// 4) Simulate an event in which the input blurs with a value of '2 + 2'
		input.simulate('blur', { target: { value: '2 + 2' }});

		// 4-6) Expect the on change function to be called with the computed value of 4 and
		// render the value in the input
		expect(onChangeMock).toBeCalledWith(4);
		expect(input.render().val()).toBe('4');
	});
});
