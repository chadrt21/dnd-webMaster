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
	* `/campaigns`
		* API routes for getting and creating campaigns
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

## 3.2 Collapsible Section Unit Test

### 3.2.1 Purpose
This test suite ensures that the user can expand and collapse sections while the content remains seen and hidden respectively. 

### 3.1.2 Inputs

_None_

### 3.1.3 Expected Outputs & Pass/Fail Criteria

The component is expected to expand and collapse content specific to each section. The component should fail if a section is expanded and no content appears, or if the content fails to collapse after the user attempts to collapse the section. 

### 3.1.4 Test Procedure

Tests(4 total):

1) Run the snapshot test
	1. Mount the component
	2. Expect that the component matches the snapshot we have of it
2) The component should call change_expanded when the caret is pressed
	1. Mount the component
	2. Locate the button
	3. Simulate the click of the button
	4. Click the button
	5. Check CHANGE_EXPANDED to make sure it has been called
3) The component should expand
	1. Mount the component
	2. Check to make sure the content should not be rendered since expanded is set to false
        3. Set expanded prop to true
      	4. make sure the component expands and content should render
4) The component should collapse
	1. Mount the component
	2. Check to make sure the content should not be rendered since expanded is set to false
        3. Set expanded prop to false
	4. Make sure the component collapses and the content should not render
        

## 3.1 Create Campaigns [[Back to Top](#table-of-contents)]

### 3.1.1 Purpose

### 3.1.2 Inputs

### 3.1.3 Expected Outpus & Pass/Fail Criteria

### 3.1.4 Test Procedure

## 3.2 Create Characters [[Back to Top](#table-of-contents)]

### 3.2.1 Purpose

### 3.2.2 Inputs

### 3.2.3 Expected Outpus & Pass/Fail Criteria

### 3.2.4 Test Procedure

# 4. Addicational Material

## 4.1 Apendix A. Test technologies [[Back to Top](#table-of-contents)]

### 4.1.1 Test Results

### 4.1.2 Incident Report
