
function getDB(){
	return window.openDatabase("busDB", "1.0", "Bus DB", 100000);
}
function getLogTypes(){
	var myLogType = {};
	myLogType.name = new Array("time");
	myLogType.string = "time"
	return myLogType;
}
// ## getLogData ## returns object with data method: .time
function getLogData(){
	var myLog = {};
	
	myLog.time = new Date().getTime();
	
	return myLog;
}


function createDB(inDB){
	var myLog, 
	logTypeCount,
	logTypes,
	mySqlString,
	i, 
	x = {};
	
	logTypes = getLogTypes().string;
	// inDB.executeSql('DROP TABLE IF EXISTS table1');
	
	// 'CREATE TABLE IF NOT EXISTS table1 (id unique, time)'	
	mySqlString = "CREATE TABLE IF NOT EXISTS table1 (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " + logTypes + ")";	
	inDB.executeSql(mySqlString);
	
}


function populateDB(inDB){
	var myLog, 
		logTypeCount,
		logTypes,
		logValues,
		mySqlString,
		i, 
		x = {};
	
	logTypeCount = getLogTypes().name.length;	
	logTypes = getLogTypes().string;
	myLog = getLogData();
	
	logValues = "";
	i = 1;
	for (x in myLog){
		logValues += myLog[x];
		if (i<logTypeCount) {
			logValues += ", ";
		}
	}

	
	// INSERT INTO table1 (time) VALUES (1338532930987)
	mySqlString = "INSERT INTO table1 (" + logTypes + ") VALUES (" + logValues + ")";
	//	alert(myString);
	inDB.executeSql(mySqlString);

}

function errorDB(err){
	alert("error in sql: " + err.message);
}
function successDB(){
	// alert("success");
}
function queryDB(tx){
	tx.executeSql('SELECT * FROM table1', [], querySuccess, errorDB);
}

function querySuccess(tx, results){
	var myString, 
		numRows, 
		item, 
		x, 
		i,
		myTime = {};
	
	numRows = results.rows.length;
	myString = ""; 

	for(i=0; i< numRows; i++){
		item = results.rows.item(i);
		for( x in item){
			if(x == "time"){
				myTime = new Date(item[x]);
				myString += x + ": " + myTime.toString()  + " ";
			}
			else{
				myString += x + ": " + item[x] + " ";
			}
		}
		myString += "<br>";
	}

	$('#status-message').html(myString);
}


