// Provides the JSON model implementation of a list binding
sap.ui.define(['jquery.sap.global', 'sap/ui/model/ChangeReason', 'sap/ui/model/json/JSONListBinding'],
              function(jQuery, ChangeReason, JSONListBinding) {
                  "use strict";

                  /**
                   *
                   * @class
                   * List binding implementation for the Firebase Model
                   *
                   * @param {sap.ui.model.json.JSONModel} oModel
                   * @param {string} sPath
                   * @param {sap.ui.model.Context} oContext
                   * @param {sap.ui.model.Sorter|sap.ui.model.Sorter[]} [aSorters] initial sort order (can be either a sorter or an array of sorters)
                   * @param {sap.ui.model.Filter|sap.ui.model.Filter[]} [aFilters] predefined filter/s (can be either a filter or an array of filters)
                   * @param {object} [mParameters]
                   * @alias openui5.community.ui.model.firebase.FirebaseModel.FirebaseListBinding
                   * @extends sap.ui.model.json.JSONListBinding
                   */
                  var FirebaseListBinding = JSONListBinding.extend(
                      "openui5.community.ui.model.firebase.FirebaseModel.FirebaseListBinding");
                  
                  return FirebaseListBinding;

              });
