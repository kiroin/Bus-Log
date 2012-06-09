//show-screen.js


// ## showScreen ## shows given screen. Hides others.

function showScreen(screenName){
	
	switch(screenName){
		case 'screen-add-log':
			$('#screen-add-log').show('slow');
			break;
		default:
			console.log("Couldn't show screen: " + screenName);			
	}
}