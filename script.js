/*  Project 01_11_02

    Author: Tabitha Siclovan
    Date: 08.31.18   

    Filename: script.js
*/

"use strict";

//Global variable
var httpRequest = false;
var entry = "^IXIC";

//Function to Create XHR Object
function getRequestObject() {
    try {
        httpRequest = new XMLHttpRequest(); //XHR Object
    } catch (requestError) {
        return false;
    }
    //alert(httpRequest);
    return httpRequest;
}

//Function to stop default submission from executing
function stopSubmission(evt) {
    //alert("stopSubmission()");
    if (evt.preventDefault) {
        evt.preventDefault();
    } else {
        evt.returnValue = false;
    }
    getQuote();
}

//Funtion to request stock quote data
function getQuote() {
    //console.log("getQuote()");
    //alert("getQuote()");
    if (document.getElementsByTagName("input")[0].value) {
        entry = document.getElementsByTagName("input")[0].value;
    }
    if (!httpRequest) {
        httpRequest = getRequestObject();
    }
    //Begin to generate AJAX request
    httpRequest.abort();
    httpRequest.open("get", "StockCheck.php?t=" + entry, true);
    httpRequest.send(null);
    //Event handler for the onreadystatechange
    httpRequest.onreadystatechange = displayData;
    //Refresh code sequence every 10 seconds
    clearTimeout(updateQuote);
    var updateQuote = setTimeout('getQuote()', 10000);
}

//Function event handler to see if data is given back
function displayData() {
    if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        var stockResults = httpRequest.responseText;
        //console.log(stockResults);
        var stockItems = stockResults.split(/,|\"/);
        //console.log(stockItems);
        for (var i = stockItems.length - 1; i >= 0; i--) {
            if (stockItems[i] === "") {
                stockItems.splice(i, 1);
            }
        }
        //console.log(stockItems);
        document.getElementById("ticker").innerHTML = stockItems[0];
        document.getElementById("openingPrice").innerHTML = stockItems[6];
        document.getElementById("lastTrade").innerHTML = stockItems[1];
        document.getElementById("lastTradeDT").innerHTML = stockItems[2] + ", " + stockItems[3];
        document.getElementById("change").innerHTML = stockItems[4];
        document.getElementById("range").innerHTML = (stockItems[8] * 1).toFixed(2) + "&ndash;" + (stockItems[7] * 1).toFixed(2);
        document.getElementById("volume").innerHTML = (stockItems[9] * 1).toLocaleString();

    }

}

//Function to get better style into the stock data
function formatTable() {
    var rows = document.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
        rows[i].style.background = "#9FE098";
    }
}

//Event handler to call function on subit event
var form = document.getElementsByTagName("form")[0];
if (form.addEventListener) {
    form.addEventListener("submit", stopSubmission, false);
    window.addEventListener("load", formatTable, false);
    window.addEventListener("load", getQuote);
} else if (form.attachEvent) {
    form.attachEvent("onsubmit", stopSubmission);
    window.attachEvent("onload", formatTable);
    window.attachEvent("onload", getQuote);
}

//Event handler for the page load event
if (window.addEventListener) {
    window.addEventListener("load", getRequestObject, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", getRequestObject);
}
