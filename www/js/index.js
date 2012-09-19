var app = {
    initialize: function() {
        this.bind();
    },
    bind: function() {
        document.addEventListener('deviceready', this.deviceready, false);
    },
    deviceready: function() {
        // note that this is an event handler so the scope is that of the event
        // so we need to call app.report(), and not this.report()
        app.report('deviceready');
				
    },
    report: function(id) { 
        console.log("reportd:" + id);
				onDeviceReady();

    }
};

// determine if PhoneGap is ready
function onDeviceReady(){
	$(document).ready(function(){
										// ok phonegap and device is ready
										
										//var n = ScreenModules(); // n will receive a list of all screenmodules
										//alert(n.menu.html);
										showScreen('screen-home');
										var myDB = getDB();
										myDB.transaction(createDB, errorDB, successDB);
										
										}); // end jq ready
} // end device ready