<p style="font-size: 22pt; text-align: center; margin: 0;">Software Requirements Specification</p>
<p style="font-size: 22pt; text-align: center; margin: 0;">Campaign Buddy</p>
<p style="font-size: 22pt; text-align: center; margin: 0;">Document Version: 1.0</p>
<p style="font-size: 22pt; text-align: center; margin: 0;">Date: January 31, 2019</p>
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
| 1.0     | Joseph Stewart  | Initial version        | 2/1/2019       |

<div style="page-break-after: always;"></div>

# Signatures of Approval

<div style="page-break-after: always;"></div>

# Table of Contents

1. [Introduction](#1-introduction)
   1. [Product Overview](#1-1-product-overview-back-to-top-)
2. [Specific Requirements](#2-specific-requirements)
   1. [External Interface Requirements](#2-1-external-interface-requirements-back-to-top-)
      1. [User Interfaces](#2-1-1-user-interfaces-back-to-top-)
      2. [Hardware Interfaces](#2-1-2-hardware-interfaces-back-to-top-)
      3. [Software Interfaces](#2-1-3-software-interfaces-back-to-top-)
      4. [Communication Protocols](#2-1-4-communication-protocols-back-to-top-)
   2. [Software Product Features](#2-2-software-product-features-back-to-top-)
   3. [Software System Attributes](#2-3-software-system-attributes-back-to-top-)
      1. [Reliability](#2-3-1-reliability-back-to-top-)
      2. [Availability](#2-3-2-availability-back-to-top-)
      3. [Security](#2-3-3-security-back-to-top-)
      4. [Maintainability](#2-3-4-maintainability-back-to-top-)
      5. [Portability](#2-3-5-portability-back-to-top-)
      6. [Performance](#2-3-6-performance-back-to-top-)
   4. [Database Requirements](#2-4-database-requirements-back-to-top-)
3. [Additional Material](#3-additional-material)

<div style="page-break-after: always;"></div>

# 1. Introduction

## 1.1 Product Overview [[Back to Top](#table-of-contents)]

Campaign Buddy is an online interactive toolbox to assist Dungeon Masters and players to run Dungeons and Dragons (D&D) campaigns (storytelling based, roleplaying adventures played on a tabletop run by a Dungeon Master, or DM). Campaign Buddy’s purpose is to make the process of setting up, planning, and executing these campaigns simple, painless, and efficient. It is a interface that uses a collection of tools that target different aspects of running a campaign such as creating and managing players, creating maps, planning stories, keeping track of spells, items, and lore, and so on. While different implementations of these tools exist individually in various places, this tool seeks to integrate them into one convenient and customizable panel-based layout. This is important because DMs are often using multiple tools at the same time and need to be able to reference resources.

# 2. Specific Requirements

## 2.1 External Interface Requirements [[Back to Top](#table-of-contents)]

### 2.1.1 User Interfaces [[Back to Top](#table-of-contents)]

This project will utilize a web interface with a log-in screen, home screen, and the primary software interface. 

The primary software interface will be a grid of totally customizable, resizable, tabbed panels. Each tab (henceforth reffered to as *panes*), can contain application content reffered to as a *tool*. Panes can be organized in the layout by dragging them and dropping. Through this mechanism, the user can put panes inside existing panels, or in their own new panels. Users can add panels to the layout by dragging them from a toolbar above the layout. Users shall be able to save/load layout configurations as well as choose from default layout configurations (i.e. a combat mode might include an initiative tracking tool, NPC tool, map tool, and PC tool).

The home page will be where the user can create new campaigns or open an existing one. In addition, they will also be able to see assets from all of their campaigns including but not limited to player characters, non-player characters, custom items, and custom spells. They can import these assets into other campaigns so they do not have to recreate them.

In addition to the various tool-specfic functions, global functions will include a global search that will query every searchable table in the database, customizable hot-keys, and a play-time counter that lives in the toolbar. All visible global functions will take place in modals, including error messages. Error messages should be helpful, friendly, and descriptive. In general they should follow the guidlines laid out in this article: <https://medium.com/s/user-friendly/the-art-of-the-error-message-9f878d0bff80>.

The implementation of the user interface will be component-based. Meaning each conceptual unit of the interface will me self-encapsulated and maintain it's own information and only be aware of what it needs to be aware of.

![img](https://res.cloudinary.com/josephdangerstewart/image/upload/v1548986809/campaign-buddy/primary_application_interface.png "Primary Application Interface Proof of Concept")
*Primary Application Interace POC*

![img](https://res.cloudinary.com/josephdangerstewart/image/upload/v1548986809/campaign-buddy/home_page.png "Home Page Sketch")
*Home Page Sketch*

### 2.1.2 Hardware Interfaces [[Back to Top](#table-of-contents)]

Campaign Buddy is going to be built and optimized for desktop. We do not anticipate that our users would consider a mobile view *essential*. However in our research, we discovered that our users do not see it as completely useless. While most DMs tend to use their laptops for campaign management, one DM we interviewed said that he uses his phone to quickly look up information. While he admitted that the aggregative nature of the multi-paneled primary application interface would fufill this need, he said that it would still be nice to retain that functionality. So a mobile interface is not out of the question, just not a big priority as it would require a redesign of our core functionality. Though Campaign Buddy is designed for desktop screens, it must be designed for both small and large desktop screens. In order to accomodate this, we will be testing the UI on smaller desktop screen.

We have also discussed creating an entirely native mobile app that allows players to access and edit their character information but this would likely be in the product's distant future.

### 2.1.3 Software Interfaces [[Back to Top](#table-of-contents)]

As this is a component based system, we will be implementeng many encapsulated software interfaces as well as implementing many third party APIs. Below is a list of third party APIs that we will be using.

- **ReactJS**: Used for defining declaritive, encapsulated components
   - <https://reactjs.org>
- **Quill**: A customizable rich text editor
   - <https://quilljs.com/>
- **MaterialUI**: A suite of UI components that follow Google's material design
   - <https://material-ui.com/>
- **opendnd**: A suite of D&D random generation tools
   - <https://github.com/opendnd/opendnd>
- **react-dnd**: A drag and drop React component system
   - <http://react-dnd.github.io/react-dnd/about>
- **react-panelgroups**: A responsive panel layout component system
   - <https://www.npmjs.com/package/react-panelgroup>

We will also be implementing the following custom software interfaces. The UI for the specific tools are still in development

- Layout Rendering Component
   - **Description**: Responsible for managing the organizable, customizable layout state
   - **Input**: Layout state
   - **Output**: Rendered panes containing tools
   - **User Actions**: Render layout, change layout organization
   - **Uses**: ReactJS (for component definition), react-dnd (to handle drag and drop operations), react-panelgroups (to render the panels and handle resizing events)
- Toolbar Component
   - **Description**: Responsible for displaying and allowing access to global functions (settings, game timer, adding to the layout, saving/loading layouts)
   - **Inputs**: Names of all tool types, saved/default layouts
   - **Outputs**: Rendered toolbar
   - **User Actions**: Add new tool to the layout, start/stop game timer, save/load layout
   - **Uses**: ReactJS, react-dnd (to drag new tools onto the layout), MaterialUI
- Start Menu Component
   - **Description**: Responsible for handling the creation and loading of campaigns as well as providing the user access to inter-campaign assets such as Characters, custom Spells, and custom Items
   - **Inputs**: Campaigns, inter-campaign assets
   - **Outputs**: Rendered start-menu
   - **User Actions**: Open campaign, create new campaign, import asset into existing campaign
   - **Uses**: ReactJS, MaterialUI
- Dice Roller Tool
   - **Description**: Tool that allows user to roll D&D dice
   - **Inputs**: *None*
   - **Outputs**: Rendered dice rolling tool
   - **User Actions**: Role dice, change dice type, change dice count
   - **Uses**: ReactJS
- Character Sheet Tool
   - **Description**: Tool that allows user to track information about PCs and NPCs
   - **Inputs**: Type (PC vs NPC), character id
   - **Outputs**: Rendered character sheet
   - **User Actions**: Change character information
   - **Uses**: ReactJS, MaterialUI, opendnd (for random information generation)
- Search Engine Tool
   - **Description**: Tool that allows user to search different tables in the database
   - **Inputs**: Type, search value
   - **Outputs**: Rendered component with list of search results
   - **User Actions**: Change search value, view search result details, add search result to new panel
   - **Uses**: ReactJS, MaterialUI
- Note taking Tool
   - **Description**: Tool that allows user to take detailed notes about sessions
   - **Inputs**: Note id
   - **Output**: Note text
   - **User Actions**: Edit notes, reference assets following mention pattern (<https://en.wikipedia.org/wiki/Mention_(blogging)>), save notes, load notes
   - **Uses**: ReactJS, Quill (for rich text editing and asset mentions), MaterialUI

![img](https://res.cloudinary.com/josephdangerstewart/image/upload/v1549045081/campaign-buddy/20190131_185929.jpg "Layout Component Diagram")
*Layout Component Diagram*

### 2.1.4 Communication Protocols [[Back to Top](#table-of-contents)]

The project will have a three tier architecture. This means that there will be a database layer that stores and manages the data, a application layer that manages API calls and serves static content, and a client layer for the user-interface. The client layer will communicate with the application layer over HTTP for static web content, using the RESTful API pattern when needing dynamic content. When necessary, the application layer will communicate with the database layer over TCP using MySQL's own custom protocol.

![img](https://res.cloudinary.com/josephdangerstewart/image/upload/v1548986810/campaign-buddy/scm.jpg "Software Communication Model")
*A model of the communication between the three tiered architecture*

Data synchronization between client and database will be handled by the individual components. The general pattern is as follows:

1. The client will ask for the static page and associated scripts containing component definitions
2. The applciation server sends the static content back to the client
3. The client loads a component that requires synchronized data (i.e. a tool in a pane)
4. The component asks the server for relevant data and renders a loading state in the meantime
5. The application server queries the database and sends relevant data back to client
6. The component re-renders with the data returned in the respones
7. The user makes a change to synchronized data in the component
8. The component sends the change to the application server which makes it in the database and returns the updated data
9. If the change was made successfully, the component re-renders with the updated data, otherwise it dismisses the change

![img](https://res.cloudinary.com/josephdangerstewart/image/upload/v1548986810/campaign-buddy/csrm.jpg "Component Server Relationship Model")
*A model for data synchronization*

## 2.2 Software Product Features [[Back to Top](#table-of-contents)]

### 2.2.1 Customizable Layout 

#### 2.2.1.1 Description and Priority

Priority: <span style="color:red">very high</span>

The customizable layout is what separates Campaign Buddy from any other campaign management tool conglomorate on the internet. It is the mechanism through which the DM can use many different tools at once in an convenient manner. Tools are organized on the screen in terms of tabbed panels (each tab containing a running tool). The user can organize and resize panels by dragging and dropping tabs. They can save/load certain configurations of panels/tools in order to get quick access to them when they need it. The layout feature is comprised of the actual Layout Rendering Component and the Toolbar Component and their documented interactions.

#### 2.2.1.2 Sitmulus/Response Sequences

User interaction with this feature is as follows:

- User drags existing tool into existing panel
   - Target panel inserts dragged tool at the end of it's tabs
- User drags existing tool next to, above, or below existing panel
   - Layout engine inserts tool in a new panel next to, above, or below target panel
- User saves current layout
   - System prompts user to name the layout configuration
   - API request is made and relevant data is changed in the database
   - Toolbar adds the new layout configuration to the database
- User loads new layout
   - Layout engine replaces existing layout with target layout

#### 2.2.1.3 Functional Requirements

This feature needs to...
- Communicate with the application server in order to save and retrieve layout configurations
- Serialize/deserialize the layout configuration model into a data format suitable to be stored in the database.
- Interpret and render layout data

### 2.2.2 PC Sheet

#### 2.2.2.1 Description and Priority

The Player Character (PC) Sheets are esstental to D&D roleplaying and as such the DM has to reference them most of the time in order to ensure consitency in storytelling. The PC Sheet is a high priority feature in the project.

#### 2.2.2.1 Sitmulus/Response Sequences

* Display chacter info and background
* Edit Charcter info

#### 2.2.2.2 Functional Requirements

TBD

### 2.2.3 NPC Sheet 

#### 2.2.3.1 Description and Priority

The Non-Player Character (NPC) Sheets are esstental to D&D roleplaying and as such the DM has to reference them most of the time in order to ensure consitency in storytelling. The NPC Sheet is a high priority feature in the project.

#### 2.2.3.2 Sitmulus/Response Sequences

* Display chacter info and background
* Edit Charcter info

#### 2.2.3.3 Functional Requirements

TBD

## 2.3 Software System Attributes [[Back to Top](#table-of-contents)]

### 2.3.1 Reliability [[Back to Top](#table-of-contents)]

### 2.3.2 Availability [[Back to Top](#table-of-contents)]

### 2.3.3 Security [[Back to Top](#table-of-contents)]

TBD

### 2.3.4 Maintainability [[Back to Top](#table-of-contents)]

Campaign Buddy should be maintainable as more spells, items, and functions of D&D are added or removed over time. 

### 2.3.5 Portability [[Back to Top](#table-of-contents)]


### 2.3.6 Performance [[Back to Top](#table-of-contents)]

Performance is curital to this project or else it would defeat the purpose of using Campaign Buddy over paper. Since the DM needs to be able to retreave information as quickly as possible in order to be fluid in stroytelling the database calls should take less than half a second. 

## 2.4 Database Requirements [[Back to Top](#table-of-contents)]

Most of the project info will be stored and managed in a SQL database that contains info such as character stats and descriptions, classes, races, spells, items, lore, sounds, plot points, locations, etc. 

# 3. Additional Material
