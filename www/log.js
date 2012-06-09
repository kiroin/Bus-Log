
// ## getLogData ## returns object with data method: .time
function getLogData(){
	var myLog = {};
	// get data
	// store data
	// on success callback
	
	// get data
	myLog.time = new Date().getTime();
	return myLog;
}



// ## storeBusLog ## stores myLog in myDB, then calls callback
function storeBusLog(myLog, myDB, callback){
	
	// construct SQL instruction string
	//	DROP TABLE IF EXISTS test1
	//  CREATE TABLE IF NOT EXISTS test1 (id AUTO_INCREMENT, time)
	//  INSERT INTO test1 (time) VALUES (1338532930987)
	
	// create table format
	var vSQLTableName = "test1";
	var mySqlString ={};
	var x, hasOwn = Object.prototype.hasOwnProperty;
	var nullDataHandler, errorHandler;
	
	//mySqlString.dropTable = "DROP TABLE IF EXISTS " + vSQLTableName;
	mySqlString.createTable = "CREATE TABLE IF NOT EXISTS " + vSQLTableName + " (id AUTO_INCREMENT";
	for (x in myLog){
		if ( hasOwn.call(myLog, x) ){
			mySqlString.createTable += ", " + x; 
		}
		
	}
	mySqlString.createTable += ")";
	
	
	// insert each value
	mySqlString.insertValue = "INSERT INTO "+vSQLTableName;
	for(x in myLog){
		if ( hasOwn.call(myLog, x) ){
			mySqlString.insertValue += " (" + x + ") VALUES (" + myLog[x] + ")";
		}
	}
	
	
	// execute sql string
	
	// null db data handler - shouldn't do anything since insert fcn doesn't need to deal with returned rows
	nullDataHandler = function (transaction, results) {} 
	
	// db error handler - prevents the rest of the transaction going ahead on failure
	errorHandler = function (transaction, error) {
		console.log("error# "+error.code + ": " + error.message);
		// returns true to rollback the transaction
		return true;  
	} 
	try {
		myDB.transaction(function(transaction) {
										 for (x in mySqlString){
										 console.log(mySqlString[x]);
										 transaction.executeSql(mySqlString[x], [], nullDataHandler, errorHandler);
										 }
										 });
		
	} catch(e) {
		console.log(e.message);
		return;
	}

	// if everythings peachy, execute callback
	if (errorHandler!= true && callback && typeof(callback) === "function") {
    callback(myLog);
	}
}



// ## getHtml ## Returns html string of all log entries
function getHtml(myLog){
	var myTime;
	var x,
		myHTMLString="",
		hasOwn = Object.prototype.hasOwnProperty;
	for (x in myLog){
		if ( hasOwn.call(myLog, x) ){
			
			myHTMLString += "<div id='" + x + "'>";
			
			switch (x){
			case 'time':
				myTime = new Date(myLog[x]);
				myHTMLString +=  myTime.toString();
				break;
			default:
					myHTMLString += x + ": " + myLog[x];
			}//end switch
			
			myHTMLString += "</div>";
			
		}//end if has.call
	}//end for x in myLog
	return myHTMLString;
}

