sap.ui.require(
	[
		"firebase/FirebaseModel"
	],
	function (FirebaseModel) {
		"use strict";

        var oModel = null;

		QUnit.module("Firebase Model Tests", {
			setup: function () {
                var config = {
                    apiKey: "AIzaSyDwzmJRS2NNjL7QUe4VxS7FEwKdyAL7ZRk",
                    authDomain: "bf-ui5-firebase-show-n-tell.firebaseapp.com",
                    databaseURL: "https://bf-ui5-firebase-show-n-tell.firebaseio.com",
                    projectId: "bf-ui5-firebase-show-n-tell",
                    storageBucket: "bf-ui5-firebase-show-n-tell.appspot.com",
                    messagingSenderId: "842385210289"
                };
                // Instantiate a model with null data.
                oModel = new FirebaseModel(null, config);
                // Login to the firebase db as anonymous
                oModel.getFirebasePromise().then(function(firebase){
                    firebase.auth().signInAnonymously().catch(function(error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        // TODO: Do something. Panic is acceptable
                    });
                });
			},
			afterEach: function () {
			}
		});

        QUnit.test("Test setProperty retains the value", function(assert) {
            oModel.setProperty("/age", 99);
            assert.strictEqual(oModel.getProperty("/age"), 99, "getProperty returned the right value");
            // Read directly from firebase to make sure the data is there as well
            // This is async so we need to tell QUnit of this
            var done = assert.async();
            oModel.getFirebasePromise().then(function(firebase){
                firebase.database().ref('/age').once('value').then(function(snapshot) {
                    assert.strictEqual(snapshot.val(), 99, "firebase .once() returned the correct value");
                    done();
                })});
        });
	}
);
