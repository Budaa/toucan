"use strict"
//CONFIG
var local = document.location.href,
    api = local + 'api/';
console.log(api)

//defining result





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
  result = session[school_id];
  console.log("data from cache: ");
  console.log(result);
}else{
  //IF not connect to API, get fresh data and save it to the session
  var oReq = new XMLHttpRequest();
  oReq.onload = function (e) {
      result = JSON.parse(e.target.response)
      cache[school_id] = result;
      sessionStorage.setItem('cache', JSON.stringify(cache));
      console.log("This is fresh data: ");
      console.log(result);
  }
  oReq.open('GET',api + 'schoolMembers.php?school=' + school_id, true);
  oReq.send();
}
