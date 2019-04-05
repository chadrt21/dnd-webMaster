# dnd-webMaster
Web Interface for D&amp;D resources and character management for dungen masters

## To-Do

- **Documentation**
  - [x] Project Management Plan
  - [x] Software System Requirements document
  - [x] Product Backlog
  - [x] Software Design Description
  - [x] Add programming standards document (for commenting, naming, misc syntax perferences)
  - [x] Add guide for server-side programming
- **Prototyping/Modeling**
  - [x] Initial rough paper prototypes
  - [x] Initial database conceptual ER model
  - [x] Digital prototypes of Software Product Features detailed in SRS (In progress: Jill & Ashley)
  - [ ] Full physical ER database model (In progress: Zach & Chad)
- **Programming**
  - [x] Layout manager proof of concept
  - [x] Implement BlueprintJS in Layout PoC
  - [x] Set up ESLint to enforce programming standards
  - [x] Sprint 1
    - [x] Make tabs rearrangable in a panel
  - [x] Sprint 2 (due March 25)
    - [x] Dice Roller
    - [ ] Notes
    - [ ] Global Search
  - [ ] Sprint 3 (due April 5th)
    - [ ] Automated Rolls
    - [x] Note Folders
    - [ ] Tutorial
    - [x] Spotify Integration
- **Technical Presentation**
  - [ ] Google Slide

## Colaborators
Chad Ross: chad.ross@biola.edu
* Project Master
* Scrum Manager
* Python Back End Developer

Jillian McDaniel
* Configuration Manager
* UI Architect

Joseph
* Subject Matter Expert
* Front End Developer
* Back End Consultent

Zach
* Database Developer
* QA Manager

Ashley Cheah: ashley.m.cheah@biola.edu
* Product Owner
* UI Architect

Shared Roles: Developers, Testers

*Tasks should map nicely to Product Backlog tasks*


## Slack Group Chat
[dungeon-buddies.slack.com](dungeon-buddies.slack.com)

## Project Development Files
* [Google Doc Folder](https://drive.google.com/open?id=1OAeJDv-UKCkhTApC6I0JAv16NSvbTEsB)
* [Coding Standards](./docs/coding-standards.md)

## Github Resources
* [Github Guide](https://guides.github.com/)
* [Markdown Guide](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)

## DnD Files & Resources
* [Basic DnD Rule Book](http://media.wizards.com/2018/dnd/downloads/DnD_BasicRules_2018.pdf)
* [Dnd Stat Math](http://monkeysushi.net/gaming/DnD/math.html)
* [Player's Handbook](http://choisey.free.fr/3.5/Core/Indexed%20Player%20Handbook%20v3.5.pdf)
* [DnD Database](http://www.imarvintpa.com/DndLive/index.php)
* [RESTful DnD Databse](http://www.dnd5eapi.co/)
* [Setting Up DnD Gamemaster Screen video](https://www.youtube.com/watch?v=YRMVTmbe-Is&index=9&list=WL)
* [Orc Pub](http://www.orcpub.com/)

## How to set up project (Only needs to be done once)
* Install [NodeJS](https://nodejs.org/en/)
* Clone project
* Navigate to root project folder
* Run `npm install`
  * This step needs to be done any time new dependencies are added

## How to build the front-end
* Navigate to root project folder
* Run `npm run build`

## How to build and run MYSQL database locally
* Open `mysql workbench`
* Open `wampserver`
* Open a connection on `mysql workbench`
* Open and run `loadMaster.sql` in `mysql workbench` to set up the tables
* Open and run all sql stripts in `insert-scripts` folder
  - Run the scripts with list in its name last

## How to start the server
* Navigate to root project folder
* Run `npm run server`
  * Be sure to stop (`ctrl-c`) the server when you are done
* Go to `http://localhost:8085` in your browser
