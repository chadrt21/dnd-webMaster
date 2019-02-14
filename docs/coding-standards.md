# Coding Standards

* [Description](#description)
* [Standards in this Project](#standards-in-this-project)
	* [Quotes for Strings](#quotes-for-strings)
	* [Semicolons](#semicolons)
	* [Comma Dangle](#comma-dangle)
	* [Arrow Body Style](#arrow-body-style)
	* [Prefer Const](#prefer-const)
	* [No Var](#no-var)
	* [Object Properties Shorthand](#object-properties-shorthand)
	* [Spacing](#spacing)
	* [Prop Types](#prop-types)
* [Standards not Enforced by ESLint](#standards-not-enforced-by-eslint)
	* [Commenting](#commenting)
	* [File Naming](#file-naming)
	* [Variable Naming](#variable-naming)

## Description

This document provides coding standards that we should all adhere to to promote consistent readability throughout our codebase. These standards shall be enforced by [eslint](https://eslint.org/), a code checker that will stop the build if various style rules are violated. On top of enforcing various best practice rules, eslint will also check for various potential runtime errors (such as infinite for loops, undeclared variables, etc). To check the code for lint errors using the command line without building, run the command `npm run lint`. Linting is also done when attempting to build the project. Some lint errors can be fixed automatically. To fix all auto-fixable errors, run the command `npm run lint:autofix`. Below is a list of some of the style rules we will be using.

If you are using visual studio, there is a plug-in you can get to show lint errors as you code (with the dreaded red-squiggly). You can install it from [here](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint). It is highly recommended that you download this extension so you do not have to mentally keep track of all of the style rules.

## Standards in this Project

This project uses all of the default style rules included in `eslint:recommended` and `plugin:react/recommended`. All of the default eslint rules can be found on [this](https://eslint.org/docs/rules/) page (they are the rules with the checkmark next to them) and all of the default react rules can be found [here](https://github.com/yannickcr/eslint-plugin-react#recommended). This document will not go over every linting rule but rather highlight a few notable ones.

### [Quotes for Strings](https://eslint.org/docs/rules/quotes)

When strings are used in this project (with the exception of JS template strings), they shall use single quotation marks. Template strings should only be used when embedding a variable's value into a string.

*Good* :+1: :+1:
```js
const str = 'This is a good string';

const status = 'okay';
const templateString = `This is ${status} if you need to embed a variable's value in a string`;
```

*Bad* :-1:
```js
const str = "This is a bad string";

const templateString = `This is not okay because no variable is being embedded`;
```

### [Semicolons](https://eslint.org/docs/rules/semi)

While semicolons are technically optional in JavaScript, to promote readability, they will be required in this project.

*Good* :+1: :+1:
```js
someFunc();
```

*Bad* :-1:
```js
someFunc()
```

### [Comma Dangle](https://eslint.org/docs/rules/comma-dangle)

When writing multi-lined object or array literals, a trailing comma shall be placed at the end. This is so that if you need to add a line below it in the future, you only need to change one line instead of two (it is easier for git).

*Good* :+1: :+1:
```js
const someObjectLiteral = {
	a: 'foo',
	b: 'bar',
	c: 'baz',
};

const someObjectLiteralOneLine = { a: 'foo', b: 'bar', c: 'bax' };

const someArrayLiteral = [
	1,
	2,
	3, // If an item needs to be added, this line wont be changed in the git diff
];

const someArrayLiteralOneLine = [ 1, 2, 3, 4 ];
```

*Bad* :-1:
```js
const someObjectLiteral = {
	a: 'foo',
	b: 'bar',
	c: 'baz'
}

const someArrayLiteral = [
	1,
	2,
	3 // If an item needs to be added, this line will need to be changed as well
]
```

### [Arrow Body Style](https://eslint.org/docs/rules/arrow-body-style)

When using [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) that *only* return a value, arrow function return shorthand shall be used instead of an explicit return statement.

*Good* :+1: :+1:
```js
const someArrowFunc = () => 'String returned by someArrowFunc';
```

*Bad* :-1:
```js
const someArrowFunc = () => {
	return 'String returned by someArrowFunc';
};
```

### [Prefer Const](https://eslint.org/docs/rules/prefer-const)

Variables that never change their value should be declared using the `const` keyword.

*Good* :+1: :+1:
```js
const a = 'I am never going to change my value';

let b = 'I might change';
if (someBool) {
	b = 'I did change!';
}
```

*Bad* :-1:
```js
let a = 'I am never going to change my value';
```

### [No Var](https://eslint.org/docs/rules/no-var)

When declaring variables in this project, the keyword `var` should never be used. Instead, use `let` or `const`.

*Good* :+1: :+1:
```js
const a = 'I am never going to change my value';

let b = 'I might change';
if (someBool) {
	b = 'I did change!';
}
```

*Bad* :-1:
```js
var a = 'I am never going to change my value';

var b = 'I might change';
if (someBool) {
	b = 'I did change!';
}
```

### [Object Properties Shorthand](https://eslint.org/docs/rules/object-shorthand)

When writing object literals where the name of the object property is the same as the variable, [object property shorthand](https://ariya.io/2013/02/es6-and-object-literal-property-value-shorthand) shall be used.

*Good* :+1: :+1:
```js
const a = 'Some string';

const obj = {
	a,
	b: 'Another string',
};
```

*Bad* :-1:
```js
const a = 'Some string';

const obj = {
	a: a,
	b: 'Another string',
};
```

### [Spacing](https://eslint.org/docs/rules/array-bracket-spacing)

This coding standard is enforced by the following rules:
* [array-bracket-spacing](https://eslint.org/docs/rules/array-bracket-spacing)
* [block-spacing](https://eslint.org/docs/rules/block-spacing)
* [func-call-spacing](https://eslint.org/docs/rules/func-call-spacing)
* [key-spacing](https://eslint.org/docs/rules/key-spacing)
* [object-curly-spacing](https://eslint.org/docs/rules/object-curly-spacing)
* [arrow-spacing](https://eslint.org/docs/rules/arrow-spacing)

Spacing should be consistent across array literals, object literals, key/value assignment, function calls, and arrow function declarations.

*Good* :+1: :+1:
```js
// Array literals
const arr = [ 1, 2, 3, 4 ];

// Object literals
const obj = { a: 'foo', b: 'bar', c: 'baz' };

// Key value assignment
const objMultiLine = {
	a: 'foo',
	b: 'bar',
	c: 'baz',
};

// Function calls
someFunc();

// Arrow function declarations
const someArrowFunc = () => 'The value returned by someArrowFunc';
```

*Bad* :-1:
```js
// Array literals
const arr1 = [1, 2, 3, 4 ];
const arr2 = [ 1, 2, 3, 4];
const arr3 = [1, 2, 3, 4];
const arr4 = [ 1, 2,3,4 ];

// Object literals
const obj1 = { a: 'foo', b: 'bar', c: 'baz'};
const obj2 = {a: 'foo', b: 'bar', c: 'baz' };
const obj3 = {a: 'foo', b: 'bar', c: 'baz'};
const obj4 = { a: 'foo',b: 'bar',c: 'baz' };

// Key value assignment
const objMultiLine = {
	a :'foo',
	b : 'bar',
	c:'baz',
};

// Function calls
someFunc ();

// Arrow function declarations
const someArrowFunc = ()=> 'The value returned by someArrowFunc';
const someOtherArrowFunc = () =>'The value returned by someArrowFunc';
```

### [Prop Types](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prop-types.md)

When making React Components, any props accessed from `this.props` must be declared using [prop-types](https://www.npmjs.com/package/prop-types). 

*Good* :+1:
```js
import PropTypes from 'prop-types';
import React from 'react';

class SomeComponent extends React.Component {
	static propTypes = {
		myProp: PropTypes.string,
	}
	
	render() {
		const { myProp } = this.props;
		return (
			<p>{myProp}</p>
		);
	}
}

const SomeOtherComponent = props => (<p>{props.myProp}</p>);

SomeOtherComponent.propTypes = {
	myProp: PropTypes.string,
};
```

*Bad* :-1:
```js
import React from 'react';

class SomeComponent extends React.Component {
	render() {
		const { myProp } = this.props;
		return (
			<p>{myProp}</p>
		);
	}
}

const SomeOtherComponent = props => (<p>{props.myProp}</p>);
```

## Standards not Enforced by ESLint

### Commenting

The purpose of each component should be documented briefly and concisely at the top of each component file so that someone could open the file and know why it exists. It is not necessary to list all of the component props in the comment as they can be plainly seen in the propTypes. Aside from that, code should be readable enough to understand without comments. Comments should be used to clarify particularly confusing code segments.

*Good* :+1:
```js
/*
This component is the search input used in any search engine. Do not
use this component for the global search overlay.
*/

import React from 'react';

export default class SearchField extends React.Component {
	// some React class...
}
```

### File Naming

React component class (and any other classes) should use [upper camel case](http://wiki.c2.com/?UpperCamelCase) (aka Pascal Case) for the file name. Any plain javascript file containing utility functions should be lowercase with dashes (-) for spaces. Stylesheets should also be lowercase with dashes for spaces.

React classes should have the `.jsx` file extension while all other javascript files should end with `.js`.

*Good* :+1:
```
+ ContentPanel.jsx       -> A React component file
+ LayoutRow.js           -> A plain javascript class
+ network-functions.js   -> A plain javascript file containing utility functions
```

### Variable Naming

All variable names should use [lower camel case](http://wiki.c2.com/?LowerCamelCase) when possible. If we do not have control over the variable name (i.e. the data came from an API request), then it is okay to use that variables name.

*Good* :+1:
```js
const someVariable = 'This is a string';

const apiRequest = await fetch.get('/api/some/endpoint');
console.log(apiRequest.some_data_from_server);
```

*Bad :-1:
```js
const some_variable = 'This is a string';
````