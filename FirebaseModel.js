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
            return null;
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
            var oDB = firebase.database(),
                sResolvedPath = this.resolve(sPath, oContext);

            // return if path / context is invalid
	    if (!sResolvedPath) {
		return false;
	    }
            
            oDB.ref(sPath).set(oValue);

            return true;
        };

        return FirebaseModel;
    }
);
