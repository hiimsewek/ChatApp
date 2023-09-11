# ChatApp

ChatApp is a simple React Native chat application that utilizes Firebase and Algolia for managing chats and searching for messages. With this application, you can communicate with other users in real-time.

## Table of contents
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Setup](#setup)
    * [Prerequisites](#prerequisites)
    * [Installation](#installation)
* [Screenshots](#screenshots)

## Features

- User login and registration
- Messages display in real time
- Private chats and group chats creation
- User search
- Light/dark mode toggle
- Cross platform

## Tech Stack

- React Native
- Expo
- Firebase
- Algolia
- React Navigation
- Formik + yup
- Typescript
- React Native Paper

## Setup

### Prerequisites
- Create a Firebase project on the Firebase Console (https://console.firebase.google.com/)
- Create an Algolia project (https://www.algolia.com/)
- Install the Search Firestore with Algolia extension in your Firebase project
- Configure the extension by providing the necessary Algolia App ID and API Key

### Installation
- Clone this repository to your local machine
~~~ 
git clone https://github.com/hiimsewek/ChatApp.git
~~~ 
- Install npm packages
~~~ 
npm install
~~~ 
- Create .env file in the project's root directory and enter your API keys there
~~~ 
FIREBASE_API_KEY = YOUR_FIREBASE_API_KEY
FIREBASE_AUTH_DOMAIN = YOUR_AUTH_DOMAIN
FIREBASE_PROJECT_ID = YOUR_FIREBASE_PROJECT_ID
FIREBASE_STORAGE_BUCKET = YOUR_FIREBASE_STORAGE_BUCKET
FIREBASE_MESSAGING_SENDER_ID = YOUR_FIREBASE_MESSAGING_SENDER_ID
FIREBASE_APP_ID = YOUR_FIREBASE_APP_ID

ALGOLIA_APP_ID = YOUR_ALGOLIA_APP_ID
ALGOLIA_SEARCH_API_KEY = YOUR_ALGOLIA_SEARCH_API_KEY
ALGOLIA_ADMIN_API_KEY = YOUR_ALGOLIA_ADMIN_API_KEY
~~~ 
- Run the application
~~~ 
npx expo start
~~~

## Screenshots

<img src="https://github.com/hiimsewek/ChatApp/assets/62641653/95577ff2-7362-4afc-a6c9-a0a2c2651973" width="45%"></img>
<img src="https://github.com/hiimsewek/ChatApp/assets/62641653/6f28e67d-ff23-4429-a37a-2b390b8a3307" width="45%"></img>
<img src="https://github.com/hiimsewek/ChatApp/assets/62641653/13d9742e-4f06-4c92-bb92-476ffb0f5659" width="45%"></img>
<img src="https://github.com/hiimsewek/ChatApp/assets/62641653/41938045-d778-435b-b89d-09674cd420b3" width="45%"></img>
<img src="https://github.com/hiimsewek/ChatApp/assets/62641653/a265fdfb-af71-4996-a711-c118345f1a47" width="45%"></img>
<img src="https://github.com/hiimsewek/ChatApp/assets/62641653/38df1061-fbfc-4dda-ab89-60b7164e4bef" width="45%"></img>
<img src="https://github.com/hiimsewek/ChatApp/assets/62641653/a8f0c9df-ad9a-4ca8-a1ca-8f8c60394213" width="45%"></img>
