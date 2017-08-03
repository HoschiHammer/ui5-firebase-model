# UI5-firebase-model

An *UI5 model backed by a Firebase realtime database from Google.

[![Basic demo video](https://img.youtube.com/vi/MsanBYsAeR4/0.jpg)](https://www.youtube.com/watch?v=MsanBYsAeR4)

# Please check the dev branch. No master release yet. Thanks


## Why?

The Firebase realtime database is awesome. It allows painless realtime updates between all clients using the same database.
Creating a solid UI5 model backed by a firebase DB provides some nice capabilities to UI5 apps:
 - Easy prototyping for UI5 apps. We all know how hard it is to have a read-_write_ backend for an UI5 app. MockServer/OData servers are a pain to setup.
 - Easy realtime updates. Even if you have an app that uses mostly OData you can still embed a FirebaseModel and have a section of the data synced automatically.
 
## Status

This project is **VERY** early stage. The basic demo works as you see in the video but there's a lot more to be done. Namely:
 - Write unit tests - that pass :)
 - Dynamically dealing with firebase authentication. (maybe create a few methods on the model for this).
 - Exposing more capabilities of firebase
 - Make it work for the tree bindings.
 - Coordinate with the UI5 community to make this easily accessible through package managers (ui5lab.io ?)
 

## Getting started

1. Install node.js (get it from [nodejs.org](http://nodejs.org/)).
 * If working behind a proxy, you need to configure it properly (HTTP_PROXY / HTTPS_PROXY / NO_PROXY environment variables)

2. Clone the repository and navigate into it
```sh
git clone https://github.com/jumpifzero/ui5-firebase-model
cd ui5-firebase-model
```
3. Install all npm dependencies (also installs all bower dependencies)
```sh
npm install
```

4. Run npm start to lint, build and run a local server (have a look into `Gruntfile.js` to see all the tasks).
```sh
npm start
```

5. Open a test page in your browser: [http://localhost:8080/test-resources/openui5/community/model/firebase/index.html](http://localhost:8080/test-resources/openui5/community/model/firebase/index.html)

6. You will see some errors in the browser console PERMISSION_DENIED. This is because the firebase db being used is not active.

## More help
You can see a sample app that uses this model at [https://github.com/jumpifzero/ui5-firebase-model-samples](https://github.com/jumpifzero/ui5-firebase-model-samples)

## Technicals

In the current implementation FirebaseModel is an extension of the JSONModel. 
Check files under test/ on how to use.

## Testing this for yourself / developing
If you fire up the index.html on any local server it will not work because I've disabled the updates to the firebase DB. To create your own, do the following:
 - Go into [https://console.firebase.google.com](https://console.firebase.google.com) with your Google login.
 - Create a _project_
 - Press _Add firebase to your web app_. This will provide you with a brand new set of tokens (apiKey, senderId, databaseURL, etc.) needed to interact with a database.
 - Replace these values in the test/.../index.html (or your firebase initialization code)
 - Go into _Authentication_ > Sign-in method and Enable _Anonymous_
 

## How to use this in your app
Check project [https://github.com/jumpifzero/ui5-firebase-model-samples](https://github.com/jumpifzero/ui5-firebase-model-samples)

## PRs welcomed!
