# Useful Components

- [Document Description](#document-description)
- [Calculator Input](#calculator-input)
- [Collapsible Section](#collapsible-section)
- [List](#list)
- [Resource Select](#resource-select)
- [Table](#table)
- [Title](#title)

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

```jsx
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

```jsx
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

```jsx
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

## Resource Select

### Description

A generic select popover element for searching through and selecting resources from the database that have search routes implemented. If you give it the search API endpoint, it will query that endpoint and display the returned search results in a popover select. The child of the resource select is the popover target (i.e. when the child is clicked, the select will appear). For example, you could use this component to have the user select a spell from the spells table, or an equipment from the equipment table. The component will query the API as the user types.

### Prop

*required*

| Prop Name | Description | Datatype |
|-----------|-------------|----------|
| *onResourceSelected* | The function to be called when a resource is selected by the user. The selected resource object (not just the id) is passed as the first parameter | Func |
| *endpoint* | The search API endpoint to be queried when the user searches, the endpoint must return an array of objects. | String |
| idKey | The field name of the resource object that uniquely identifies it. So for example, the idKey for a spell resource would be spellID (from the database) | String |
| nameKey | The field name of the resource object that should be displayed to the user in the select. So for example, the nameKey for a spell resource would be spellName (from the database) | String |
| queryParameterName | The name of the query string variable that should contain the search value, default is "query" which is the variable name that search API endpoints expect | String |
| queryOptions | Any additional query string variables that should be added to each API request | Object |
| fetchOnMount | Whether or not the select should make an API request with an empty search value when the component first mounts | Boolean |

### Example

```jsx
import List from './components/list';
import {
	Button,
} from '@blueprintjs/core';

// ... meanwhile in some render function

<ResourceSelect
	onResourceSelected={spell => console.log(`The user selected ${spell.spellName}`)}
	endpoint="/api/search/spells"
	idKey="spellID"
	nameKey="spellName"
	queryOptions={{
		count: 8,
	}}
	fetchOnMount
>
	<Button>Search for a spell</Button>
</ResourceSelect>
```

### Other

See [this](https://blueprintjs.com/docs/#select/select-component) page to see what a select looks like.

## Table

### Description

Displays a table of data using the D&D style for tables. This table can be sortable and the rows can be clickable. It also supports custom render functions for each column.

### Props

*required*

| Prop Name | Description | Datatype |
|-----------|-------------|----------|
| *items* | The array of data where each item in the array is a javascript object. | Array[Object] |
| *head* | The object that defines what columns go where, what the title of said columns are, how that column's cells are rendered, and how it maps to the items array. Each key in the object is key in items array  | Object |
| head.name | The title of the column. Omit if the column shouldn't have a title | String |
| head.renderCol | A function to be called (if defined) for each cell in this column. It should return a React Component. It's first parameter is the value to be rendered in the cell and the row that cell belongs to | Func |
| fullWidth | Whether or not the table should take up the full width of the container | Boolean |
| onItemSelect | The function to be called when a row in the table is selected. The selected row is passed as the first parameter | Func |
| sortable | Whether or not the table should be sortable | Boolean |
| sortingDirection | Whether the table should be sorting in ascending or descending order, use this if you want sorting to be controlled, otherwise this will be maintained in the component state | "asc" or "desc" |
| sortingColumn | The column that is being sorted, used if you want sorting to be controlled | String |
| handleSortChange | The function to be called when the user changes the sorting direction, used if the component should be controlled. The first parameter is the new column to be sorting, the second parameter is the direction to sort | Func |

### Example

```jsx
import Table from './components/table';

const dummySpells = [
	{
		spellName: 'Acid arrow',
		level: 1,
		spellID: 1,
	},
	{
		spellName: 'Zone of Truth',
		level: 3,
		spellID: 2,
	},
	{
		spellName: 'Chromatic Orb',
		level: 2,
		spellID: 3,
	},
];

// ... meanwhile in some render function

<Table
	items={dummySpells}
	head={{
		'spellName': {
			name: 'Name',
		},
		'level': {
			name: 'Spell Level',
		},
		'spellID': {
			renderCol: (value, row) => (
				<a href={`/spells/${value}`}>Go to {row.spellName}</a>
			)
		}
	}}
	fullWidth
	onItemSelect={row => console.log(`The user has selected ${row.spellName}`)}
	sortable
	sortingDirection={this.state.sortingDirection}
	sortingColumn={this.state.sortingColumn}
	handleSortChange={
		(sortingColumn, sortingDirection) => this.setState({ sortingColumn, sortingDirection })
	}
/>
```

### Other

To see an example of this component, build the project and look at the spells section in the character tool.

## Title

### Description

A component for styled titles

### Props

*required*

| Prop Name | Description | Datatype |
|-----------|-------------|----------|
| color | The color of the title | "primary" or "secondary" |
| fontSize | The font size of the title in pt, the default is 42pt | Number |
| rightComponent | The component to be placed on the right of the title | Component |
| className | The CSS class to be applied to the h1 element | String |

###  Example

```jsx
import Title from './components/title';

//... meanwhile in some render function

<Title
	color="primary"
	fontSize={28}
>
Some Title
</Title>
```

### Other

Most of the titles in the project use this component
