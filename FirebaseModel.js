/**
 * Firebase model implementation
 *
 * @namespace
 * @name openui5.community.ui.model.firebase
 * @public
 */
sap.ui.define(
    ['jquery.sap.global', 'sap/ui/model/ClientModel', 'sap/ui/model/Context'],
    function(jQuery, ClientModel, Context) {
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
            },

            metadata : {
                publicMethods : []
            }

        });

        return FirebaseModel;
    }
);
