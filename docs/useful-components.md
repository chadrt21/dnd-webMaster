# Useful Components

## Document Description

With the addition of the character tool, I (Joseph) have added many React Components that you may find useful in your own tasks. All of these components can be found in `/front-end/src/components`.

## Calculator Input

### Description

The calculator input is a simple number text input (with BlueprintJS stylings) that allows the user to perform mathematical operations in the input itself.

### Props

*required*

| Prop Name | Description | Datatype |
|-----------|-------------|----------|
| value | If the component shall be controlled, supply value | Number |
| onChange | The callback function to be called, it's first argument is the numerical value of the input | Func |
| placeholder | The placeholder text for the input component | String |
| autoFocus | Whether or not the input should automatically focus on mount | Boolean |

### Example

```js
import CalculatorInput from '/components/calculator-input';

//... meanwhile in some render function

<CalculatorInput
	value={this.state.value}
	onChange={value => this.setState({ value })}
	placeholder="Please enter a number"
	autoFocus
/>
```

### Other

See [this](https://blueprintjs.com/docs/#core/components/numeric-input.extended-example) blueprint page for an working example

## Collapsible Section

### Description

This is a UI component that  defines a titled section that can be collapsed or expanded (used in the character tool). It can only be used as a controlled component (i.e. it's parent must manage whether or not it is opened). The children of the CollapsibleSection will the content that is either hidden or displayed.

### Props

*required*

| Prop Name | Description | Datatype |
|-----------|-------------|----------|
| *title* | The title to be displayed for the section | String |
| *expanded* | Whether or not the section is expanded | Boolean |
| *changeExpanded* | The function to be called whenever the expand button is pressed. The current value of `expanded` is passed as the first parameter | Func |
| className | The CSS class to be applied to the Title | String |

### Example

```js
import CollapsibleSection from '/components/collapsible-section';

//... meanwhile in some render function

<CollapsibleSection
	title="My Section"
	expanded={this.state.expanded}
	changeExpanded={expanded => this.setState({ expanded })}
>
	<p>Here is my section content</p>
</CollapsibleSection>
```

### Other

To see a working example of this, start the server and open the character tool. All of the sections on the Character Editor use this component.
