//show-screen.js


// ## showScreen ## shows given screen. Hides others.

function showScreen(screenName){
	switch(screenName){
		case 'screen-home':
			console.log("Showing screen: " + screenName);
			ScreenHome();
			// $('#screen-home').show('slow');
			break;
		default:
			console.log("Couldn't show screen: " + screenName);			
	}
}