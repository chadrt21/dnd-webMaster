<p style="font-size: 22pt; text-align: center; margin: 0;">Software Unit and System Test Documentation</p>
<p style="font-size: 22pt; text-align: center; margin: 0;">Campaign Buddy</p>
<p style="font-size: 22pt; text-align: center; margin: 0;">Document Version: 3.0</p>
<p style="font-size: 22pt; text-align: center; margin: 0;">Date: February 1, 2019</p>
<p style="font-size: 22pt; text-align: center; margin: 0;">Location of File: docs/srs.md</p>
<p style="font-size: 22pt; text-align: center; margin: 0;">CSCI Biola University</p>

<div style="page-break-after: always;"></div>

# Overview

Campaign Buddy is an online interactive toolbox to assist Dungeon Masters and players to run Dungeons and Dragons (D&D) campaigns (storytelling based, roleplaying adventures played on a tabletop run by a Dungeon Master, or DM). Campaign Buddy’s purpose is to make the process of setting up, planning, and executing these campaigns simple, painless, and efficient. It is a interface that uses a collection of tools that target different aspects of running a campaign such as creating and managing players, creating maps, planning stories, keeping track of spells, items, and lore, and so on. While different implementations of these tools exist individually in various places, this tool seeks to integrate them into one convenient and customizable panel-based layout. This is important because DMs are often using multiple tools at the same time and need to be able to reference resources.

# Target Audience

Our target audience are Dungeon Masters (DMs) and D&D players that vary from beginners to novice enthusiast in order to easy the D&D experience. Our primary target audience are DMs with any range of experience. Novice DMs should view this tool as a guide while experience DMs should view this tool as an efficiency booster. Our audience is young and comfortable with using web technologies such as Google drive, social media sites, and so on.

# Project Team Members

- Chad Ross (Project Manager/Scrum Master)
- Joseph Stewart (Subject Mater Expert/Front End Developer)
- Jillian McDaniel (Configuration Manager/UI Architect)
- Ashley Cheah (Product Owner/UI Architect)
- Zachary Leonard (Database Developer/QA Manager)

# Version Control History

| Version | Primary Authors | Description of Version | Date Completed |
| ------- | --------------- | ---------------------- | -------------- |
| 1.0     | Chad Ross  | Initial version        | 4/11/2019       |


<div style="page-break-after: always;"></div>

# Signatures of Approval

- Joseph Stewart
- Ashley Cheah
- Jillian McDaniel
- Zachary Leonard
- Chad Ross

<div style="page-break-after: always;"></div>

# Table of Contents

1. [Introduction](#1-introduction)
   1. [Product Overview](#11-product-overview-back-to-top)
   2. [Test Approach](#12-test-approch)
2. [Test Plan](#2-test-plan)
   1. [Components to be tested](#21-features-to-be-tested)
   2. [Components not to be tested](#22-features-not-to-be-tested)
   3. [Testing Tools and Environment](#23-testing-tools)
3. [Test Cases](#3-test-cases)
   1. [Create Campaigns](#31-create-campaigns)
      1. [Purpose](#311-purpose)
      2. [Inputs](#312-inputs)
      3. [Expected Outputs & Pass/Fail Critera](#313-test-critera)
      4. [Test Procedure](#314-test-procedure)
   2. [Create Characters](#32-create-character)
      1. [Purpose](#311-purpose)
      2. [Inputs](#312-inputs)
      3. [Expected Outputs & Pass/Fail Critera](#313-test-critera)
      4. [Test Procedure](#314-test-procedure)
4. [Addicational Material](#4-addicational)
   1. [Appendix A. Test Logs](#41-appendix)
      1. [Test Results](#411-test-results)
      2. [Incident Report](#412-incident-report)


<div style="page-break-after: always;"></div>

# 1. Introduction

## 1.1 Product Overview [[Back to Top](#table-of-contents)]

Campaign Buddy is an online interactive toolbox to assist Dungeon Masters and players to run Dungeons and Dragons (D&D) campaigns (storytelling based, roleplaying adventures played on a tabletop run by a Dungeon Master, or DM). Campaign Buddy’s purpose is to make the process of setting up, planning, and executing these campaigns simple, painless, and efficient. It is a interface that uses a collection of tools that target different aspects of running a campaign such as creating and managing players, creating maps, planning stories, keeping track of spells, items, and lore, and so on. While different implementations of these tools exist individually in various places, this tool seeks to integrate them into one convenient and customizable panel-based layout. This is important because DMs are often using multiple tools at the same time and need to be able to reference resources.

## 1.2 Test Approach [[Back to Top](#table-of-contents)]

Because our architecture is component based (ReactJS and ExpressJS), we naturally opted for a component based testing approach. We decided to break down our project into different levels and test components at each level. In a sense, our testing approach is as if we took a magnifying glass to our system and examined it at the smallest point possible, then zoomed out repeatedly examining the increasingly bigger picture. We conducted testing at five levels:

1. The back-end route level (unit testing)
2. The front-end unit level (unit testing)
3. The front-end tool level (integration testing)
4. The full stack integration level (integration testing)
5. The user acceptance level (acceptance testing)

The back-end route level focuses on HTTP API and the various server side functions that we implement, ensuring that the each aspect of the API performs as we expect. The front-end unit level focuses on the generic atomic system components that are used repeatedly in the project. An example of this level would be the generic `Title` component. The front-end tool level focuses on each tool implemented in the project such as the Character Tool or Search Tool. This seemed to be a logical level to test at since each tool could itself be looked at as a self-encapsulated product. The full stack integration level focuses on the entire system including the interaction between the front-end UI and the back-end API. This is the broadest quantifiable and programable testing level. The user acceptance level tests presents the entire software system to our expected user demographic to ensure that it meets its original requirements laid out in the Software System Requirements document.

# 2. Test Plan

## 2.1 Features to be tested [[Back to Top](#table-of-contents)]

This document lays out testing procedures for the following components

* `/front-end/components`
	* `/calculator-input`
		* A number input that allows the user to type in and execute mathematical expressions
	* `/collapsible-section`
		* A titled section of content that can be collapsed (i.e. hidden from the users view) or expanded
	* `/title`
		* A UI component for displaying headers
	* `/tools/character`
		* Tool that allows the user to maintain character sheets for players and for NPCs
* `/back-end`
	* `/user`
		* API routes for getting and setting user profile information

Heuristic user acceptance testing was also performed.

## 2.2 Features not to be tested [[Back to Top](#table-of-contents)]

Most of the features that were not tested were not tested because they were mostly comprised of implementations of well documented and well tested third party libraries (such as BlueprintJS and ReactDnD) or they were mostly comprised of components that already had unit tests written for them. Components falling under this category are as follows:

* `/front-end/components`
	* `/modal` (just a wrapper for the BlueprintJS modal)
		* A generic modal container
	* `/sortable-item` (just a wrapper for ReactDnD)
		* UI control to let the user sort an array of items
	* `/toast` (just a wrapper for BlueprintJS toast)
		* Used for displaying errors to the user
	* `/tools/dice-roller` (A collection of Blueprint components)
		* Allows the user to roll a dice
	* `/tools/music` (A collection of Blueprint components, the Spotify API, and the list component)
		* Allows the user to play music in game
* `/back-end`
	* `/authentication` (handled mostly by PassportJS)
		* Code used to authenticate the user with Google
	* `/spotify-connector` (handled by Spotify)
		* Code used to authenticate the user with Spotify
	* `/campaigns`
		* API routes for getting and creating campaigns

In a perfect world with unlimited, these components would have tests written for them. But given the time constraints and the nature of their documentation, we felt comfortable not planning on testing these specific components. However, there were some components that we did want to write tests for, but were not able to do so in time. Components falling under that category are as follows:

* `/front-end/components`
	* `/rich-text-editor`
		* An editor used to write rich text content and at-mention/link to database resources
	* `/resource-select`
		* Used to search for and select generic database resources that have search routes defined for them
	* `/tools/notes`
		* Tool used to write and organize campaign notes
	* `/tools/search`
		* Tool used to search for static database resources
* `/back-end`
	* `/search`
		* API endpoints for making certain tables in the database searchable by the client in a safe yet powerful way
	* `/campaigns/characters`
		* API endpoints for getting and setting character data
	* `/campaigns/music`
		* API endpoints for linking and unlinking spotify data (not used for actually manipulating data stored in spotify)
	* `/campaigns/notes`
		* API endpoints for getting and setting note data

## 2.3 Testing Tools and Environment [[Back to Top](#table-of-contents)]

Our testing relies on three main testing tools ran in a NodeJS environment. These three tools are:

1. Jest: [https://jestjs.io/](https://jestjs.io/)
	1. Jest is a simple assertion-based JavaScript testing framework created by Facebook Open Source.
2. Enzyme: [https://airbnb.io/enzyme/](https://airbnb.io/enzyme/)
	1. Enzyme is a testing library that provides a way to mount, render, and interact React components in a Node environment.
3. Supertest: [https://github.com/visionmedia/supertest](https://github.com/visionmedia/supertest)
	1. Supertest is an ExpressJS HTTP testing library that provides a way to test our server function by calling API endpoints.

## 2.4 User Acceptance Test Plan

Our plan for user acceptance testing is to lead the user through a series of questions designed to test the usability of the system. The user will only be asked to complete a simple task and given no instruction on how to complete the task. After they have completed the series of leading questions, they will be given a Google Quiz to determine how successful they were in completing the questions, systematically ask for any comments on additions or problems in the software, and determine usability.

User Acceptance Test Questions:
* Log-in Page
	* Can you log in using your google account?
* Home Page
	* Can you create a new campaign?
	* Can you find and access an old campaign?
	* Can you find the profile page and how to log out?
* Profile Page
	* Can you navigate to the profile page?
	* Can you add a short bio to your profile?
* Tools
	* Can you add a new tool to your layout?
	* When there is no tool opened yet?
	* When there is already a tool open?
	* Dice Roller
		* Can you open the dice tool?
		* Can you roll 1d20 die?
		* Can you roll 2d20 dice?
		* Can you roll 1d10 dice?
	* Character
		* Can you open the character tool?
		* Can you create a new PC?
		* Can you create a new NPC?
		* Can you view the PC character profile you just created?
		* Can you change the name of this character?
		* Can you change the stats of this character?
			* level
			* class
			* race
			* concentration
			* dexterity
			* intelligence
			* wisdom
			* charisma
			* strength
			* health
			* speed
			* AC
		* Can you view the proficiencies of this character?
		* Can you add a proficiency for this character?
		* Can you view the class features for this character?
		* Can you view the spells for this character?
		* Can you add a spell for this character?
		* Can you view the spells for this character?
		* Can you add a piece of equipment for this character?
		* Can you view the appearance of this character?
		* Can you change the appearance of this character?
			* age
			* height
			* weight
			* hair
			* skin
			* physical description
		* Can you view the backstory 
		* Can you change the backstory of your character?
		* Can you go back to the character menu?
		* Can you view the NPC that you have created?
		* Can you go back to the character menu?
		* Can you find the settings?
		* Can you change the order that the character information is displayed?
	* Notes 
		* Can you open the notes tool?
		* Can you create a new note?
		* Can you create a new folder?
		* Can you open the note?
		* Can you change the title?
		* Can you add text to the note?
		* Can you go back to the main note menu?
		* Can you open the file?
		* Can you add a note to the file?
	* Search
		* Can you open the search tool?
		* Can you search for Animate Objects?
		* Can you search for an object that has a Material Component but no Verbal Component for the Bard class?
		* Can you search for equipment?
		* Can you search for a Backpack?
		* Can you search for Armor Category with the Subcategory Light?
		* Can you search for a class feature?
		* Can you search for Ability Score Improvement I?
	* Music
		* Can you open the music tool?
		* Do you have a Spotify account?
		* Can you log into your Spotify account?
		* Can you link one of your playlists?
		* Can you add a hotkey to your playlist?
		* Can you close the Music tool?
* Keyboard Shortcuts
	* Can you use the hotkey that you added to your playlist to control the music playing?
* Layouts
	* Can you create a new layout?
	* Can you open a previous layout?
	* Can you edit the current layouts?

# 3. Test cases

## 3.1 Calculator Input Component Unit Test

### 3.1.1 Purpose

This test suite ensures that the user can use the calculator input and enter in correct mathematical expressions and get the result.

### 3.1.2 Inputs

_None_

### 3.1.3 Expected Outputs & Pass/Fail Criteria

The component is expected to render whatever the user types into it but only call the on change hook for valid numeric input. The component is expected to compute mathematical input when the enter key is pressed and then call the on change hook. The component should fail if it calls on change for invalid (i.e. non-numerical) input values, if it does not call on change for valid input values, or if it does not compute mathematical expressions.

### 3.1.4 Test Procedure

Tests (12 total):

1. Run snapshot test
	1. Mount the component
	2. Expect the component to match the last snapshot (if this test fails, then the component was probably updated and snapshot probably needs to be deleted)
2. The component should render the correct uncontrolled default value
	1. Mount the component with no props
	2. Find the actual HTML input component
	3. Expect the rendered value of the input to be the default of 0
3. The component can be rendered with default value when uncontrolled
	1. Mount the component and pass in 9 as the value
	2. Find the actual HTML input component
	3. Expect the rendered value of the input to be the given value of 9
4. The component can run in an uncontrolled environment
	1. Mount the component with no props
	2. Find the actual HTML input component
	3. Expect the value to be the default of 0
	4. Simulate an event in which the user sets the text to a non numeric value
	5. Expect that the input renders that non numeric text
5. The component will call the on change method
	1. Create the mock function to monitor the on change function
	2. Mount the component and pass in the mock as the onChange function
	3. Find the actual HTML input component
	4. Simulate an event in which the user changes the input value to the number 20
	5. Expect that the on change function was called and the value of the input was passed into it
6. The component wont call the on change method when non-numeric text is entered
	1. Create the mock function to monitor the on change function
	2. Mount the component and pass in the mock as the onChange function
	3. Find the actual input component
	4. Simulate an event in which the user changes the text to a non numeric value
	5. Expect that the on change function was not called
7. The component will not call the on change function if the input blurs with an invalid value
	1. Create the mock function to monitor the on change function
	2. Mount the component and pass in the on change function
	3. Find the actual input component
	4. Simulate an on blur event in which the value of the input is non numeric
	5. Expect that the on change function wasn't called
8. The component will call the on change function if the input blurs with a valid numeric value
	1. Create the mock function to monitor the on change function
	2. Mount the component and pass in the mock function
	3. Find the actual input component
	4. Simulate a blur event in which the input blurs with a value of 20
	5. Expect that the onChange function was called
9. The component will set the input back to zero when the user presses enter with a non mathematical value
	1. Create the mock function to monitor the on change function
	2. Mount the component
	3. Find the actual input component
	4. Simulate an event in which the user changes the input to non numeric text
	5. Expect the input to be rendered with a value of the non numeric text
	6. Simulate an event in which the user presses the enter key
	7. Expect that the rendered value of the input is falsy
10. The component wont call the on change function if the input has a valid mathematical expression
	1. Create the mock function to monitor the on change function
	2. Mount the component
	3. Find the actual input component
	4. Simulate an event in which the user changes the input to '2 + 2'
	5. Expect that the on change function was not called
	6. Expect that the input renders the text '2 + 2'
11. The component will calculate the given mathematical expression when enter is pressed
	1. Create the mock function to monitor the on change function
	2. Mount the component
	3. Find the actual input component
	4. Simulate an event in which the user changes the input to '2 + 2' and then presses the enter key
	5. Expect the on change function to be called with the computed value of 4 and render the value in the input
	6. Simulate an event in which the user changes the input to '2+ 2' and then presses the enter key (this is to ensure that the parsing of the numbers do not rely on whitespace and this test only needs to be done once)
	7. Expect the on change function to be called with the computed value of 4 and render the value in the input
	8. Simulate an event in which the user changes the input to '2+2' and then presses the enter key (again, this is to ensure that the parsing of the numbers do not rely on whitespace)
	9. Expect the on change function to be called with the computed value of 4 and render the value in the input
	10. Simulate an event in which the user changes the input to '2 * 2' and then presses the enter key
	11. Expect the on change function to be called with the computed value of 4 and render the value in the input
	12. Simulate an event in which the user changes the input to '2 / 2' and then presses the enter key
	13. Expect the on change function to be called with the computed value of 1 and render the value in the input
	14. Simulate an event in which the user changes the input to '3 - 2' and then presses the enter key
	15. Expect the on change function to be called with the computed value of 1 and render the value in the input
12. The component will calculate the given mathematical expression when the input blurs
	1. Create the mock function to monitor the on change function
	2. Mount the component
	3. Find the actual input component
	4. Simulate an event in which the input blurs with a value of '2 + 2'
	5. Expect the on change function to be called with the computed value of 4 and render the value in the input

## 3.2 Title Component Unit Test

### 3.2.1 Purpose

This test suite ensures that the Title component can be used to display headings with the option to have components displayed on either side.

### 3.2.2 Inputs

* The content of the title (String), passed in as a child to the component
* The left component (React Node), passed in as a prop
* The right component (React Node), passed in as a prop

### 3.2.3 Expected Outputs & Pass/Fail Criteria

This component is expected to render the content passed in as a child and the left and right component when given. The component fails the test if the content is not rendered properly or if the left or right component is not rendered correctly.

### 3.2.4 Test Procedure

Tests (6 total)

1. The component should render the component
	1. Mount the component
	2. Expect that the component matches the snapshot we have of it
2. The component should render the correct text
	1. Mount the component
	2. Expect the component to have exactly one non-null child
	3. Expect that the component text matches the one we pass down through children
3. The component should render the left hand component
	1. Declare the left hand component to be passed down through the props
	2. Mount the Title component with the left hand component
	3. Expect that the title has exactly two non-null children (the text and the left hand component)
	4. Expect that the first non-null component is the leftComponent (to ensure that the left hand component is rendered on the left side)
	5. Expect that the second non-null child is the title text
	6. Expect that the left hand component is actually rendering properly to the user
4. The component should render the right hand component
	1. Declare the right hand component to be passed through the props
	2. Mount the title component and pass in the right hand component
	3. Expect the title component to have exactly two non-null children
	4. Expect that the first non-null child is the title text
	5. Expect that the second non-null child is the right hand component
	6. Expect that the right hand component is rendering it's children properly
5. The component should render both right hand and left hand component
	1. Declare the right hand component to be passed in to the Title
	2. Declare the left hand component to be passed in to the Title
	3. Mount the Title component with the left and right hand components passed in through the props
	4. Expect that the component has exactly three non-null children
	5. Expect the first non-null child is the left hand component
	6. Expect that the second non-null child is the title text
	7. Expect the third non-null child is the right hand component
	8. Expect the right hand component to render it's children
	9. Expect the left hand component to render it's children
6. The component inherits className from props
	1. Mount the component and pass in the className
	2. Expect the root node to have the className passed to the Title component

## 3.3 Character Tool Integration Test

### 3.3.1 Purpose

This test suite ensures that the user is able to edit and retrieve character information given that 

### 3.3.2 Inputs

The component must be passed the following props

```js
{
	campaignID: 1,
	setTabName: jest.fn(),
	insertPaneIntoPanel: jest.fn(),
	width: 600,
	height: 600,
	pane: new Pane({ type: 'character' })
}
```

### 3.3.3 Expected Outputs & Pass/Fail Criteria



### 3.3.4 Test Procedure

Initial Setup:

The global window.fetch (used to make HTTP requests) must be mocked to return deterministic 'api' results with the following configuration:

```js
[
	{
		url: '/api/search/.+',
		GET: {
			status: 200,
			responseBody: [],
		},
	},
	{
		url: '/api/campaigns/(\\d)/characters/(\\d)',
		GET: {
			status: 200,
			getResponseBody: (url, options, matches) => {
				return characters[matches[2]];
			}
		},
		POST: {
			status: 200,
			responseBody: {},
			callback: (url, options) => {
				updateCharacter(JSON.parse(options.body));
			}
		}
	},
	{
		// Define our GET /api/campaigns/:campaignID/characters route to return the 'saved characters'
		url: '/api/campaigns/(\\d)+/characters',
		GET: {
			status: 200,
			responseBody: characters,
		}
	},
	{
		// Define our GET and POST routes for /api/campaigns/:campaignID/tool-settings/characterTool
		// To return and set the character tool's settings. If the campaign id is 1, then return
		// the constant tool settings object, if not, return whatever is stored in tool settings
		// The post request sets the cached tool settings
		url: '/api/campaigns/(\\d)+/tool-settings/characterTool',
		GET: {
			status: 200,
			getResponseBody: (url, options, matches) => {
				if (matches[1] === '1') {
					return presetToolSettings;
				} else {
					return toolSettings;
				}
			},
		},
		POST: {
			status: 200,
			callback: (url, options) => {
				const { value } = JSON.parse(options.body);
				setToolSettings(value);
			},
			responseBody: {}
		}
	}
];
```

Tests (9 total):

1. The component should render the component
	1. Mount the component
	2. Expect the component to match the saved snapshot
2. The component should render the list view first
	1. Mount the component
	2. Expect that no errors have been raised
	3. Expect that the character list is found
	4. Expect that the character display is not found
	5. Expect that the tool settings is not found
3. The component should retrieve the tool settings when the component mounts or post the default character tools
	1. Mount the component but we don't need to store it
	2. Wait for the tool orderings to set in the state of the component
	3. Expect that the GET request was made to the tool requests route
	4. Expect that no POST request was made (because campaign 1 has saved tool settings for character tool)
	5. Clear all of the mock data for window.fetch so we aren't getting calls from the first mount
	6. Mount another campaign (id = 2) with no saved tool requests
	7. Wait for the tool orderings to set in the state of the component
	8. Expect that the 'server controller' method was called to save the new tool settings
4. The component Expect that two lists are rendered (one for npcs and one for pcs)
	1. Mount the component into the DOM
	2. Expect that there are two Lists
5. The component renders three PC characters rendered and one NPC rendered in the list view
	1. Mount the component into the DOM
	2. Find the character list component
	3. Wait for the characters to be loaded
	4. Get the PC list (it's the first list rendered)
	5. Get the NPC list (it's the second list rendered)
	6. Expect that the PC list renders three children
	7. Expect that the NPC list renders one child
6. The component changes to the character display when a character is clicked
	1. Mount the component into the DOM
	2. Get the character list component
	3. Wait for the characters to be loaded from the API
	4. Get the PC list
	6. Find the first list item
	7. Simulate a click on the list item
	8. Wait for the component to switch to the display view
	9. Update the component after the state change
	10. Expect that the character list is not found in the component
	11. Expect that the character display is found in the component
	12. Expect that the tool settings is not found in the component
7. The component will load a character by default
	1. Set the pane object with stored component state
	2. Mount the component with the custom pane object
	3. Wait for the character to be loaded
	4. Update the component so that it's render matches the state
	5. Expect that the character display is rendered
8. The component will go to settings page and edit settings properly and return to list view
	1. Mount the component
	2. Find the button that navigates to settings
	3. Wait for the component to load the tool settings
	4. Click the settings button
	5. Update the component
	6. Expect that the component is showing the settings view
	7. Clear the mock for the 'server controller' function that updates tool settings
	8. Simulate an event where the user swaps orderings zero and one Note: We do not need to simulate the drag and drop interaction because it is handled by the sortable item component which is it's own unit and should be tested separately
	9. Wait for the 'server controller' function to be called
	10. Expect that it was called
	11. Expect that the first section in the updated orderings array is 'classInfo'
	12. Expect that the second section in the updated orderings array is 'proficiencies'
	13. Find the button that navigates back to the character list
	14. Click it
	15. Update the component to reflect the change in state
	16. Expect that the component is back at the character list view
9. The component will let the user edit character data
	1. Set the pane object with stored component state (to begin with the character panel)
	2. Mount the component with the custom pane object
	3. Wait for the character to be loaded
	4. Find the blueprint editable text component
	5. Find the div that needs to be focused
	6. Simulate the focus event on the div
	8. Simulate an change event on the input element
	10. Expect that the function was called
	11. Expect that the function was called with the updated value

# 4. Addicational Material

## 4.1 Apendix A. Test technologies [[Back to Top](#table-of-contents)]

### 4.1.1 Test Results
