// Wait for Cordova to load
        //
        document.addEventListener("deviceready", onDeviceReady, false);

        var currentRow;
        // Populate the database
        //
        function populateDB(tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS EXERCISE (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, reps INTEGER, sets INTEGER, timer INTEGER,increment INTEGER)');
        }

        // Query the database
        //
        function queryDB(tx) {
            tx.executeSql('SELECT * FROM EXERCISE', [], querySuccess, errorCB);
        }

        function searchQueryDB(tx) {
            tx.executeSql("SELECT * FROM EXERCISE where name like ('%"+ document.getElementById("txtName").value + "%')",
                    [], querySuccess, errorCB);
        }
        // Query the success callback
        //
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

        //Delete query
        function deleteRow(tx) {
          tx.executeSql('DELETE FROM EXERCISE WHERE id = "' + currentRow + '"');
        }

        // Transaction error callback
        //
        function errorCB(err) {
            alert("Error processing SQL: "+err.code);
        }

        // Transaction success callback
        //
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
        function insertDB(tx) {
            tx.executeSql('INSERT INTO EXERCISE (name,reps,sets,timer,increment) VALUES ("' +document.getElementById("exercise_name").value
                    +'","'+document.getElementById("reps_number").value
                    +'","'+document.getElementById("sets_number").value
                    +'","'+document.getElementById("time").value
                    +'","'+document.getElementById("increment_rate").value
                    + '")');
        }

        function goInsert() {
            var db = sqlitePlugin.openDatabase("Database", "1.0", "Cordova Demo", 200000);
            db.transaction(insertDB, errorCB, successCB);
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
        }
        function goEdit() {
            var db = sqlitePlugin.openDatabase("Database", "1.0", "Cordova Demo", 200000);
            db.transaction(editRow, errorCB, successCB);
            document.getElementById('qrpopup').style.display='none';
        }