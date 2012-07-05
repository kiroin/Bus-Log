/* Screen-home.js
*	Home screen for the app.
*	Should show the log, menu, list busses in the near future
 
*/


function ScreenHome(){
	///////////////////////////
	// display
	///////////////////////////	
	$('#content').load('screens/screen-home.html', function(){
										 $('#log-area').hide();
										 
										 // On button click: initate storage
										 //$('#addBtn').click(function(){alert ('click!')});
										 $('#addLogBtn').click(getAndStoreLog);
										 $('#viewLogBtn').click(viewAllLogs);
										 

										 
	});
	

	
	
	///////////////////////////
	// behavior
	///////////////////////////
	// ## viewAllLogs ##
	function viewAllLogs(){
		var myDB = getDB();
		$('#log-area').show();
		myDB.transaction(queryDB, errorDB);
	}
	
	// ## getAndStoreLog ##
	// get Log, store in a DB and store in myBusLog object
	function getAndStoreLog(){									
		var myDB = getDB();
		myDB.transaction(populateDB, errorDB, successDB);
	}

	
	// on store success log console
	function storeSuccess(inLog){
		console.log("Store is successful ");
		//$('#status-message').html('Sucessfully logged time:' + callback.time );
		$('#status-message').html('Successfully logged: ' + getLogHtml(inLog));
	}
	
	
	
}