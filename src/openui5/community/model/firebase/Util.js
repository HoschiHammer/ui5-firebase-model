/**
 * Firebase model implementation based on a JSONModel. We don"t support the observe feature
 * of the base model so that parameter will not do anything.
 *
 * @namespace
 * @name openui5.community.ui.model.firebase
 * @public
 */
sap.ui.define(
    ["sap/ui/base/ManagedObject"],
    function(ManagedObject) {
        "use strict";

        return {
            /**
             * Loads a script returning a promise so we can chain them.
             * All credit goes to https://bradb.net/blog/promise-based-js-script-loader/
             *
             * @param {object} oURL Array|string. If an array, the promise returned resolves when all of the scripts are loaded 
             * @returns {Promise}
             */
            getScript: function(oUrl) {
                if(Array.isArray(oUrl)) {
                    var self = this, prom = [];
                    oUrl.forEach(function(item) {
                        prom.push(self.getScript(item));
                    });
                    return Promise.all(prom);
                }
                
                return new Promise(function (resolve, reject) {
                    var r = false,
                        t = document.getElementsByTagName("script")[0],
                        s = document.createElement("script");
                
                    s.type = "text/javascript";
                    s.src = oUrl;
                    s.async = true;
                    s.onload = s.onreadystatechange = function () {
                        if (!r && (!this.readyState || this.readyState === "complete")) {
                            r = true;
                            resolve(this);
                        }
                    };
                    s.onerror = s.onabort = reject;
                    t.parentNode.insertBefore(s, t);
                }); 
            }
        };
    }
);
