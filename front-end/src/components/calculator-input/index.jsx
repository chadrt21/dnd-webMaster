import React from 'react';
import PropTypes from 'prop-types';
import calculator from 'happycalculator';

import {
	NumericInput,
	Keys,
} from '@blueprintjs/core';

export default class CalculatorInput extends React.Component {
	static propTypes = {
		value: PropTypes.number,
		onChange: PropTypes.func,
		placeholder: PropTypes.string,
		autoFocus: PropTypes.bool,
	}

	state = {
		value: 0,
	}

	componentDidMount() {
		const { value } = this.props;
		if (typeof value === 'number') {
			this.setState({ value });
		}
	}

	onConfirm(value) {
		const { onChange } = this.props;

		try {
			const result = calculator.calculate(value);
			this.setState({
				value: result,
			}, () => {
				if (onChange) {
					onChange(this.state.value);
				}
			});
		} catch {
			this.setState({
				value: this.props.value,
			});
		}
	}

	onKeyDown = event => {
		if (event.keyCode === Keys.ENTER) {
			this.onConfirm(event.target.value);
		}
	}

	onBlur = event => {
		this.onConfirm(event.target.value);
	}

	handleInputChange = (numberValue, stringValue) => {
		const { onChange } = this.props;
		if (!isNaN(numberValue)) {
			this.setState({
				value: numberValue,
			}, () => {
				if (onChange) {
					onChange(numberValue);
				}
			});
		}

		this.setState({
			value: stringValue,
		});
	}
	
	render() {
		const { placeholder, autoFocus, ...rest } = this.props;
		const { value } = this.state;
		return (
			<NumericInput
				{...rest}
				allowNumericCharactersOnly={false}
				onBlur={this.onBlur}
				onKeyDown={this.onKeyDown}
				placeholder={placeholder}
				value={value}
				onValueChange={this.handleInputChange}
				autoFocus={autoFocus}
			/>
		);
	}
}