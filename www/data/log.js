
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

// ## createDB ## Creates initial table with log types
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

// ## addLog ## grabs a new log and adds it to the table
function addLog(inDB){
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

function getLogs(tx){
	tx.executeSql('SELECT * FROM table1', [], getLogsSuccess, errorDB);
}

function dateToMinutes(date){
// changes date to minutes only
	return ((date.getHours()*60) + date.getMinutes());
}
function dateToTimeString(date){
// changes date to 11:43pm format
	var hours, ampm, dHours, minutes, dMinutes, myString = {};
	myString = "";
	ampm = "am";

	hours = date.getHours();
	if(hours >= 12){
		ampm = "pm";
		dHours= (hours-12).toString();
	}
	else if(hours == 0){
		dHours = "12";
		ampm = "am";
	}
	else{
		dHours = hours.toString();
	}
	minutes = date.getMinutes();
	if(minutes <10){
		dMinutes = "0" + minutes.toString();
	}
	else{
		dMinutes = minutes.toString();
	}
	return (dHours + ":" + dMinutes + " " + ampm);
	
}
function getLogsSuccess(tx, results){
	// takes in results of table and displays html inside #log-area
	//
	// id: [xx] time: [xx:xx am]
	var myString, 
		numRows, 
		item, 
		x, 
		i,
		myTime, hours, minutes, currentTime,
		cMinTotal, myTimeMinTotal, diffMinTotal, diffHours, diffMinutes,
		countdownTime = {};
	var ampm="am";
	
	myString = ""; 

	currentTime = new Date(); //current time
	
	//currentTime = new Date(2012, 09, 09, 22, 15, 0000); //sept 9, 10:00pm
	myString += "<h2>Current time: " + dateToTimeString(currentTime) + "</h2>";
	numRows = results.rows.length;

	//
	// Create and sort array of results by time
	var resultArray = new Array;
	var upcomingArray = [];
	var resultCount, currentMinutes, itemMinutes = {};
	var minutesPerDay = 60*24;
	
	resultArray = new Array();
	upcomingArray = new Array();
	
	for(i=0; i< results.rows.length; i++){
		resultArray.push(results.rows.item(i));
		//alert(results.rows.item(i)['time']);
		//alert(resultArray[i]['time']);
	}	

	resultArray = resultArray.sort(function (a, b){
																 var aTime = dateToMinutes(new Date(a['time']) );
																 var bTime = dateToMinutes(new Date(b['time']) );
																 return (aTime - bTime);
																	 });

	//
	// Display upcoming logs 60min after current time or next 5
	resultCount=0;
	currentMinutes = dateToMinutes(currentTime);
	alert (currentMinutes);
	for (i=0; i<resultArray.length; i++){
		item = resultArray[i];
		var time = new Date(item['time']);
		//alert (item['time']);
		itemMinutes =  dateToMinutes(time );
		// alert(itemMinutes);
		
		if(itemMinutes >= currentMinutes && itemMinutes < (currentMinutes +60)){
			upcomingArray.push(item);
			resultCount++;
		}
	
		else if ((currentMinutes+60) > minutesPerDay && itemMinutes < (currentMinutes+60-minutesPerDay)){
			upcomingArray.push(item);
			resultCount++;
		}
		else if(resultCount < 5){
			upcomingArray.push(item);
			resultCount++;
		}		
	}

	myString += "upcoming times:";
	alert(upcomingArray.length);
	for (i=0; i<upcomingArray.length; i++){
		item = upcomingArray[i];
		myString += "<div>" + dateToTimeString(new Date(item['time'])) + "</div>";
	}
	myString +="---- end upcoming ---<br>";
	//
	//
	
	
	for(i=0; i< numRows; i++){
		item = results.rows.item(i);
		myString += "<div class='log-item'>";
		
		for( x in item){
			if(x == "time"){
				// show the logged time, and diff between now and then
				//myTime = new Date(resultArray[i]['time']);
				myTime = new Date(item[x]);
				
				hours = myTime.getHours();
				minutes = myTime.getMinutes();
				
				// change all to minutes, get diff, then restructure
				cMinTotal = dateToMinutes(currentTime); // current time in minutes
				myTimeMinTotal = dateToMinutes(myTime); // myTime in minutes
				diffMinTotal = cMinTotal - myTimeMinTotal;
				
				if(diffMinTotal < 0){ // if upcoming
					
					diffHours = Math.floor(-1* diffMinTotal /60); // rounded down
					diffMinutes = -1* diffMinTotal % 60; // remaining minutes
					
					myString += "<span class='upcoming-time'><span class='time'>" + dateToTimeString(myTime)+ "</span>";
					myString += " (coming in ";
					if(diffHours>0){
						myString+= diffHours + " hour";
						if(diffHours >1){ myString+= "s";}
						myString+= ", ";
					}
					if(diffMinutes !=1){
						myString+= diffMinutes + " minutes)"; // difference in minutes
					}
					else{
						myString+= "1 minute)";
					}
					myString += "</span>";
					
				}
				else{	 // if past
					diffHours = Math.floor(diffMinTotal /60); // rounded down
					diffMinutes = diffMinTotal % 60; // remaining minutes
					myString += "<span class='past-time'><span class='time'>" + dateToTimeString(myTime)+ "</span>";
					myString += " (left ";
					if(diffHours>0){
						myString+= diffHours + " hour";
						if(diffHours >1){ myString+= "s";}
						myString+= ", ";
					}
					if(diffMinutes !=1){
						myString+= diffMinutes + " minutes ago)"; // difference in minutes
					}
					else{
						myString+= "1 minute ago)";
					}
					myString += "</span>";
				}
			}
			else{
				// myString += x + ": " + item[x] + " ";
			}
		}
		
		myString +="</div>";
	
	}
	
	myString+="</div> \n<!-- end log-list -->";

	$('#log-list').html(myString);
}



