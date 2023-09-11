# ChatApp

ChatApp is a simple React Native chat application that utilizes Firebase and Algolia for managing chats and searching for users. With this application, you can communicate with other users in real-time.

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

<img src="https://github.com/hiimsewek/ChatApp/assets/62641653/008e55ff-7d05-4aa4-924f-160dff9dd826" width="45%"></img>
<img src="https://github.com/hiimsewek/ChatApp/assets/62641653/9451e9c8-1908-4d55-bd86-d45f8f0f4c25" width="45%"></img>
<img src="https://github.com/hiimsewek/ChatApp/assets/62641653/ef68b8ae-7c2a-4c85-b286-e3e850283b3c" width="45%"></img>
<img src="https://github.com/hiimsewek/ChatApp/assets/62641653/38362647-9363-431f-8648-c1aeb34ffc05" width="45%"></img>
<img src="https://github.com/hiimsewek/ChatApp/assets/62641653/78e23a66-8620-4e4a-90d2-4e8e5a5696ad" width="45%"></img>
<img src="https://github.com/hiimsewek/ChatApp/assets/62641653/fa698eed-cbc8-4baa-ad62-611a3ca5290b" width="45%"></img>
<img src="https://github.com/hiimsewek/ChatApp/assets/62641653/1e580eed-3af1-42bf-9de1-a9c31d35802d" width="45%"></img>
