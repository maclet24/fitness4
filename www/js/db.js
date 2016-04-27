// Wait for Cordova to load
        //
        document.addEventListener("deviceready", onDeviceReady, false);
        var currentRow;
        var day;
        var update_day_id;
        var added_value;
        var monday = "Monday";
        var tuesday = "Tuesday";
        var wednesday = "Wednesday";
        var thursday = "Thursday";
        var friday = "Friday";
        var saturday = "Saturday";
        var sunday = "Sunday";
        var totalLength;
        var dayQuery;

        // Populate the database
        //
        function populateDB(tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS EXERCISE (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, reps INTEGER, sets INTEGER, timer INTEGER,increment INTEGER)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS MONDAY (id INTEGER PRIMARY KEY AUTOINCREMENT, exercise TEXT NOT NULL, sets INTEGER, reps INTEGER, timer INTEGER, added INTEGER)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS TUESDAY (id INTEGER PRIMARY KEY AUTOINCREMENT,exercise TEXT NOT NULL, sets INTEGER, reps INTEGER, timer INTEGER, added INTEGER)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS WEDNESDAY (id INTEGER PRIMARY KEY AUTOINCREMENT,exercise TEXT NOT NULL, sets INTEGER, reps INTEGER, timer INTEGER, added INTEGER)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS THURSDAY (id INTEGER PRIMARY KEY AUTOINCREMENT,exercise TEXT NOT NULL, sets INTEGER, reps INTEGER, timer INTEGER, added INTEGER)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS FRIDAY (id INTEGER PRIMARY KEY AUTOINCREMENT,exercise TEXT NOT NULL, sets INTEGER, reps INTEGER, timer INTEGER, added INTEGER)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS SATURDAY (id INTEGER PRIMARY KEY AUTOINCREMENT,exercise TEXT NOT NULL, sets INTEGER, reps INTEGER, timer INTEGER, added INTEGER)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS SUNDAY (id INTEGER PRIMARY KEY AUTOINCREMENT,exercise TEXT NOT NULL, sets INTEGER, reps INTEGER, timer INTEGER, added INTEGER)');
        }

        // Query the database
        //
        function queryDB(tx) {
            tx.executeSql('SELECT * FROM EXERCISE', [], querySuccess, errorCB);
        }
        
        function queryDay(tx) {
            if (day == 'Monday') {
                tx.executeSql("SELECT * FROM MONDAY", [], queryDaySuccess);
            }else if (day == 'Tuesday') {
                tx.executeSql("SELECT * FROM TUESDAY", [], queryDaySuccess, errorCB);
            }else if (day == 'Wednesday') {
                tx.executeSql("SELECT * FROM WEDNESDAY", [], queryDaySuccess, errorCB);
            }else if (day == 'Thursday') {
                tx.executeSql("SELECT * FROM THURSDAY", [], queryDaySuccess, errorCB);
            }else if (day == 'Friday') {
                tx.executeSql("SELECT * FROM FRIDAY", [], queryDaySuccess, errorCB);
            }else if (day == 'Sunday'){
                tx.executeSql("SELECT * FROM SUNDAY", [], queryDaySuccess, errorCB);
            }else{
                tx.executeSql("SELECT * FROM SATURDAY", [], queryDaySuccess, errorCB);
            }
        }

        function searchQueryDB(tx) {
            tx.executeSql("SELECT * FROM EXERCISE where name like ('%"+ document.getElementById("txtName").value + "%')",
                    [], querySuccess, errorCB);
        }
        
        function queryWorkoutMonday(tx) {
            tx.executeSql("SELECT * FROM MONDAY WHERE ADDED = 1", [], queryWorkoutSuccessMonday);
        }
        function queryWorkoutTuesday(tx) {
            tx.executeSql("SELECT * FROM TUESDAY", [], queryWorkoutSuccessTuesday, errorCB);
        }
        function queryWorkoutWednesday(tx) {
            tx.executeSql("SELECT * FROM WEDNESDAY", [], queryWorkoutSuccessWednesday, errorCB);
        }
        function queryWorkoutThursday(tx) {
            tx.executeSql("SELECT * FROM THURSDAY", [], queryWorkoutSuccessThursday, errorCB);
        }
        function queryWorkoutFriday(tx) {
            tx.executeSql("SELECT * FROM FRIDAY", [], queryWorkoutSuccessFriday, errorCB);
        }
        function queryWorkoutSaturday(tx) {
            tx.executeSql("SELECT * FROM SATURDAY", [], queryWorkoutSuccessSaturday, errorCB);
        }
        function queryWorkoutSunday(tx) {
            tx.executeSql("SELECT * FROM SUNDAY", [], queryWorkoutSuccessSunday, errorCB);
        }
        
        
        function queryWorkoutSuccessMonday(tx, results){
            var count = document.getElementById("mondayCount").value -1;
            var id = results.rows.item(count).id;
            document.getElementById("monday").innerHTML = monday;
            document.getElementById("mondayWorkout").innerHTML = results.rows.item(count).exercise;
            document.getElementById("zGoal").innerHTML = results.rows.item(count).sets;
            document.getElementById("repsGoal").innerHTML = results.rows.item(count).reps;
            document.getElementById("timeGoal").innerHTML = results.rows.item(count).timer;
        }
        function queryWorkoutSuccessTuesday(tx, results){
            var count = document.getElementById("tuesdayCount").value -1;
            var id = results.rows.item(count).id;
            document.getElementById("tuesday").innerHTML = tuesday;
            document.getElementById("tuesdayWorkout").innerHTML = results.rows.item(count).exercise;
            document.getElementById("zGoal").innerHTML = results.rows.item(count).sets;
            document.getElementById("repsGoal").innerHTML = results.rows.item(count).reps;
            document.getElementById("timeGoal").innerHTML = results.rows.item(count).timer;
        }
        function queryWorkoutSuccessWednesday(tx, results){
            var count = document.getElementById("wednesdayCount").value -1;
            var id = results.rows.item(count).id;
            document.getElementById("wednesday").innerHTML = tuesday;
            document.getElementById("wednesdayWorkout").innerHTML = results.rows.item(count).exercise;
            document.getElementById("zGoal").innerHTML = results.rows.item(count).sets;
            document.getElementById("repsGoal").innerHTML = results.rows.item(count).reps;
            document.getElementById("timeGoal").innerHTML = results.rows.item(count).timer;
        }
        function queryWorkoutSuccessThursday(tx, results){
            var count = document.getElementById("thursdayCount").value -1;
            var id = results.rows.item(count).id;
            document.getElementById("thursday").innerHTML = tuesday;
            document.getElementById("thursdayWorkout").innerHTML = results.rows.item(count).exercise;
            document.getElementById("zGoal").innerHTML = results.rows.item(count).sets;
            document.getElementById("repsGoal").innerHTML = results.rows.item(count).reps;
            document.getElementById("timeGoal").innerHTML = results.rows.item(count).timer;
        }
        function queryWorkoutSuccessFriday(tx, results){
            var count = document.getElementById("fridayCount").value -1;
            var id = results.rows.item(count).id;
            document.getElementById("friday").innerHTML = tuesday;
            document.getElementById("fridayWorkout").innerHTML = results.rows.item(count).exercise;
            document.getElementById("zGoal").innerHTML = results.rows.item(count).sets;
            document.getElementById("repsGoal").innerHTML = results.rows.item(count).reps;
            document.getElementById("timeGoal").innerHTML = results.rows.item(count).timer;
        }
        function queryWorkoutSuccessSaturday(tx, results){
            var count = document.getElementById("saturdayCount").value -1;
            var id = results.rows.item(count).id;
            document.getElementById("saturday").innerHTML = tuesday;
            document.getElementById("saturdayWorkout").innerHTML = results.rows.item(count).exercise;
            document.getElementById("zGoal").innerHTML = results.rows.item(count).sets;
            document.getElementById("repsGoal").innerHTML = results.rows.item(count).reps;
            document.getElementById("timeGoal").innerHTML = results.rows.item(count).timer;
        }
        function queryWorkoutSuccessSunday(tx, results){
            var count = document.getElementById("sundayCount").value -1;
            var id = results.rows.item(count).id;
            document.getElementById("sunday").innerHTML = tuesday;
            document.getElementById("sundayWorkout").innerHTML = results.rows.item(count).exercise;
            document.getElementById("zGoal").innerHTML = results.rows.item(count).sets;
            document.getElementById("repsGoal").innerHTML = results.rows.item(count).reps;
            document.getElementById("timeGoal").innerHTML = results.rows.item(count).timer;
        }
        function mondayNext() {
            document.getElementById("mondayCount").stepUp(1);
            loadWorkoutMonday();
        }
        function tuesdayNext() {
            document.getElementById("tuesdayCount").stepUp(1);
            loadWorkoutTuesday();
        }
        function wednesdayNext() {
            document.getElementById("wednesdayCount").stepUp(1);
            loadWorkoutWednesday();
        }
        function thursdayNext() {
            document.getElementById("thursdayCount").stepUp(1);
            loadWorkoutThursday();
        }
        function fridayNext() {
            document.getElementById("fridayCount").stepUp(1);
            loadWorkoutFriday();
        }
        function saturdayNext() {
            document.getElementById("saturdayCount").stepUp(1);
            loadWorkoutSaturday();
        }
        function sundayNext() {
            document.getElementById("sundayCount").stepUp(1);
            loadWorkoutSunday();
        }
        
        // Query the success callback
        function querySuccess(tx, results) {
            var tblText='<table id="t01"><tr><th id= "idPad">ID </th> <th id= "namePad"> Exercise name </th> <th id= "repsPad">Reps </th> <th id= "setsPad"> Sets </th>  <th id= "timePad"> Timers </th>  <th id= "incPad"> increment </th></tr>';
            var len = results.rows.length;
            for (var i = 0; i < len; i++) {
                var tmpArgs=results.rows.item(i).id + ",'" + results.rows.item(i).name
                        + "','" + results.rows.item(i).reps + "','" + results.rows.item(i).sets
                        + "','" + results.rows.item(i).timer + "','" + results.rows.item(i).increment +"'";
                tblText +='<tr onclick="goPopup('+ tmpArgs + ');"><td>' + results.rows.item(i).id +'</td><td>'
                        + results.rows.item(i).name +'</td><td>'
                        + results.rows.item(i).reps +'</td><td>'
                        + results.rows.item(i).sets + '</td><td>'
                        + results.rows.item(i).timer + '</td><td>'
                        + results.rows.item(i).increment + '</td></tr>';    
            }
            tblText +="</table>";
            document.getElementById("tblDiv").innerHTML =tblText;
        }
        function test(value) {
            day = value;
            successCBday();
            //document.getElementById("dayDiv").innerHTML = value;
        }
        
        function queryDaySuccess(tx,results){
            var tblText = '<table><tr><th>Name </th> <th> Added </th></tr>' + day;
            var len = results.rows.length;
            var is_added;
            var test;
            for (var i=0; i<len; i++){
                test = results.rows.item(i).added;
                if (test == 1) {
                    is_added = 'checked';
                }
                else{
                    is_added = '';
                }
                tblText += '<tr><td>' + results.rows.item(i).exercise + '</td><td><input type="checkbox" onClick="update_day(this)" value="' + results.rows.item(i).id + '" ' + is_added + '></tr>';
            }
            tblText +="</table>";
            document.getElementById("dayDiv").innerHTML = tblText;
        }
        function update_day(element) {
            var x = element.checked;
            update_day_id = element.value;
            if (x){
                added_value = 1;
            }else{
                added_value = 0;
            }
            goEditDay();
        }
        //Delete query
        function deleteRow(tx) {
            tx.executeSql('DELETE FROM EXERCISE WHERE id = "' + currentRow + '"');
            tx.executeSql('DELETE FROM MONDAY WHERE id = "' + currentRow + '"');
            tx.executeSql('DELETE FROM TUESDAY WHERE id = "' + currentRow + '"');
            tx.executeSql('DELETE FROM WEDNESDAY WHERE id = "' + currentRow + '"');
            tx.executeSql('DELETE FROM THURSDAY WHERE id = "' + currentRow + '"');
            tx.executeSql('DELETE FROM FRIDAY WHERE id = "' + currentRow + '"');
            tx.executeSql('DELETE FROM SATURDAY WHERE id = "' + currentRow + '"');
            tx.executeSql('DELETE FROM SUNDAY WHERE id = "' + currentRow + '"');
        }

        // Transaction error callback
        //
        function errorCB(err) {
            //alert("Error processing SQL: "+err.code);
        }

        // Transaction success callback
        //
        
        function successCBday() {
            var db = sqlitePlugin.openDatabase("Database", "1.0", "Cordova Demo", 200000);
            db.transaction(queryDay, errorCB);
        }
        
        function loadWorkoutMonday() {
            var db = sqlitePlugin.openDatabase("Database", "1.0", "Cordova Demo", 200000);
            db.transaction(queryWorkoutMonday, errorCB);
        }
        function loadWorkoutTuesday() {
            var db = sqlitePlugin.openDatabase("Database", "1.0", "Cordova Demo", 200000);
            db.transaction(queryWorkoutTuesday, errorCB);
        }
        function loadWorkoutWednesday() {
            var db = sqlitePlugin.openDatabase("Database", "1.0", "Cordova Demo", 200000);
            db.transaction(queryWorkoutWednesday, errorCB);
        }
        function loadWorkoutThursday() {
            var db = sqlitePlugin.openDatabase("Database", "1.0", "Cordova Demo", 200000);
            db.transaction(queryWorkoutThursday, errorCB);
        }
        function loadWorkoutFriday() {
            var db = sqlitePlugin.openDatabase("Database", "1.0", "Cordova Demo", 200000);
            db.transaction(queryWorkoutFriday, errorCB);
        }
        function loadWorkoutSaturday() {
            var db = sqlitePlugin.openDatabase("Database", "1.0", "Cordova Demo", 200000);
            db.transaction(queryWorkoutSaturday, errorCB);
        }
        function loadWorkoutSunday() {
            var db = sqlitePlugin.openDatabase("Database", "1.0", "Cordova Demo", 200000);
            db.transaction(queryWorkoutSunday, errorCB);
        }
        function successCB() {
            var db = sqlitePlugin.openDatabase("Database", "1.0", "Cordova Demo", 200000);
            db.transaction(queryDB, errorCB);
        }

         // Cordova is ready
        //
        function onDeviceReady() {
            var db = sqlitePlugin.openDatabase("Database", "1.0", "Cordova Demo", 200000);
            db.transaction(populateDB, errorCB, successCB);
        }

        //Insert query
        //
        function insertExercise(tx) {
            tx.executeSql('INSERT INTO EXERCISE (name,reps,sets,timer,increment) VALUES ("' +document.getElementById("exercise_name").value
                    +'","'+document.getElementById("reps_number").value
                    +'","'+document.getElementById("sets_number").value
                    +'","'+document.getElementById("time").value
                    +'","'+document.getElementById("increment_rate").value
                    + '")');
            tx.executeSql('INSERT INTO MONDAY (exercise,sets,reps,timer,added) VALUES ("' + document.getElementById("exercise_name").value
                          +'","' + document.getElementById("sets_number").value
                          +'","' + document.getElementById("reps_number").value
                          +'","' + document.getElementById("time").value
                          + '","0")');
            tx.executeSql('INSERT INTO TUESDAY (exercise,sets,reps,timer,added) VALUES ("' + document.getElementById("exercise_name").value
                          +'","' + document.getElementById("sets_number").value
                          +'","' + document.getElementById("reps_number").value
                          +'","' + document.getElementById("time").value
                          + '","0")');
            tx.executeSql('INSERT INTO WEDNESDAY (exercise,sets,reps,timer,added) VALUES ("' + document.getElementById("exercise_name").value
                          +'","' + document.getElementById("sets_number").value
                          +'","' + document.getElementById("reps_number").value
                          +'","' + document.getElementById("time").value
                          + '","0")');
            tx.executeSql('INSERT INTO THURSDAY (exercise,sets,reps,timer,added) VALUES ("' + document.getElementById("exercise_name").value
                          +'","' + document.getElementById("sets_number").value
                          +'","' + document.getElementById("reps_number").value
                          +'","' + document.getElementById("time").value
                          + '","0")');
            tx.executeSql('INSERT INTO FRIDAY (exercise,sets,reps,timer,added) VALUES ("' + document.getElementById("exercise_name").value
                          +'","' + document.getElementById("sets_number").value
                          +'","' + document.getElementById("reps_number").value
                          +'","' + document.getElementById("time").value
                          + '","0")');
            tx.executeSql('INSERT INTO SATURDAY (exercise,sets,reps,timer,added) VALUES ("' + document.getElementById("exercise_name").value
                          +'","' + document.getElementById("sets_number").value
                          +'","' + document.getElementById("reps_number").value
                          +'","' + document.getElementById("time").value
                          + '","0")');
            tx.executeSql('INSERT INTO SUNDAY (exercise,sets,reps,timer,added) VALUES ("' + document.getElementById("exercise_name").value
                          +'","' + document.getElementById("sets_number").value
                          +'","' + document.getElementById("reps_number").value
                          +'","' + document.getElementById("time").value
                          + '","0")');
            document.getElementById("exercise_name").value = "";
            document.getElementById("reps_number").value = "";
            document.getElementById("sets_number").value = "";
            document.getElementById("time").value = "";
            document.getElementById("increment_rate").value = "";
        }
        function goInsert() {
            var db = sqlitePlugin.openDatabase("Database", "1.0", "Cordova Demo", 200000);
            db.transaction(insertExercise, errorCB, successCB);
        }

        function goSearch() {
            var db = sqlitePlugin.openDatabase("Database", "1.0", "Cordova Demo", 200000);
            db.transaction(searchQueryDB, errorCB);
        }

        function goDelete() {
             var db = sqlitePlugin.openDatabase("Database", "1.0", "Cordova Demo", 200000);
             db.transaction(deleteRow, errorCB, successCB);
             document.getElementById('qrpopup').style.display='none';
        }

        //Show the popup after tapping a row in table
        //
        function goPopup(row,name,reps,sets,timer,inc) {
            currentRow=row;
            document.getElementById("qrpopup").style.display="block";
            document.getElementById("editNameBox").value = name;
            document.getElementById("editRepsBox").value = reps;
            document.getElementById("editSetsBox").value = sets;
            document.getElementById("editTimerBox").value = timer;
            document.getElementById("editIncrementBox").value = inc;
        }

        function editRow(tx) {
            tx.executeSql('UPDATE EXERCISE SET name ="' + document.getElementById("editNameBox").value
                          +'", reps="' + document.getElementById("editRepsBox").value +
                          '", sets="' + document.getElementById("editSetsBox").value +
                          '", timer="' + document.getElementById("editTimerBox").value +
                          '", increment="' + document.getElementById("editIncrementBox").value +
                          '" WHERE id =' + currentRow);
            tx.executeSql('UPDATE MONDAY SET exercise ="' + document.getElementById("editNameBox").value + '" WHERE id =' + currentRow);
            tx.executeSql('UPDATE TUESDAY SET exercise ="' + document.getElementById("editNameBox").value + '" WHERE id =' + currentRow);
            tx.executeSql('UPDATE WEDNESDAY SET exercise ="' + document.getElementById("editNameBox").value + '" WHERE id =' + currentRow);
            tx.executeSql('UPDATE THURSDAY SET exercise ="' + document.getElementById("editNameBox").value + '" WHERE id =' + currentRow);
            tx.executeSql('UPDATE FRIDAY SET exercise ="' + document.getElementById("editNameBox").value + '" WHERE id =' + currentRow);
            tx.executeSql('UPDATE SATURDAY SET exercise ="' + document.getElementById("editNameBox").value + '" WHERE id =' + currentRow);
            tx.executeSql('UPDATE SUNDAY SET exercise ="' + document.getElementById("editNameBox").value + '" WHERE id =' + currentRow);
        }
        function editDayRow(tx){
            if (day == 'Monday'){
                tx.executeSql('UPDATE MONDAY SET added ="' + added_value + '" WHERE id =' + update_day_id);
            }else if (day == 'Tuesday') {
                tx.executeSql('UPDATE TUESDAY SET added ="' + added_value + '" WHERE id =' + update_day_id);
            }else if (day == 'Wednesday') {
                tx.executeSql('UPDATE WEDNESDAY SET added ="' + added_value + '" WHERE id =' + update_day_id);
            }else if (day == 'Thursday') {
                tx.executeSql('UPDATE THURSDAY SET added ="' + added_value + '" WHERE id =' + update_day_id);
            }else if (day == 'Friday') {
                tx.executeSql('UPDATE FRIDAY SET added ="' + added_value + '" WHERE id =' + update_day_id);
            }else if (day == 'Sunday'){
                tx.executeSql('UPDATE SUNDAY SET added ="' + added_value + '" WHERE id =' + update_day_id);
            }else{
                tx.executeSql('UPDATE SATURDAY SET added ="' + added_value + '" WHERE id =' + update_day_id);
            }
        }
        function goEdit() {
            var db = sqlitePlugin.openDatabase("Database", "1.0", "Cordova Demo", 200000);
            db.transaction(editRow, errorCB, successCB);
            document.getElementById('qrpopup').style.display='none';
        }
        function goEditDay() {
            var db = sqlitePlugin.openDatabase("Database", "1.0", "Cordova Demo", 200000);
            db.transaction(editDayRow, errorCB);
        }