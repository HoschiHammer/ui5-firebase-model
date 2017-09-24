/*!
 * ${copyright}
 */
jQuery.sap.registerModulePath("google.firebase", "https://www.gstatic.com/firebasejs/4.3.1/");
sap.ui.define(
    ["jquery.sap.global",
     "sap/ui/model/json/JSONModel",
     "sap/ui/model/Context",
     "./FirebasePropertyBinding",
     "./FirebaseListBinding",
     "./firebase-app",
     "./firebase-auth",
     "./firebase-database"//,
     //"./Util"
    ],
    function(jQuery,
             JSONModel,
             Context,
             FirebasePropertyBinding,
             FirebaseListBinding,
             Util) {
        "use strict";

        /**
         * Constructor for a new FirebaseModel.
         *
         * @class
         * Model implementation for Firebase model
         *
         * @extends sap.ui.model.JSONModel
         *
         * @version ${version}
         *
         */
        var FirebaseModel = JSONModel.extend("openui5.community.model.firebase.FirebaseModel", {

            constructor : function(oFBConfig, oData) {
                if (oData !== undefined) {
                    JSONModel.apply(this, [oData, false]);
                } else {
                    JSONModel.apply(this);
                }
                var that = this;

                // // Create a firebase promise which resolves when it is fully loaded.
                // this._firebasePromise = new Promise(function(resolve, reject) {
                //     if (!window.firebase) {
                //         jQuery.sap.log.error("FirebaseModel::contructor::Firebase has not been loaded.");
                //         // var oFBScript = Util.getScript("https://www.gstatic.com/firebasejs/4.1.1/firebase-app.js");
                //         // oFBScript.then(function () {
                //         //     Util.getScript([
                //         //         "https://www.gstatic.com/firebasejs/4.1.1/firebase-auth.js",
                //         //         "https://www.gstatic.com/firebasejs/4.1.1/firebase-database.js"]).then(
                //         //             function(){
                //         //                 _initFirebase();
                //         //                 resolve(firebase);
                //         //             }, function(){
                //         //                 reject(Error("Cannot load firebase"));
                //         //             });
                //         // });
                //     }
                // });

                var _initFirebase = function () {
                    jQuery.sap.log.info("FirebaseModel::_initFirebase::called");
                    // Initialize firebase if not done yet
				    if (!firebase.apps.length && oFBConfig) {
                        jQuery.sap.log.info("FirebaseModel::initFirebase::Calling initializeApp on firebase");
					    firebase.initializeApp(oFBConfig);
				    }
                    firebase.database().ref("/").once(
                        "value", function(oSnapshot) {
                            jQuery.sap.log.info("FirebaseModel::initFirebase::Loading initial model data");
                            that._setDataJsonModel(oSnapshot.val());
                        });
                };

                _initFirebase();
                this._firebasePromise = new Promise(function(resolve, reject) {
                    if (window.firebase) {
                        resolve(window.firebase);
                    } else {
                        var sReason = "FirebaseModel::constructor::Cannot resolve the firebase promise";
                        reject(new Error(sReason));
                        jQuery.sap.log.error(sReason);
                    }
                });

            },

            metadata : {
                publicMethods : []
            }

        });


        /**
         * Sets data on the json model, not on firebase.
         *
         * @param {object} oData the data to set on the model
         * @return {object} the return value of JSONModel.setData
         *
         * @private
         */
        FirebaseModel.prototype._setDataJsonModel = function(oData) {
            return JSONModel.prototype.setData.apply(this, [oData, false]);
        };


        /**
         * Returns a Promise to the firebase object so you can interact with it
         * directly. - Do not use
         * @return {object} the firebase object Promise
         *
         * @public
         */
        FirebaseModel.prototype.getFirebasePromise = function() {
            return this._firebasePromise;
        };


        /**
         * Returns a the firebase object so you can interact with it
         * directly.
         * @return {object} the firebase object
         *
         * @public
         */
        FirebaseModel.prototype.getFirebase = function() {
            return window.firebase;
        };

        /**
         * Sets the data to the model.
         *
         * @param {object} oData the data to set on the model
         * @param {boolean} [bMerge=false] whether to merge the data instead of replacing it
         *
         * @public
         */
        FirebaseModel.prototype.setData = function(oData, bMerge){
            JSONModel.prototype.setData.apply(this, arguments);
            // Set data on firebase db
            var oDB = firebase.database();
            oDB.ref("/").set(JSONModel.prototype.getProperty.apply(this,["/"]));
        };

        /**
         * @see sap.ui.model.json.JSONModel.prototype.bindProperty
         * @override
         */
        FirebaseModel.prototype.bindProperty = function(sPath, oContext, mParameters) {
            var oBinding = new FirebasePropertyBinding(this, sPath, oContext, mParameters);
            return oBinding;
        };

        /**
         * @see sap.ui.model.json.JSONModel.prototype.bindList
         * @override
         */
        FirebaseModel.prototype.bindList = function(sPath, oContext, aSorters, aFilters, mParameters) {
            var oBinding = new FirebaseListBinding(this, sPath, oContext, aSorters, aFilters, mParameters);
            return oBinding;
        };


        /**
         * Sets a new value for the given property <code>sPropertyName</code> in the model.
         * If the model value changed all interested parties are informed.
         *
         * @param {string}  sPath path of the property to set
         * @param {any}     oValue value to set the property to
         * @param {object} [oContext=null] the context which will be used to set the property
         * @param {boolean} [bAsyncUpdate] whether to update other bindings dependent on this property asynchronously
         * @return {boolean} true if the value was set correctly and false if errors occurred like the entry was not found.
         * @public
         */
        FirebaseModel.prototype.setProperty = function(sPath, oValue, oContext, bAsyncUpdate) {
            var bSuper = JSONModel.prototype.setProperty.apply(this, arguments);

            if (!bSuper) {
                return false;
            }

            var fb = window.firebase,
                that = this;
            if(!fb){ //Firebase isn't even loaded. Try this later.
                this.getFirebasePromise().then(function(val){
                    that.setProperty(sPath, oValue, oContext, bAsyncUpdate);
                });
                return true; // ?!
            }

            var oDB = firebase.database(),
                sResolvedPath = this.resolve(sPath, oContext);

            // return if path / context is invalid
            if (!sResolvedPath) {
                return false;
            }

            oDB.ref(sResolvedPath).set(oValue);

            return true;
        };


        /**
         * Adds an item to a list making sure it doesn't destroy concurrent
         * updates by other clients.
         * @param {string}  sPath path of the property to set
         * @param {any}     oItem the new item to add
         * @returns {object}
         */
        FirebaseModel.prototype.appendItem = function(sPath, oItem) {
            var that = this;
            this.getFirebasePromise().then(function(oFirebase){
                var oDB = oFirebase.database();
                oDB.ref(sPath).once(
                    "value", function(oSnapshot) {
                        JSONModel.prototype.setProperty.apply(that, [sPath, oSnapshot.val()]);
                    });
                oFirebase.database().ref(sPath).push(oItem);
            });
        };

        return FirebaseModel;
    }
);
