<p style="font-size: 22pt; text-align: center; margin: 0;">Software Requirements Specification</p>
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
| 1.0     | Joseph Stewart  | Initial version        | 2/1/2019       |
| 2.0     | Joseph Stewart  | Software System Attributes | 2/1/2019   |
| 3.0     | Joseph Stewart  | Database Requirements and ER Diagram | 2/1/2019 |

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
   1. [Product Overview](#1-1-product-overview-back-to-top-)
2. [Specific Requirements](#2-specific-requirements)
   1. [External Interface Requirements](#2-1-external-interface-requirements-back-to-top-)
      1. [User Interfaces](#2-1-1-user-interfaces-back-to-top-)
      2. [Hardware Interfaces](#2-1-2-hardware-interfaces-back-to-top-)
      3. [Software Interfaces](#2-1-3-software-interfaces-back-to-top-)
      4. [Communication Protocols](#2-1-4-communication-protocols-back-to-top-)
   2. [Software Product Features](#2-2-software-product-features-back-to-top-)
      1. [Customizable Layout](#2-2-1-customizable-layout-back-to-top-)
      2. [Player/Non-Player Character Tracking](#2-2-2-player-non-player-character-tracking-back-to-top-)
      3. [Local and Global Asset Searching](#2-2-3-local-and-global-asset-searching-back-to-top-)
      4. [Note Taking and Story/Session Planning](#2-2-4-note-taking-and-story-session-planning-back-to-top-)
      5. [Map Making and Location Tracking](#2-2-5-map-making-and-location-tracking-back-to-top-)
   3. [Software System Attributes](#2-3-software-system-attributes-back-to-top-)
      1. [Reliability](#2-3-1-reliability-back-to-top-)
      2. [Availability](#2-3-2-availability-back-to-top-)
      3. [Security](#2-3-3-security-back-to-top-)
      4. [Maintainability](#2-3-4-maintainability-back-to-top-)
      5. [Portability](#2-3-5-portability-back-to-top-)
      6. [Performance](#2-3-6-performance-back-to-top-)
	  7. [Supportability](#2-3-7-supportability-back-to-top-)
   4. [Database Requirements](#2-4-database-requirements-back-to-top-)

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

In addition to the various tool-specific functions, global functions will include a global search that will query every searchable table in the database, customizable hot-keys, and a play-time counter that lives in the toolbar. All visible global functions will take place in modals, including error messages. Error messages should be helpful, friendly, and descriptive. In general they should follow the guidelines laid out in this article: <https://medium.com/s/user-friendly/the-art-of-the-error-message-9f878d0bff80>.

The implementation of the user interface will be component-based. Meaning each conceptual unit of the interface will me self-encapsulated and maintain it's own information and only be aware of what it needs to be aware of.

![img](https://res.cloudinary.com/josephdangerstewart/image/upload/v1548986809/campaign-buddy/primary_application_interface.png "Primary Application Interface Proof of Concept")
*Primary Application Interface POC*

![img](https://res.cloudinary.com/josephdangerstewart/image/upload/v1548986809/campaign-buddy/home_page.png "Home Page Sketch")
*Home Page Sketch*

### 2.1.2 Hardware Interfaces [[Back to Top](#table-of-contents)]

Campaign Buddy is going to be built and optimized for desktop. We do not anticipate that our users would consider a mobile view *essential*. However in our research, we discovered that our users do not see it as completely useless. While most DMs tend to use their laptops for campaign management, one DM we interviewed said that he uses his phone to quickly look up information. While he admitted that the aggregative nature of the multi-paneled primary application interface would fulfill this need, he said that it would still be nice to retain that functionality. So a mobile interface is not out of the question, just not a big priority as it would require a redesign of our core functionality. Though Campaign Buddy is designed for desktop screens, it must be designed for both small and large desktop screens. In order to accommodate this, we will be testing the UI on smaller desktop screen.

We have also discussed creating an entirely native mobile app that allows players to access and edit their character information but this would likely be in the product's distant future.

### 2.1.3 Software Interfaces [[Back to Top](#table-of-contents)]

As this is a component based system, we will be implementing many encapsulated software interfaces as well as implementing many third party APIs. Below is a list of third party APIs that we will be using.

- **ReactJS**: Used for defining declarative, encapsulated components
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
- Global Search
   - **Description**: Responsible for searching the entire database and returning results
   - **Inputs**: Search value
   - **Outputs**: Names of search results organized by asset type
   - **User Actions**: Search, add result asset to layout
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
- Local Search Engine Tool
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
*Layout component diagram*

![img](https://res.cloudinary.com/josephdangerstewart/image/upload/v1549068893/campaign-buddy/main-screen.png "Main Screen")
*Main screen UI sketch*

### 2.1.4 Communication Protocols [[Back to Top](#table-of-contents)]

The project will have a three tier architecture. This means that there will be a database layer that stores and manages the data, a application layer that manages API calls and serves static content, and a client layer for the user-interface. The client layer will communicate with the application layer over HTTP for static web content, using the RESTful API pattern when needing dynamic content. When necessary, the application layer will communicate with the database layer over TCP using MySQL's own custom protocol.

![img](https://res.cloudinary.com/josephdangerstewart/image/upload/v1548986810/campaign-buddy/scm.jpg "Software Communication Model")
*A model of the communication between the three tiered architecture*

Data synchronization between client and database will be handled by the individual components. The general pattern is as follows:

1. The client will ask for the static page and associated scripts containing component definitions
2. The application server sends the static content back to the client
3. The client loads a component that requires synchronized data (i.e. a tool in a pane)
4. The component asks the server for relevant data and renders a loading state in the meantime
5. The application server queries the database and sends relevant data back to client
6. The component re-renders with the data returned in the response
7. The user makes a change to synchronized data in the component
8. The component sends the change to the application server which makes it in the database and returns the updated data
9. If the change was made successfully, the component re-renders with the updated data, otherwise it dismisses the change

![img](https://res.cloudinary.com/josephdangerstewart/image/upload/v1548986810/campaign-buddy/csrm.jpg "Component Server Relationship Model")
*A model for data synchronization*

## 2.2 Software Product Features [[Back to Top](#table-of-contents)]

Product backlog: <https://docs.google.com/spreadsheets/d/1cAOoTEeiA5veIspgffNhoHeH7TcfESVLh8ZbSqb8ZbQ/edit?usp=sharing>

### 2.2.1 Customizable Layout [[Back to Top](#table-of-contents)]

#### 2.2.1.1 Description and Priority

Priority: *very high*

The customizable layout is what separates Campaign Buddy from any other campaign management tool conglomerate on the internet. It is the mechanism through which the DM can use many different tools at once in an convenient manner. Tools are organized on the screen in terms of tabbed panels (each tab containing a running tool). The user can organize and resize panels by dragging and dropping tabs. They can save/load certain configurations of panels/tools in order to get quick access to them when they need it. The layout feature is comprised of the actual Layout Rendering Component and the Toolbar Component and their documented interactions.

#### 2.2.1.2 Stimulus/Response Sequences

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

### 2.2.2 Player/Non-Player Character Tracking [[Back to Top](#table-of-contents)]

#### 2.2.2.1 Description and Priority

Priority: *high*

NPCs are the backbone of a good campaign. It is the only tool that a DM has for interacting with the players in the game world and moving the story along. Therefore it is quintessential for the DM to be able to have constant access to NPC information such as stats, abilities, and notes. The DM also needs consistent access to player character information and it breaks the flow of the campaign if they are constantly asking their players for their stats. It is essential for the DM to keep accurate character information that is easily accessible and updatable on their end. DMs should be able to track every detail of a character. These character details are listed below. Information that can be derived from other information should not be explicitly stored in data, nor should it be explicitly editable. This feature is implemented as a tool that can be added or removed from the layout system.

- Six core stats (Str, Dex, Con, Int, Wis, Cha)
- Level
- Class
- Race
- Current Health
- Max Health
- Speed
- Proficiency bonus (Derived from class and level)
- Features/Abilities
- Inventory
- Spells
- Proficiencies
- Languages
- Backstory
- Appearance (stored as an image perhaps, maybe rich text content)
- Spell attack (Derived from class and skill points)
- Spell save DC (Derived from class and skill points)
- Class specific information
   - Chi
   - Sorcerer points
   - Bardic inspiration die
   - Etc.
- Relationships
- Money

Additionally, DMs will often need to create NPCs on the fly and having to come up with random NPCs can disrupt the flow of the game. Because of this, the NPC tool will need to be able to randomly generate characters.

![img](https://res.cloudinary.com/josephdangerstewart/image/upload/v1549068893/campaign-buddy/character-tool.png "Character Tool UI Sketch")
*Character tool UI sketch*

#### 2.2.2.2 Stimulus/Response Sequences

User interactions with this feature are as follows:

- User adds character tool to the layout
   - Character tool makes an API request to get names and ids of all characters
   - Application server queries database for all characters
   - Character tool renders list of characters
- User deletes a character
   - Character tool makes an API request to delete target character
   - Application server deletes character and returns result
   - Character tool re-renders
- User selects a character
   - Character tool makes an API request for target characters information
   - Application server returns data
   - Character tool render character data
- User edits a character
   - Character tool makes an API request to change data
   - Application server changes data and returns result
   - Character tool re-renders view

#### 2.2.2.3 Functional Requirements

This feature needs to...
- Communicate back and forth with application server to edit and retrieve character information
- Render character information in an organized and readable fashion
- Implement a system for editing information quickly and repeatedly
- Implement a random generation solution for character data (opendnd)
- Database implementations for storing character data and associated relationships

### 2.2.3 Local and Global Asset Searching [[Back to Top](#table-of-contents)]

#### 2.2.3.1 Description and Priority

Priority: *High*

Because the DM needs constant and quick access to various datatypes, searching is a key feature of Campaign Buddy. DMs are often juggling many things at once and as a result need to know lot's of different information at once. They don't have the time or mental capacity to be constantly switching between interfaces and systems to be looking up information. To solve this problem, Campaign Buddy plans to implement a universal searching interface. This is implemented in various searching tools with similar UIs that are responsible for searching and displaying information about a particular asset. In this way, DMs can have open an items search tool, a spells search tool, and a features search tool all at the same time allowing quick access to multiple types of information. These specialized tools are referred to as local search tools.

However, sometimes even the switching between tabs or searching for different panes is not effecient enough for a DM. Sometimes they need to think of a name and immediately see results. This is why Campaign Buddy plans to implement a global search tool that can be accessed via a keyboard shortcut. When the user enters this shortcut, they will see a search input modal that dynamically searches all tables in the database as they type and displays the names of the results below. When the user clicks on a result, it is added to the layout and focused in it's panel.

#### 2.2.3.2 Stimulus/Response Sequences

User interactions with this feature are as follows:

- User adds local search tool to the layout
   - Empty search tool of that type is added to the layout
- User types character into search
   - Tool makes API request for search result containing search value in some field
   - Application server queries database and returns results
   - Results are rendered below the search input
- User clicks on search result in local search
   - API request is made for asset details
   - Application server gets details for specific asset
   - Tool renders details in pane with a button to go back to search
- User enters keyboard shortcut
   - Global search appears on screen
- User clicks on search result from global search
   - Local search of target asset type is added to layout
   - Local search makes API request for asset details
   - Application server gets details for specific asset
   - Tool renders details in pane with a button to go back to search

#### 2.2.3.3 Functional Requirements

This feature needs to...
- Communicate with application server
- Quickly query database
- Render item data efficiently

### 2.2.4 Note Taking and Story/Session Planning [[Back to Top](#table-of-contents)]

#### 2.2.4.1 Description and Priority

Priority: *Medium*

It is important for DMs to be able keep track of where the story is going and how they are going to realize their abstract story points in each session. That is why Campaign Buddy will implement note taking and story planning systems that will aid the DM in documenting their ideas and plans for a narrative system in which player characters have autonomy of their own. This system will be realized by implementing a general note taking tool allowing the DM to make notes and mention different assets (e.g. "**@Trogdor** stole a diamond from **@Sir Bobbert**") and a story graph tool that allows the DM to plan their story in a abstracted sequence of connected events and locations.

![img](https://res.cloudinary.com/josephdangerstewart/image/upload/v1549068893/campaign-buddy/story-planning-tool.png "Story planning tool UI sketch")
*Story planning tool UI sketch*

It would be cool if the notes tool used natural language parsing (or perhaps structured syntax) to make changes to the model.

So if the user types
> The party moved to Fandalin

Then the system would set the location for all of the players to Fandalin

#### 2.2.4.2 Stimulus/Response Sequences

The user interacts with this feature as follows

- User adds note taking tool
   - Layout engine adds note taking tool to layout
   - Note taking tool makes API request for saved notes
   - Application server queries database for saved notes organized by session and returns results
   - Note taking tool renders saved notes
- User opens note
   - Note taking tool makes API request for note content
   - Applications server queries note taking server and grabs information for references from the note
   - Note taking tool renders the note and formats mentions with links
- User clicks on mention
   - Note taking tool opens mentioned asset in new tab
- User saves note
   - Tool makes request to edit note
   - Application server updates note in database
   - Application server updates note mentions in database
   - Application server returns response
   - Tool renders saved note
- User adds story planning tool
   - Layout engine adds story planning tool to layout
   - Story tool makes API request for saved story plan
   - Application server gets story plan for campaign from database
   - Story tool renders result
- User adds plot point to story graph
   - Tool makes API request to add plot point
   - Application server edits data in database
   - Tool renders updated graph
- User deletes note
   - Tool makes API request to delete note
   - App server deletes note from database
   - Tool renders saved notes

#### 2.2.4.3 Functional Requirements

This feature needs to...
- Communicate with the application server and database to save notes/story plans
- Represent, serialize, and deserialize notes and story plans
- Implement complex diagram builder

Lower priority functional requirements
- Natural language parsing
- Structured command syntax

### 2.2.5 Map Making and Location Tracking [[Back to Top](#table-of-contents)]

#### 2.2.5.1 Description and Priority

Priority: *Low*

Locations and map design are essential to a campaign. After all, characters need to be somewhere in order to do something. However, keeping track of locations and maps is often a difficult process especially if you are using a digital system to keep information synchronized. For this reason, Campaign Buddy should implement a lightweight and simple map making and location tracking feature that allows DMs to track where the players are, where NPCs are, where important encounters are, and where treasure is.

![img](https://res.cloudinary.com/josephdangerstewart/image/upload/v1549071327/campaign-buddy/map-tool.png "Map tool UI sketch")
*Map tool UI sketch*

#### 2.2.5.2 Stimulus/Response Sequences

The use interacts with the feature as follows

- User adds/edits location
   - Tool makes API request
   - App server changes data in database
   - Tool renders content

#### 2.2.5.3 Functional Requirements

This feature needs to...
- Communicate with application server
- Represent, serialize, and display map/location data
- Implement simple map/location editing interface

## 2.3 Software System Attributes [[Back to Top](#table-of-contents)]

### 2.3.1 Reliability [[Back to Top](#table-of-contents)]

Campaign Buddy needs to function reliably in high stress environments. If Campaign Buddy is not reliable, our users will grow frustrated and loose the value that they find in the system. The ability to reliability edit and access everything in one place is the core reason why someone would use our tool. If data is lost or inaccurate, it forces the user to re-input the information lost and disrupt the flow of the session. It is important that our servers do not crash so that our users are not hindered. When an exception is thrown, a handler should be implemented at the highest level to catch that exception so it doesn’t crash the system. Once that exception is detected a notification should be sent to maintainers in the form of an email or github issue being created. 

### 2.3.2 Availability [[Back to Top](#table-of-contents)]

Campaign Buddy should be available to those with previous DMing experience with the 5E system through web browser access.  We will include an HTML screen reading functionality through aria labels to accommodate those who use screen readers. To prevent eye strain and protect those with conditions such as epilepsy, we shall have color design choices that do not have extreme contrast and are easy to look at. Because D&D material is only published in English, it is doubtful we will have international users. Therefore, we will not implement solutions for varying currencies or date-time formats. This is a reference tool for DMs, meaning that it is not a tutorial in how to DM a game, so at least one game's worth of experience. It is recommended that the DM either have an experienced DM with them or have DMed one or more times before using this tool.

### 2.3.3 Security [[Back to Top](#table-of-contents)]

Possible areas of weakness in our system is custom user content rendered on a page, our RestfulAPI and other publicly accessible network features, and SQL queries with user defined data. By displaying custom user content on a page in our notes tool and in other places, we open the user up to cross-site scripting attacks. In order to prevent this, the server will implement HTML sanitization so the user cannot upload malicious scripts into the database. Through SQL queries with user defined data, the system opens itself up to SQL injection attacks in which a hacker inserts SQL code into a normal database operation. This will be prevented by sanitizing user data through a reviewed third party API. Through any publicly accessible network features, the system is opened up to a denial of service attack in which the server is spammed with requests and shut down. This will be handled through user authentication. User authentication will be handled through Google so we do not have to store potentially sensitive user information on the servers. Any other information being sent would not be considered sensitive by our users.

### 2.3.4 Maintainability [[Back to Top](#table-of-contents)]

Campaign Buddy should be maintainable as more spells, items, and functions of D&D are added or removed over time. We should implement a strong database with a strong normalization to accommodate this scenario. Strong database design is the key to adding in new entities in the future. Software component documentation will allow maintainers in the future to understand what code is supposed to be doing in an easy and readable way without having to decipher the code itself.

### 2.3.5 Portability [[Back to Top](#table-of-contents)]

This system is a website which can be accessed via a computer that can connect to the internet. They shall navigate our system using a combination of point and click, hot keys, drag and drop, and text entry. The material provided by our system is typically used for quick references and isn't required if a DM is pacing while managing their game. One DM is connected with one campaign and player view is yet to be an option, so one person can log in to view a given campaign at a given time. This is not available on mobile device.

### 2.3.6 Performance [[Back to Top](#table-of-contents)]

Performance is crucial to this project or else it would defeat the purpose of using Campaign Buddy over paper. Since the DM needs to be able to retrieve information as quickly as possible in order to be fluid in storytelling the database calls should take less than half a second.

### 2.3.7 Supportability [[Back to Top](#table-of-contents)]

For a connecting with our users and helping with the understandability of our product, we will provide a help page with details on how to use individual tools, the dynamic interface, the hot keys, as well as explain the full capabilities of the system. This will be located in a help page link placed on our home page. Error handling will come into place mainly via displaying appropriate error messages as detailed in the error handling link listed above.

## 2.4 Database Requirements [[Back to Top](#table-of-contents)]

Data will be stored in a MySQL database system according to the following business rules

- **Users** (DM) can create and open **Campaigns**
- **Campaigns** include **Characters**
- **Campaigns** include **Locations**
- **Campaigns** include **Plot Points**
- **Characters** can be **Playable** (PC) or **Non-Playable** (NPC)
- **Characters** can equip **Items**
- **Characters** can learn **Spells**
- **Characters** can use **Spells**
	- So long as they have enough available spell slots for that spell’s level
- **Characters** must have one or more **Classes**
- **Classes** have different **Features** depending on their class *type* and *level*
	- I.e. Bard level 3 gives you Bard College
- **Classes** have **Subclasses**
	- I.e. College of Lore is a subclass
- **Subclasses** also have different **Features** depending on their subclass *type* and *level*
	- I.e. College of Lore gives you the Peerless Skill feature at level 14
- **Plot Points** reference **Characters**
- **Plot Points** reference **Locations**

![img](https://res.cloudinary.com/josephdangerstewart/image/upload/v1549092187/campaign-buddy/conceptual_er_model.png "Logical ER model")
*Logical ER model*