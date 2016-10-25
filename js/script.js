"use strict"
//CONFIG
var local = document.location.href,
    api = local + 'api/';



var result;
var school_id = 2;

//Query cache storage
var cache = [];

//Session data
var session = [];

//checking if there is any session cache
if(sessionStorage.getItem('cache')){
  session = JSON.parse(sessionStorage.getItem('cache'));
}

//Checking if there is specific record in chache
if(typeof session[school_id] !== 'undefined'){
  //Use session storage to define result
  result = session[school_id];


  console.log("data from cache: ");
  console.log(result);
}else{
  //IF not connect to API, get fresh data and save it to the session
  //Create XMLHR object
  var oReq = new XMLHttpRequest();

  //Onload function
  oReq.onload = function (e) {
    //Parse result to JSON
    result = JSON.parse(e.target.response)

    //Set cache variable
    cache[school_id] = result;

    //Add cachef result to sessionStorage
    sessionStorage.setItem('cache', JSON.stringify(cache));

    //Display result
    console.log("This is fresh data: ");
    console.log(result);
  }
  //Open API url
  oReq.open('GET',api + 'schoolMembers.php?school=' + school_id, true);
  //Send request
  oReq.send();
}
