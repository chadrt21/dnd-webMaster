# dnd-webMaster
Web Interface for D&amp;D resources and character management for dungen masters 

## To-Do

- **Documentation**
  - [X] Project Management Plan
  - [X] Software System Requirements document
  - [X] Product Backlog
  - [X] Software Design Description
  - [X] Add programming standards document (for commenting, naming, misc syntax perferences)
  - [X] Add guide for server-side programming
- **Prototyping/Modeling**
  - [X] Initial rough paper prototypes
  - [X] Initial database conceptual ER model
  - [X] Digital prototypes of Software Product Features detailed in SRS (In progress: Jill & Ashley)
  - [ ] Full physical ER database model (In progress: Zach & Chad)
- **Programming**
  - [X] Layout manager proof of concept
  - [X] Implement BlueprintJS in Layout PoC
  - [X] Set up ESLint to enforce programming standards
  - [x] Sprint 1 (Done: Everyone)
    - [x] Make tabs rearrangable in a panel
  - [x] Sprint 2 (Done: Everyone)
    - [x] Dice Roller
    - [x] Notes
    - [ ] ~~Global Search~~
  - [x] Sprint 3 (Done: Everyone)
    - [ ] ~~Automated Rolls~~
    - [x] Note Folders
    - [ ] Tutorial
    - [x] Spotify Integration
 - **Testing (In Progress: Everyone)**
   - [ ] [Unit Testing](https://docs.google.com/document/d/15AFLHOb4xy9iG-qlz0TzjlZtE97YU2XOEgKo05-fgHA/edit) (Chad, Jill, Zach, Ashely)
   - [ ] Integration Testing (Joseph)
   - [ ] [SUSTD](https://github.com/cross21/dnd-webMaster/blob/master/docs/sustd.md) (due on Monday April, 22)
 - **Technical Presentation**
  - [ ] [Google Slide](https://docs.google.com/presentation/d/1wWQkm94xIWWnuzm0mNO73OEhW8BNdIGIw7I1DhInYB4/edit#slide=id.p) (Due on Tuesday April, 30; Present on Thursday May, 2)

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

## How to start the server
* Navigate to root project folder
* Run `npm run server`
  * Be sure to stop (`ctrl-c`) the server when you are done
* Go to `http://localhost:8085` in your browser
