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
    }
    catch (requestError) {
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
    }
    else {
        evt.returnValue = false;
    }
    getQuote();
}

//Funtion to request stock quote data
function getQuote() {
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
}

//Event handler to call function on subit event
var form = document.getElementsByTagName("form")[0];
if (form.addEventListener) {
    form.addEventListener("submit", stopSubmission, false);
    window.addEventListener("load", getQuote);
}
else if (form.attachEvent) {
    form.attachEvent("onsubmit", stopSubmission);
    window.attachEvent("onload", getQuote);
}

//Event handler for the page load event
if (window.addEventListener) {
    window.addEventListener("load", getRequestObject, false);
}
else if (window.attachEvent) {
    window.attachEvent("onload", getRequestObject);
}