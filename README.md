# TWITTER_HELPDESK

- This repository contains code which for TWITTER_HELPDESK POC.
- This application allows you to view the tweets targeted at you and allows you you to reply to them directly from the webapp.

## FEATURES
- Front end is built in Angular8 & Backend is built in NodeJS(Express)
- Uses MongoDB for data storage
- Uses Redis for session management
- User side authentication is implemented using JWT Authentication
- From inside the App user can authenticate himself to twitter using the 3 Legged OAuth Flow which is        required by twitter

## Instruction to run the project
- Make sure MongoDB and Redis is installed & both the instances are running
- then go to the project directory and run below commands
- cd client && npm install && npm run build 
- cd ../server && npm install && node app.js

*** Wont work on local as the twitter app credentials are kept private and added directly to the production environment

## Workflow
- Register on the webapp
- Then Login using your credentials which you have used for registeration
- Click on connect to twitter button
- Sign in using your twitter credentials a messenger window will open
- Select a Tweet to reply to from the tweet list on the left side and reply to it. The reply should be visible to the user who sent you the original message

