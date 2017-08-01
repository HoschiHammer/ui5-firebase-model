/*!
 * ${copyright}
 */

/**
 * Initialization Code and shared classes of library openui5.community.model.firebase.
 */
sap.ui.define(['jquery.sap.global', 'sap/ui/core/library'],
	function(jQuery, library1) {
	"use strict";


	/**
	 * An example library containing geometrical controls
	 *
	 * @namespace
	 * @name ui5lab.geometry
	 * @public
	 */

	// library dependencies

	// delegate further initialization of this library to the Core
	sap.ui.getCore().initLibrary({
		name : "openui5.community.model.firebase",
		dependencies : ["sap.ui.core"],
		types: [],
		interfaces: [],
		controls: [],
		elements: [],
		noLibraryCSS: false,
		version: "${version}"
	});


	return openui5.community.model.firebase;

});
