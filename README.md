# CherryTV
> logo and home page screenshot

This project showcases my frontend development skills by creating an enhanced streaming experience for YouTube videos.

## Summary

 - Overview
 - Features
 - Project Roadmap
 - Data Modeling
 - Technology Stack
 - GitHub Actions
 - Sonar
 - Monitoring
 - Prerequisites
 - Installation and Usage
 
 ## Overview
The main goal of this project is to demonstrate my ability to create a user-friendly and visually appealing streaming platform for YouTube videos. I aimed to provide users with an immersive experience while seamlessly integrating with YouTube's API.

## Features

-   **Seamless Integration:** Connecting with YouTube's API to fetch and display videos.
-   **User-friendly Interface:** Intuitive navigation and controls for an optimal user experience.
-   **Custom Styling:** Designing a visually appealing interface that enhances the viewing experience.
-   **Responsive Design:** Ensuring a consistent experience across various devices.

## Project Roadmap

To keep track of project progress and prioritize features, I've created a Trello board. You can view and participate in the project's development by visiting the Trello board [here](https://trello.com/invite/b/fq6Q8Rc8/ATTI17e04a72c159294be1195984bfbb6498A33CCB1A/cherry-tv).

## Data Modeling
The data modeling for this project is based on a simple schema:

- **User:** We store basic user information, such as name, email, and viewing preferences.
- **Series:** The category that groups many videos.
- **Videos:** We use the YouTube API to access video information. Each video is stored with details such as title, description, author, and video ID.

## Technology Stack
This project was developed using the following technologies:

- Vue 3
- Firebase
- GitHub Actions
- SonarCloud
- BetterStack

## GitHub Actions
The pipelines run as follows:
1. Tests and Lint when a MR is created
2. Deploy when a PR is merged
![image](https://github.com/lucasedferreira/cherry-tv/assets/37189868/4acb746e-44be-4d21-bf14-bdf62cb9b3f4)


## Sonar
To ensure the code quality, SonarCloud has been implemented.
![image](https://github.com/lucasedferreira/cherry-tv/assets/37189868/bced0942-f27a-42cc-8f7e-013fdbc4d68b)
A analysis is run every Pull Request and it is blocked when one or more code smell or bug is detected.
![image](https://github.com/lucasedferreira/cherry-tv/assets/37189868/055fcd8c-2595-45f6-a354-ad1b7452bf94)


## Monitoring
The Firebase Hosting has a feature that shows the usage of the app.
![image](https://github.com/lucasedferreira/cherry-tv/assets/37189868/01645be7-74bb-4224-9243-9abc3d7ea130)
However, to really monitor and check the website health, the tool [BetterStack](https://uptime.betterstack.com/) has been used. Better Stack lets you see inside any stack, debug any issue, and resolve any incident.
![image](https://github.com/lucasedferreira/cherry-tv/assets/37189868/2cb73dbd-27d8-47e7-b03c-540f299ccc2b)


## Prerequisites
Before you begin, make sure you have the following:

- Vue3 and npm installed
- Firebase API key (instructions on how to obtain one can be found [here](https://firebase.google.com/docs/projects/api-keys))
- YouTube API key (instructions on how to obtain one can be found [here](https://developers.google.com/youtube/registering_an_application))

## Installation and Usage

1.  Clone the repository: `git clone https://github.com/lucasedferreira/cherry-tv.git`
2.  Navigate to the project directory: `cd cherry-tv`
3.  Install dependencies: `npm install`
4. Configure the necessary environment variables for Firebase in the `src/firebase.js`.
5.  Replace `YOUR_API_KEY` in the `config.js` file with your YouTube API key.
6.  Run the project: `npm start`
7.  Open your browser and go to `http://localhost:8080`
