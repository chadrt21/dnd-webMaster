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

# 3. Test cases

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
