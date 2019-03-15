# Useful Components

- [Document Description](#document-description)
- [Calculator Input](#calculator-input)
- [Collapsible Section](#collapsible-section)

## Document Description

With the addition of the character tool, I (Joseph) have added many React Components that you may find useful in your own tasks. All of these components can be found in `/front-end/src/components`. Not all of the components in /components are generic enough to be useful (like the /home-page for example). Therefore, not all of the components in /components will be documented here, just the ones you could reasonably use for other tools or features.

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

## List

### Description

This component displays item in a list format, highlighting every other item in a style that is consistent with our brand with the option to make the items selectable.

### Props

*required*

| Prop Name | Description | Datatype |
|-----------|-------------|----------|
| *items* | The array of items (Objects) to display in the list | Array[Object] |
| *items[].name* | The name of the list item to be displayed | String |
| onItemSelected | The function that is called when an item is selected. The selected item object is passed as the first parameter | Func |
| className | The CSS class to be applied to the root list element | String |
| leftComponent | The component to be displayed to the left of each list item | Component |

### Example

```js
import List from './components/list';

// ... meanwhile in some render function

<List
	items={[
		{ name: 'Item 1', id: 1 },
		{ name: 'Item 2', id: 2 },
		{ name: 'Item 3', id: 3 },
	]}
	onItemSelected={item => console.log(item.id)}
	leftComponent={
		<span>Item: </span>
	}
/>
```

### Other

To see a working example of this, build the project and look at the character tool. This component is used to display the list of characters that is in the campaign.
