"use strict"
//CONFIG
var local = document.location.href,
    api = local + 'api/';


//Move school list to DOM
var appendSchools = function (id, name) {
  var select = document.getElementById('school');
  var option = document.createElement("option");
  option.setAttribute("value", id);
  option.innerHTML = name;
  select.appendChild(option);
}

var displayMembers = function (member) {
  var membersDiv = document.getElementById('members');
  //Clean members
  membersDiv.innerHTML = '';
  member.forEach(function (element){
    var memberDiv = document.createElement("div");
    memberDiv.setAttribute("class", "member");
    memberDiv.innerHTML = element.name + "<br>" + element.email + "<br><br>";
    membersDiv.appendChild(memberDiv);
  });
}


//GETING members for choosen school
var schoolMembers = function (id, cb) {
  var result;
  var school_id = id;

  //Query cache storage
  var cache = [];

  //Session data
  var session = [];

  //checking if there is any session cache
  if(sessionStorage.getItem('cache')){
    session = JSON.parse(sessionStorage.getItem('cache'));
  }

  //Checking if there is specific record in chache
  if(typeof session[school_id] !== 'undefined' && session[school_id] === 'null'){
    //Use session storage to define result
    result = session[school_id];

    console.log('resturn cahed');
    return cb(result);
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
      return cb(result);
    }
    //Open API url
    oReq.open('GET',api + 'schoolMembers.php?school=' + school_id, true);
    //Send request
    oReq.send();
  }
};

//Geting school list
(function(){
  var result;

  //Query cache storage
  var cache;

  //Session data
  var session;

  //checking if there is any session cache
  if(sessionStorage.getItem('schoolList')){
    session = JSON.parse(sessionStorage.getItem('schoolList'));
  }

  //Checking if there is specific record in chache
  if(typeof session !== 'undefined'){
    //Use session storage to define result
    result = session;

      //Update select field
    result.forEach(function (element) {
      appendSchools(element.id, element.name);
    });
  }else{
    //IF not, connect to API, get fresh data and save it to the session
    //Create XMLHR object
    var oReq = new XMLHttpRequest();

    //Onload function
    oReq.onload = function (e) {
      //Parse result to JSON
      result = JSON.parse(e.target.response)

      //Set cache variable
      cache = result;

      //Add cachef result to sessionStorage
      sessionStorage.setItem('schoolList', JSON.stringify(cache));

      //Update select field
      result.forEach(function (element) {
        appendSchools(element.id, element.name);
      });
    }
    //Open API url
    oReq.open('GET',api + 'schoolList.php', true);
    //Send request
    oReq.send();
  }
}())

//school watcher
var schoolNode = document.getElementById("school");
schoolNode.onchange = function(){
  //Download school member on change
  schoolMembers(schoolNode.value, function(value){
    displayMembers(value);
  });
}
