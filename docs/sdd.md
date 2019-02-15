<p style="font-size: 22pt; text-align: center; margin: 0;">Software Design Description</p>
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
| 1.0     | Joseph Stewart  | Initial version        | 2/13/2019       |

<div style="page-break-after: always;"></div>

# Signatures of Approval

- Joseph Stewart
- Ashley Cheah
- Jillian McDaniel
- Zachary Leonard
- Chad Ross

<div style="page-break-after: always;"></div>

# Table of Contents

1. Introduction
	1. Design Overview
	2. Requirements Traceability Matrix
2. System Architectural Design
	1. Chosen System Architecture
	2. Discussion of Alternative Designs
	3. System Interface Description
3. Detailed Descriptions of Components 
	1. Component-n
4. User Interface Design
	1. Description of the User Interface
	2. Screen Images
	3. Objects and Actions
5. Additional Material

# 1. Introduction

## 1.1 Design Overview [[Back to Top]](#table-of-contents)

Our software system is going to be a mostly single page web app where users can insert and organize tools into different resizable panels that each can contain different tabs. We are organizing our project using a three tier architecture with a database layer, application layer, and user interface layer. For our database layer we are using a MySQL database. For our application server, we are using NodeJS with the expressjs package for declaring HTTP routes and the mysql package to handle communication between the server and the database. For our user interface layer, we are going to be using ReactJS and fetch to communicate with the application server.

## 1.2 Requirements Traceability Matrix [[Back to Top]](#table-of-contents)

Here we model the connections between the components laid out in this document and the requirements defined in the [SRS](https://github.com/cross21/dnd-webMaster/blob/master/docs/srs.md).

![img](https://res.cloudinary.com/josephdangerstewart/image/upload/v1550270094/campaign-buddy/SDD/Requirements_Traceability_Matrix.png "Requirements Traceability Matrix")

*Requirements Traceability Matrix*

# 2. System Architectural Design

## 2.1 Chosen System Architecture [[Back to Top]](#table-of-contents)

Our chosen system architecture is a three tier web platform. We plan on hosting our production server on an Ubuntu machine owned by a2hosting.com. The server has 512MB of RAM, 20GB of disk space, and 2TB of bandwidth per month. We also plan on registering our domain name (which is still being considered) with a2hosting.com. We plan on hosting our MySQL database with the Google cloud platform. As for our client, we plan on designing for all major desktop browsers except for Internet Explorer and Microsoft Edge.

## 2.2 Discussion of Alternative Designs [[Back to Top]](#table-of-contents)

Ultimately, our system architecture is determined by our target audience. We decided not to go with a desktop client because we expect our users to be needing access to the system from multiple devices. Maybe they plan their campaigns on a desktop with plenty of desk space and then use their laptop to actually run the games. We also believe that product adoption is obtained easier through web interfaces because the user does not have to go through the extra step of downloading and installing software. Also, downloads are scarier due to security risks and may deter potential users. We decided not to do a mobile app because we recognize that most DMs plan and run campaigns from their laptop. A mobile screen is just to small to display all of the information a DM needs access to at any given moment. Also, a desktop web interface allows the user the ease of use of the layout's drag and drop interface.

## 2.3 System Interface Design [[Back to Top]](#table-of-contents)

Conceptually, we break down each layer of our three tier architecture into different components and we model the overall system interface using a user workflow diagram. The client layer of the interface is organized into visual components that are each responsible for allowing the user access to some aspect of the larger system. The application layer is organized into controllers that provide public Restful API routes for the client to modify the database. The database layer is organized into high level objects that are to be manipulated/accessed by the user. In the diagram, we identify 17 core component relationships that we believe accurately define our system interface. Client-Application layer communication will take place over HTTP using the RESTful API design pattern and Application-Data layer communication will take place over a direct MySQL connection. For communication across the UI, we will be using React callback props to provide function hooks from parent components to child components (see here: [https://reactjs.org/docs/faq-functions.html](https://reactjs.org/docs/faq-functions.html)).

![img](https://res.cloudinary.com/josephdangerstewart/image/upload/v1550186478/campaign-buddy/SDD/System_Architecture.png)

*Software Interface Diagram*

# 3. Detailed Descriptions of Components

## 3.1 Home Page [[Back to Top]](#table-of-contents)

The Home Screen is first screen that appears upon logging in. It is the central hub where the user can manage individual Campaigns and Characters. The user can also create new Campaigns, Locations, and Characters detached from a particular campaign and import them into existing ones. From here, the user can also navigate to the global settings page where they can edit hot key configurations. They can also see some of their profile information here.

## 3.2 Campaign Layout [[Back to Top]](#table-of-contents)

The campaign layout is the component that allows the user to see various tools all in one place in a clean and sleek format. The layout component is responsible for managing what active components are on the screen as well as preserving their state across re-renders. It also manages the sizes and locations of all of the panels and handles the resizing and movement of panes into existing panels or into new panels. It needs to be able to take in a layout model (see [4.3.1](#4-3-1-layout-model-back-to-top-)), interpret it, render it, and monitor it for changes both in size and organization.

## 3.3 Dice Roll [[Back to Top]](#table-of-contents)

This tool allows the user to roll many or one multiple sided die. It is a random number generator that picks a number between 1 and N, M many times. Where N is one of the following: 2, 4, 6, 8, 10, 12, 20 and M is a number greater than 0.

## 3.4 PC/NPC Character Sheet [[Back to Top]](#table-of-contents)

The Character Sheet function allows the user to view and edit information of a given non-player or player character. Specifically, the user can edit the following properties of an NPC:

- Name
- Level
- Class
- Race
- HP (Health Points)
- AC (Armor Class)
- Speed
- Base Stats
	- Strength
	- Dexterity
	- Constitution
	- Intelligence
	- Wisdom
	- Charisma
- Proficiencies
- Spells known
- Items in inventory
- Biography/Physical Description
- Other notes

## 3.5 Notes [[Back to Top]](#table-of-contents)

### MAIN NOTES

This is the main note screen where a user can choose which saved note that he or she would like to view in that panel. They can also have the option to create new notes from this page. When this component loads (or mounts), it will fetch a list of all campaign notes from the server.

### INDIVIDUAL NOTES

This screen allows the user to view each individual note itself. To see multiple notes, you will be able to open multiple tabs at one time. The user can also navigate back to the main notes page by using the back arrow. We will be using Quill for this which provides its own rich text editing system which we will incorporate into our design. Through Quill, the user will be able to highlight text, bold it, italicize it, underline it, create lists, and reference using the ‘@’ mention convention ([https://en.wikipedia.org/wiki/Mention_(blogging)](https://en.wikipedia.org/wiki/Mention_(blogging))). Notes will be saved automatically every few seconds using a debouncing technique to improve performance. Saving will be done by making an API post request to the server.

## 3.6 Search Engine [[Back to Top]](#table-of-contents)

This is a generic layout for a search engine. We hope to have several different types of searches. Specifically we are currently planning on implementing search engines for items, spells, and features. We are planning on implementing these as individual tools but we also plan on implementing a global search feature that allows the user to use all of these search engines at once.

## 3.7 Campaign Controller [[Back to Top]](#table-of-contents)

## 3.8 Searching Controller [[Back to Top]](#table-of-contents)

## 3.9 Authentication Controller [[Back to Top]](#table-of-contents)

## 3.10 Database Component [[Back to Top]](#table-of-contents)

The database component of the application is designed and implemented using MySQL. It stores the bulk of the data used to maintain and run user campaigns. This data stored includes the user details, campaign details, individual character attributes, storage for plot points and locations, spells data, equipment data, character classes, subclasses, feats, and all the respective data related to maintaining the character class information, as well as user-created notes created using the interface. Also included are user preferences and layout information.

# 4. User Interface Design

## 4.1 Description of the User Interface

### 4.1.1 Screen Images

#### 4.1.1.1 Mixed Play Example [[Back to Top]](#table-of-contents)

![img](https://res.cloudinary.com/josephdangerstewart/image/upload/v1550271709/campaign-buddy/SDD/Screenshot_60.png "Mixed Play Example")

*Mixed Play Example*

The Players Handbook uses shades of tans and beige to mimic parchment paper with highlights of green and darker reddish browns. We chose these colors to mimic the DnD Player Handbook so our Dungeon Masters would feel comfortable and familiar while using our program. The styling for the panel tabs is clean cut and easy to understand, making each panel into a screen of its own that can display many different tools containing a great variety of information. We chose these fonts for several different reasons. We chose Inknut Antique for the headers because it appears as an older script that mimics the style of published D&D materials. We chose Quatterocentro for sub-headers to separate sub-headings from headings while maintaining the style. We chose Overpass for text bodies for readability. We chose the toolbar color because it stands out from the rest of the screen while still complementing our color pallette. We also chose Quatterocentro for the text because it separates the toolbar from the rest of the text while not being a header itself. We inverted the font color for the toolbar in order to make it stand out a little bit while still staying consistent with our overall style. The profile icon allows the user to view their personal settings at any point in time via a popover. The Home button will take the user back to the home screen. The Tools button will allow the user to add tools to the layout screen. Layouts will display both preset and user saved layout options, which will also include a plus button which will allow the user to save their current layout. Settings will contain hotkeys viewing and editing, light mode and dark mode, and some other settings we have yet to determine.

#### 4.1.1.2 Home Screen [[Back to Top]](#table-of-contents)

![img](https://res.cloudinary.com/josephdangerstewart/image/upload/v1550272271/campaign-buddy/SDD/Screenshot_60_1.png "Home Screen")

*Home Screen*

We decided to go with a carousel model of information display because it compactly modularizes each dataset, so each character comes up as one complete file and is easy to visually communicate to the user. The same goes for the campaigns. We chose a cog for a settings button because it communicates its meaning in a simple icon commonly associated with settings. Users experienced with technology understand what this icon means as most software uses this icon in the same meaning. The same goes for the layout. We organized this layout with the creation buttons on the left because it mimics the Google layout, which experienced users are familiar with already. We chose Inknut Antique font for the titles to match our other layouts as well as for keeping with the appearance of an older script that mimics the style DnD holds. We chose Quatterocentro for sub-headers to separate sub-headings from headings while maintaining the style.

#### 4.1.1.3 Dice Roller [[Back to Top]](#table-of-contents)

![img](https://res.cloudinary.com/josephdangerstewart/image/upload/v1550272412/campaign-buddy/SDD/Screenshot_52.png "Dice Roller")

*Dice Roller*

We decided to put the buttons on top in the larger screens because we anticipate the user needing to change the type of dice rapidly. However, to conserve space, we hide these buttons on smaller panels. To change the number of die (as well as the number of sides in the smaller views) the user will right click and be given the option to change these variables. We used Inknut Antique for consistency amongst the header text. The most common expected panel size for this tool would be Panel 4 or Panel 3. This is why we opted for a simpler design.

#### 4.1.1.4 Main Notes [[Back to Top]](#table-of-contents)

![img](https://res.cloudinary.com/josephdangerstewart/image/upload/v1550272647/campaign-buddy/SDD/Screenshot_42.png "Main Notes")

*Main Notes*

The colors alternate between rows so that it will be easier for the eye to differentiate between different notes after full text is entered. Blurb, entered next to each of the names (e.g. NOTES_1, NOTES_2, etc.) indicates where the first line of the note will be shown so that the user will have a bit more of an understanding as to what the note contains apart from the title. This will be limited to just the first line so that the list of notes doesn't grow extremely long due to the contents of each note being displayed in this view. This view is intended just for note selection and creation, not for note editing. The plus icon will allow the user to create a new note. It will display a popup in which it will ask for the name of the note and then will open a new tab in which note editing can begin. The most common size we anticipate is the bottom right size which is still usable, but on the smaller side. This influenced the design in that it requires a streamlined design that is still easy to use and functional. To select a note to open, click on one of the titles and a new tab in that panel will display that note.

#### 4.1.1.5 Individual Notes [[Back to Top]](#table-of-contents)

![img](https://res.cloudinary.com/josephdangerstewart/image/upload/v1550272773/campaign-buddy/SDD/Screenshot_51.png)

*Individual Notes*

We made the note color a little darker than the background color to allow some contrast and to make the text feel enclosed and not freeform which appears more chaotic. You will be able to edit the notes as a typical document editing software, which displays a cursor at your current location. We will also be using Quill to run this system, which brings its own text editing software including the ability to bold, underline, italicize, bullet point, and change text size to create headings. We use the back icon in the upper right to navigate back to the main notes page. As this tab will open with the Main Notes view, we mostly anticipate all of the notes to be kept in one view under multiple tabs with a panel about the size of the bottom right panel.

#### 4.1.1.6 NPC/PC Screens [[Back to Top]](#table-of-contents)

![img](https://res.cloudinary.com/josephdangerstewart/image/upload/v1550272904/campaign-buddy/SDD/Screenshot_55.png "NPC Screen")

*NPC Screen*

### 4.1.2 Objects and Actions

#### 4.1.2.1 Layout Model [[Back to Top]](#table-of-contents)

This is the data structure through which we model and manipulate the layout. The overall object structure is like a tree where a layout is a 2 dimensional grid of panels that each store different panes (which is the direct most container for tools). However, each panel can also be another nested layout, allowing for maximum user control over what they see.

Through dragging and dropping tabs, users can alter the structure of the layout, adding/rearranging rows, panels, and panes. The user can also save their layout configuration which will export the model into a plain JSON format.

![img](https://res.cloudinary.com/josephdangerstewart/image/upload/v1550266716/campaign-buddy/SDD/Layout_Model_1.png "Layout Model")

*Layout Model*

```json
{
	"rows": [
		{ "panels": [
			{ "panes": [
				{ "type": "map" },
			] },
			{ "rows": [
				{ "panels": [
					{ "panes": [
						{ "type": "npc 1" }, { "type": "npc 2" }, { "type": "npc 3" },
					] },
				] },
				{ "panels": [
					{ "panes": [
						{ "type": "pc" }, { "type": "pc" },
					] },
				] },
			] },
		] },
	],
}
```
*Sample plain JSON layout object*

# 5. Additional Material

Our coding standards doc: [https://github.com/cross21/dnd-webMaster/blob/master/docs/coding-standards.md](https://github.com/cross21/dnd-webMaster/blob/master/docs/coding-standards.md)