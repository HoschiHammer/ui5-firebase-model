/*!
 * ${copyright}
 */
sap.ui.define(['jquery.sap.global',
               'sap/ui/model/ChangeReason',
               'sap/ui/model/json/JSONListBinding'],
              function(jQuery, ChangeReason, JSONListBinding) {
                "use strict";
                
                /**
                 *
                 * @class
                 * List binding implementation for the Firebase Model
                 *
                 */
                var FirebaseListBinding = JSONListBinding.extend(
                  "openui5.community.model.firebase.FirebaseModel.FirebaseListBinding");
             
                return FirebaseListBinding;

              });
