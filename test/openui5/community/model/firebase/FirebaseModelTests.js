sap.ui.require(
	[
		"firebase/FirebaseModel"
	],
	function (FirebaseModel) {
		"use strict";

        var oModel = null;
        var oModel2 = null;

        var config = {
            apiKey: "AIzaSyDwzmJRS2NNjL7QUe4VxS7FEwKdyAL7ZRk",
            authDomain: "bf-ui5-firebase-show-n-tell.firebaseapp.com",
            databaseURL: "https://bf-ui5-firebase-show-n-tell.firebaseio.com",
            projectId: "bf-ui5-firebase-show-n-tell",
            storageBucket: "bf-ui5-firebase-show-n-tell.appspot.com",
            messagingSenderId: "842385210289"
        };

        jQuery.sap.log.setLevel(jQuery.sap.log.LogLevel.ALL);

		QUnit.module("Firebase Model Tests", {
			setup: function () {

                // Instantiate a model with null data.
                oModel = new FirebaseModel(config);
                // Login to the firebase db as anonymous
                var firebase = oModel.getFirebase();
                firebase.auth().signInAnonymously().catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // TODO: Do something. Panic is acceptable
                });

                // // Instantiate a second model with null data.
                // oModel = new FirebaseModel(config);
                // // Login to the firebase db as anonymous
                // oModel.getFirebasePromise().then(function(firebase){
                //     firebase.auth().signInAnonymously().catch(function(error) {
                //         // Handle Errors here.
                //         var errorCode = error.code;
                //         var errorMessage = error.message;
                //         // TODO: Do something. Panic is acceptable
                //     });
                // });

			},
			afterEach: function () {
			}
		});


        QUnit.test("Test setProperty retains the value", function(assert) {
            // Read directly from firebase to make sure the data is there as well
            // This is async so we need to tell QUnit of this
            var done = assert.async();
            var firebase = oModel.getFirebase();
            firebase.database().ref('/age').once('value').then(function(snapshot) {
                assert.strictEqual(snapshot.val(), 99, "firebase .once() returned the correct value");
                done();
            });
            oModel.setProperty("/age", 99);
            assert.strictEqual(oModel.getProperty("/age"), 99, "getProperty returned the right value");
        });


        // QUnit.test("Test two models are synced", function(assert) {
        //     var done = assert.async();
        //     oModel.getFirebasePromise().then(function(firebase){
        //         firebase.database().ref('/age').once('value').then(function(snapshot) {
        //             // The value has changed. Let's check via oModel2 if w get the same value
        //             var value2 = oModel2.getProperty("/age");
        //             assert.strictEqual(value2, 77, "The two models are in sync on a single property");
        //             done();
        //         })});
        //     oModel.setProperty("/age", 77);
        // });

        QUnit.test("Test control bindings work", function(assert) {
            // Create 2 controls. Bind the property to the same model field.
            // Update one, read the value on the other
            var oLabel1 = new sap.m.Label({
                text: '{/labelText}'
            });
            var oLabel2 = new sap.m.Label({
                text: '{/labelText}'
            });
            oLabel1.setModel(oModel);
            oLabel2.setModel(oModel);
            oLabel1.setText("some text");
            assert.strictEqual(oLabel1.getText(),
                               "some text",
                               "Control1 sees the right value");
            assert.strictEqual(oLabel2.getText(),
                               "some text",
                               "Control2 sees the right value");
            assert.strictEqual(oLabel1.getText(),
                               oLabel2.getText(),
                               "Two controls bound to the same property see the same value");
        });
	}
);
