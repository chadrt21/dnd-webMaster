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

<div style="page-break-after: always;"></div>
1 INTRODUCTION

  1.1 	Product Overview

2 SPECIFIC REQUIREMENTS

  2.1 	External Interface Requirements

    2.1.1 User Interfaces

    2.1.2 Hardware Interfaces

    2.1.3 Software Interfaces

    2.1.4 Communications Protocols

  2.2 	Software Product Features

  2.3 	Software System Attributes

    2.3.1 Reliability

    2.3.2 Availability

    2.3.3 Security

    2.3.4 Maintainability

    2.3.5 Portability

    2.3.6 Performance

  2.4 	Database Requirements

3 ADDITIONAL MATERIAL

# 1. Indroduction

## 1.1 Product Overview

# 2. Specific Requirements

## 2.1 External Interface Requirements

### 2.1.1 User Interfaces

This project will utilize a web interface with a log-in screen, home screen, and the primary software interface. 

The primary software interface will be a grid of totally customizable, resizable, tabbed panels. Each tab (henceforth reffered to as *panes*), can contain application content reffered to as a *tool*. Panes can be organized in the layout by dragging them and dropping. Through this mechanism, the user can put panes inside existing panels, or in their own new panels. Users can add panels to the layout by dragging them from a toolbar above the layout. Users shall be able to save/load layout configurations as well as choose from default layout configurations (i.e. a combat mode might include an initiative tracking tool, NPC tool, map tool, and PC tool).

The home page will be where the user can create new campaigns or open an existing one. In addition, they will also be able to see assets from all of their campaigns including but not limited to player characters, non-player characters, custom items, and custom spells. They can import these assets into other campaigns so they do not have to recreate them.

In addition to the various tool-specfic functions, global functions will include a global search that will query every searchable table in the database, customizable hot-keys, and a play-time counter that lives in the toolbar. All visible global functions will take place in modals, including error messages. Error messages should be helpful, friendly, and descriptive. In general they should follow the guidlines laid out in this article: <https://medium.com/s/user-friendly/the-art-of-the-error-message-9f878d0bff80>.

The implementation of the user interface will be component-based. Meaning each conceptual unit of the interface will me self-encapsulated and maintain it's own information and only be aware of what it needs to be aware of.

![img](https://res.cloudinary.com/josephdangerstewart/image/upload/v1548986809/campaign-buddy/primary_application_interface.png "Primary Application Interface Proof of Concept")
*Primary Application Interace POC*

![img](https://res.cloudinary.com/josephdangerstewart/image/upload/v1548986809/campaign-buddy/home_page.png "Home Page Sketch")
*Home Page Sketch*

### 2.1.2 Hardware Interfaces

Campaign Buddy is going to be built and optimized for desktop. We do not anticipate that our users would consider a mobile view *essential*. However in our research, we discovered that our users do not see it as completely useless. While most DMs tend to use their laptops for campaign management, one DM we interviewed said that he uses his phone to quickly look up information. While he admitted that the aggregative nature of the multi-paneled primary application interface would fufill this need, he said that it would still be nice to retain that functionality. So a mobile interface is not out of the question, just not a big priority as it would require a redesign of our core functionality. Though Campaign Buddy is designed for desktop screens, it must be designed for both small and large desktop screens. In order to accomodate this, we will be testing the UI on smaller desktop screen.

We have also discussed creating an entirely native mobile app that allows players to access and edit their character information but this would likely be in the product's distant future.

### 2.1.3 Software Interfaces

The project is mainly going to be using Javascript and Javascript APIs such as REACT.js, Node.js, and Quill.js as well as other APIs and engines such as opendnd and DnD 5e API. 


### 2.1.4 Communication Protocols

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

## 2.2 Software Product Features

### Layout 

#### Description and Priority

Layout framework is the building block of this product to allow the dynamic framework of panels that conatin tools and resorces that a DM could use to improve the ability to fasilite the story telling of D&D. The layout is a very high priority feature in the project.

#### Sitmulus/Response Sequences

* Display panels that contain tools and resources
* Dynamically move tools and resources between panels

#### Functional Requirements

TBD

### PC Sheet

#### Description and Priority

The Player Character (PC) Sheets are esstental to D&D roleplaying and as such the DM has to reference them most of the time in order to ensure consitency in storytelling. The PC Sheet is a high priority feature in the project.

#### Sitmulus/Response Sequences

* Display chacter info and background
* Edit Charcter info

#### Functional Requirements

TBD

### NPC Sheet 

#### Description and Priority

The Non-Player Character (NPC) Sheets are esstental to D&D roleplaying and as such the DM has to reference them most of the time in order to ensure consitency in storytelling. The NPC Sheet is a high priority feature in the project.

#### Sitmulus/Response Sequences

* Display chacter info and background
* Edit Charcter info

#### Functional Requirements

TBD

## 2.3 Software System Attributes

### 2.3.1 Reliability 

### 2.3.2 Availability

### 2.3.3 Security

TBD

### 2.3.4 Maintainability

Campaign Buddy should be maintainable as more spells, items, and functions of D&D are added or removed over time. 

### 2.3.5 Portability


### 2.3.6 Performance

Performance is curital to this project or else it would defeat the purpose of using Campaign Buddy over paper. Since the DM needs to be able to retreave information as quickly as possible in order to be fluid in stroytelling the database calls should take less than half a second. 

## 2.4 Database Requirements

Most of the project info will be stored and managed in a SQL database that contains info such as character stats and descriptions, classes, races, spells, items, lore, sounds, plot points, locations, etc. 

# 3. Additional Material
