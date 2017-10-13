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

        // Do some initialization before the tests
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

        // Instantiate a second model with the same config.
        oModel2 = new FirebaseModel(config);

		QUnit.module("Firebase Model Tests", {
			// before: function () {
            //     // Instruct Qunit to wait on the initialization...
            //     var done = assert.async();
            //     setTimeout(function(){ // TODO: How to wait until both models initialized??
            //         done();
            //     }, 4000);

			// },
            beforeEach: function() {
                // Clear values in firebase
                firebase.database().ref('/TestSet').remove();
                firebase.database().ref('/lifeAnswer').set(0);
            },
			afterEach: function () {
			}
		});


        // ======================================================================
        QUnit.test("setProperty retains the value", function(assert) {
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


        // ======================================================================
        QUnit.test("Two models with same configuration are synced", function(assert) {
            // Testing strategy:
            // We set a listener on property /lifeAnswer of one model.
            // We set the value of the same property on the other model.
            // A correct implementation should propagate the change to the other model
            // Eventually... Hence the async done() call.
            var done = assert.async();
            var oFirebase = oModel.getFirebase();
            oFirebase.database().ref('/lifeAnswer').once('value').then(function(snapshot) {
                setTimeout(function(){
                    // The value has changed. Let's check via oModel2 if w get the same value
                    var value2 = oModel2.getProperty("/lifeAnswer");
                    assert.strictEqual(value2, 42, "The two models are in sync on a single property");
                    done();
                }, 4000);
            });
            oModel.setProperty("/lifeAnswer", 42);
        });


        // ======================================================================
        QUnit.test("A control binding works", function(assert) {
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




        // ======================================================================
        QUnit.test("We can add items to a set via two models",
                   // Testing strategy:
                   // We add two items to /TestSet from 2 different models with
                   // the same configuration. The test passes if at the end we have
                   // two entities there.
                   function(assert) {
                       var CST_NAME1 = "Added from model1";
                       var CST_NAME2 = "Added from model2";
                       // Expect 3 assertions as it runs when the first item is added
                       // and then when the second is added, iterating on all of them
                       // so 1 + 2
                       assert.expect(3);
                       var done = assert.async();
                       var doneNotCalled = true;
                       var oFirebase = oModel.getFirebase();
                       var iFoundItems = 0;
                       oFirebase.database().ref('/TestSet').on('value',
                           function(snapshot) {
                               var aTestSet = snapshot.val();
                               iFoundItems = 0;
                               snapshot.forEach(function(oItem){
                                   var oValue = oItem.val();
                                   assert.ok(
                                       (oValue.name === CST_NAME1 || (oValue.name === CST_NAME2 )));
                                   iFoundItems++;
                               });
                               if (doneNotCalled && iFoundItems==2) {
                                   done();
                                   doneNotCalled = false;
                               }
                           });
                       oModel.appendItem("/TestSet", {name: CST_NAME1});
                       oModel2.appendItem("/TestSet", {name: CST_NAME2});
                   });


        // ======================================================================
        QUnit.test("Simulate multiple updates to the same property",
                   // Testing strategy:
                   // We'll set the same property in the model with an
                   // increasing number, over and over, waiting some amout of time.
                   // At the end we should have the last value there.
                   function(assert) {
                       assert.expect(10);
                       let done = assert.async();
                       let i = 0;
                       var fTestSetProperty = function(i){
                           if(i<10){
                               setTimeout(function(){
                                   oModel.setProperty("/lifeAnswer", i);
                                   fTestSetProperty(i+1);
                               }, 1000);
                           }
                       }
                       // setup a listener on the firebase so we can track
                       // what's going on.
                       var oFirebase = oModel.getFirebase();
                       var iUpdatesCounter = 0;
                       var iLastValue = -1;
                       oFirebase.database()
                           .ref('/lifeAnswer')
                           .on('value',
                               function(snapshot) {
                                   assert.strictEqual(snapshot.val(),
                                                      iLastValue+1,
                                                      "Got the right value");
                                   iLastValue=snapshot.val();
                                   iUpdatesCounter++;
                                   if(iUpdatesCounter===10){
                                       done();
                                   }
                               });
                       fTestSetProperty(0);
                   });


        // ======================================================================
        // QUnit.test("Test a Component can be instantiated with a manifest pointing to FirebaseModel",
        //            function(assert) {
        //                var oComp = new sap.ui.core.ComponentContainer({
		// 	               name : "test.unit"
		// 			   });
        //                oComp.placeAt
        //            });
	}
);
