================================================================================
 TO DO
================================================================================
Had to disable the linting on the gruntfile as there are currently 4000+ errors :)

test/index.html is not in the right place

Do we need the file src/openui5/community/model/firebase/themes/sap_belize/ ??

https://github.com/UI5Lab/UI5Lab-library-simple/blob/master/src/ui5lab/geometry/themes/base/library.source.less

================================================================================
 To think about
================================================================================
Transactions
Do I need getValue on PropertyBinding ?
What is the firebase.ref.limit ? 


================================================================================
 Snippets
================================================================================

<script src="https://www.gstatic.com/firebasejs/4.1.1/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC_s5-cu9GaYwDGD1DH5HtE_-IwyrrH11Y",
    authDomain: "ui5test-28e70.firebaseapp.com",
    databaseURL: "https://ui5test-28e70.firebaseio.com",
    projectId: "ui5test-28e70",
    storageBucket: "ui5test-28e70.appspot.com",
    messagingSenderId: "101209272012"
  };
  firebase.initializeApp(config);
</script>


                // Load firebase library code
                jQuery.sap.includeScript(
                    {url: "https://www.gstatic.com/firebasejs/4.1.1/firebase-app.js"})
                    .then( _ => {
                        jQuery.sap.includeScript(
                            {url: "https://www.gstatic.com/firebasejs/4.1.1/firebase-database.js"})
                            .then( _ => {
                                // TODO: Needs to come from model configuration
                                var oConfig = {
                                    apiKey: "AIzaSyC_s5-cu9GaYwDGD1DH5HtE_-IwyrrH11Y",
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

https://firebase.google.com/docs/reference/js/index-all





 // If firebase is not loaded, load it and then initialize
                if (!window.firebase) {
                    var oFBScript = Util.getScript("https://www.gstatic.com/firebasejs/4.1.1/firebase-app.js");
                    oFBScript.then(function () {
                        Util.getScript([
                            "https://www.gstatic.com/firebasejs/4.1.1/firebase-auth.js",
                            "https://www.gstatic.com/firebasejs/4.1.1/firebase-database.js"]).then(function(){
                                _();
                            });
                    });
                                  
                    //jQuery.getScript(
                    //    "https://www.gstatic.com/firebasejs/4.1.1/firebase.js",
                    //    function(){
                    //        _initFirebase();
                    //    });
                } else {
                    _initFirebase();
                }
