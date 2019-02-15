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

# 2. System Architectural Design

## 2.1 Chosen System Architecture [[Back to Top]](#table-of-contents)

Our chosen system architecture is a three tier web platform. We plan on hosting our production server on an Ubuntu machine owned by a2hosting.com. The server has 512MB of RAM, 20GB of disk space, and 2TB of bandwidth per month. We also plan on registering our domain name (which is still being considered) with a2hosting.com. We plan on hosting our MySQL database with the Google cloud platform. As for our client, we plan on designing for all major desktop browsers except for Internet Explorer and Microsoft Edge.

## 2.2 Discussion of Alternative Designs [[Back to Top]](#table-of-contents)

Ultimately, our system architecture is determined by our target audience. We decided not to go with a desktop client because we expect our users to be needing access to the system from multiple devices. Maybe they plan their campaigns on a desktop with plenty of desk space and then use their laptop to actually run the games. We also believe that product adoption is obtained easier through web interfaces because the user does not have to go through the extra step of downloading and installing software. Also, downloads are scarier due to security risks and may deter potential users. We decided not to do a mobile app because we recognize that most DMs plan and run campaigns from their laptop. A mobile screen is just to small to display all of the information a DM needs access to at any given moment. Also, a desktop web interface allows the user the ease of use of the layout's drag and drop interface.

## 2.3 System Interface Design [[Back to Top]](#table-of-contents)

Conceptually, we break down each layer of our three tier architecture into different components and we model the overall system interface using a user workflow diagram. The client layer of the interface is organized into visual components that are each responsible for allowing the user access to some aspect of the larger system. The application layer is organized into controllers that provide public Restful API routes for the client to modify the database. The database layer is organized into high level objects that are to be manipulated/accessed by the user. In the diagram, we identify 17 core component relationships that we believe accurately define our system interface.

![img](https://res.cloudinary.com/josephdangerstewart/image/upload/v1550186478/campaign-buddy/SDD/System_Architecture.png)

*Architecture Diagram*