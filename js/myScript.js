$(document).ready(StartScript); //Wait for DOM to load


//Define statrting and ending hours in Miliitaty time
var _startTime = 9;
var _endTime = 22;

// Get Current hour to highlight on calendar
var _currMilHour = moment().format("HH");

//Calendar assiciative Array for past, presednt, future css classes
var _PPF = { "-1": "past", "NaN": "present", "1": "future" };


// Called after DOM loads to begin script
function StartScript() {

    // Set Current date-time in header
    var dToday = moment().format("dddd, MMMM Do");

    //Display in calendar title
    $("#currentDay").text(dToday);

    //Create calendar
    CreateTable();
}

// Create table
function CreateTable() {

    var myTable = $("#mainTable");

    var IDX = 0;
    var tDiff = 0;
    var newRow;

    // iteratee all hours creating rows with each iteration
    for (IDX = _startTime; IDX <= _endTime; IDX++) {

        //calculate difference between current hour and time displayed
        tDiff = IDX - _currMilHour;
        PPF = tDiff / Math.abs(tDiff);

        newRow = tableRow(IDX, PPF);
        myTable.append(newRow);
    }
}

function tableRow(milHour, ppfIDX) {

    // Convert Militarty Hours to 12hr am/pm format
    var tHour = moment(milHour, "HH").format("ha");

    var className = _PPF[ppfIDX];

    var row = $("<div>");
    row.addClass("row");

    var hourCol = $("<DIV>");
    hourCol.addClass("col-md hour");
    hourCol.text(tHour);
    row.append(hourCol);


    // Center Column with text input
    var centerCol = $("<div>");
    centerCol.addClass(className + " col-md-10 centerCol");

    var lsKey = milHour;
    var textArea = $("<textarea>");
    textArea.attr("lsKey", lsKey);

    //Check for existing saved data
    var rowData = localStorage.getItem(lsKey);
    if (rowData) {
        textArea.text(rowData);
    }

    centerCol.append(textArea);
    row.append(centerCol);

    //Third column, save button
    var saveCol = $("<div>");
    saveCol.addClass("col-md saveBtnBox");

    var btnSave = $("<i>");
    btnSave.addClass("far fa-save");
    btnSave.attr("onclick", "SaveData(" + lsKey + ")");

    saveCol.append(btnSave);
    row.append(saveCol);

    return row;
}


function SaveData(lsKey) {

    var rowData = $("textarea[lsKey='" + lsKey + "'").val();
    localStorage.setItem(lsKey, rowData);

}