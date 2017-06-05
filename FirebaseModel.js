/**
 * Firebase model implementation
 *
 * @namespace
 * @name openui5.community.ui.model.firebase
 * @public
 */
sap.ui.define(
    ['jquery.sap.global', 'sap/ui/model/ClientModel', 'sap/ui/model/Context', './FirebasePropertyBinding'],
    function(jQuery, ClientModel, Context, FirebasePropertyBinding) {
        "use strict";

        /**
         * Constructor for a new FirebaseModel.
         *
         * @class
         * Model implementation for Firebase model
         *
         * @extends sap.ui.model.ClientModel
         *
         * @author Tiago Almeida
         * @version ${version}
         *
         * @param {object} oData either the URL where to load the JSON from or a JS object
         * @param {boolean} bObserve whether to observe the JSON data for property changes (experimental)
         * @constructor
         * @public
         * @alias openui5.community.ui.model.firebase
         */
        var FirebaseModel = ClientModel.extend("openui5.community.ui.model.firebase.FirebaseModel", {

            constructor : function(oData) {
                ClientModel.apply(this, arguments);
                var that = this;
                // Load firebase library code
                jQuery.sap.includeScript(
                    {url: "https://www.gstatic.com/firebasejs/4.1.1/firebase-app.js"})
                    .then( _ => {
                        jQuery.sap.includeScript(
                            {url: "https://www.gstatic.com/firebasejs/4.1.1/firebase-database.js"})
                            .then( _ => {
                                // TODO: Needs to come from model configuration
                                var oConfig = {
                                    apiKey: "",
                                    authDomain: "ui5test-28e70.firebaseapp.com",
                                    databaseURL: "https://ui5test-28e70.firebaseio.com",
                                    projectId: "ui5test-28e70",
                                    storageBucket: "ui5test-28e70.appspot.com",
                                    messagingSenderId: "101209272012"
                                };
                                firebase.initializeApp(oConfig);
                            });
                    });
                //oLoadPromise.catch(this.errorLoadingFirebase);
            },
            
            /**
             * 
             */
            errorLoadingFirebase : function() {
                // TODO: Fixme
                console.log('cannot load firebase');
            },


            /**
             * 
             */
            loadFirebaseDatabase : function() {
                var oPromise = 
                oPromise.then(this.initFirebaseDatabase);
                return oPromise;
            },

            /**
             * 
             */
            initFirebaseDatabase : function() {
                
                
            },


            metadata : {
                publicMethods : []
            }

        });

        /**
	 * @see sap.ui.model.Model.prototype.bindProperty
	 *
	 */
	FirebaseModel.prototype.bindProperty = function(sPath, oContext, mParameters) {
	    var oBinding = new FirebasePropertyBinding(this, sPath, oContext, mParameters);
	    return oBinding;
	};

        /**
	* Returns the value for the property with the given <code>sPropertyName</code>
	*
	* @param {string} sPath the path to the property
	* @param {object} [oContext=null] the context which will be used to retrieve the property
	* @type any
	* @return the value of the property
	* @public
	*/
	FirebaseModel.prototype.getProperty = function(sPath, oContext) {
	    return sPath; // TODO: Fixme

	};

        return FirebaseModel;
    }
);
