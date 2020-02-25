$(document).ready(StartScript);

var _startTime = 9;
var _endTime = 22;
var _currMilHour = moment().format("HH");
var _PPF = { "-1": "past", "NaN": "present", "1": "future" };


function StartScript() {

    // Set Current date-time in header
    var dToday = moment().format("dddd, MMMM Do");

    $("#currentDay").text(dToday);
    CreateTable();
}

// Create table
function CreateTable() {

    var myTable = $("#mainTable");

    var IDX = 0;
    var tDiff = 0;
    var newRow;

    for (IDX = _startTime; IDX <= _endTime; IDX++) {

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

    var centerCol = $("<div>");
    centerCol.addClass("col-md-10");
    centerCol.addClass(className + " centerCol");

    var textArea = $("<textarea>");
    centerCol.append(textArea);
    row.append(centerCol);

    var saveCol = $("<div>");
    saveCol.addClass("col-md saveBtnBox");

    var saveBtn = $("<button>");
    saveBtn.attr("type", "foo");


    var btnText = $("<i>");
    btnText.addClass("far fa-save");
    saveBtn.append(btnText);

    saveCol.append(saveBtn);

    row.append(saveCol);


    return row;

}


function saveText() {

}