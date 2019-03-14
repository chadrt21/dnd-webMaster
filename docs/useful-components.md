# Useful Components

## Description

With the addition of the character tool, I (Joseph) have added many React Components that you may find useful in your own tasks. All of these components can be found in `/front-end/src/components`.

## Calculator Input

### Description

The calculator input is a simple number text input (with BlueprintJS stylings) that allows the user to perform mathematical operations in the input itself.

### Props

| Prop Name | Description | Datatype |
|-----------|-------------|----------|
| value | If the component shall be controlled, supply value | Number |
| onChange | The callback function to be called, it's first argument is the numerical value of the input | Func |
| placeholder | The placeholder text for the input component | String |
| autoFocus | Whether or not the input should automatically focus on mount | bool |

### Example

```js
<CalculatorInput
	value={this.state.value}
	onChange={value => this.setState({ value })}
	placeholder="Please enter a number"
	autoFocus
/>
```

### Other

See [this](https://blueprintjs.com/docs/#core/components/numeric-input.extended-example) blueprint page for an working example