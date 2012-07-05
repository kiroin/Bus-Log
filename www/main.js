function onLoad() {
	document.addEventListener("deviceready", onDeviceReady, false);
}

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