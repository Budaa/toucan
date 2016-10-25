"use strict"
//CONFIG
var local = document.location.href,
    api = local + 'api/';

//prototype

//Sanitize input
String.prototype.escape = function() {
    var tagsToReplace = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;'
    };
    return this.replace(/[&<>]/g, function(tag) {
        return tagsToReplace[tag] || tag;
    });
};

//add list of schools to DOM elemetn
var appendSchools = function (id, name) {
  var select = document.getElementById('school');
  var option = document.createElement("option");
  option.setAttribute("value", id);
  option.innerHTML = name;
  select.appendChild(option);
}


//Display school members inside DOM
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
    //Create XHR object
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
  var cache;String.prototype.escape = function() {
    var tagsToReplace = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;'
    };
    return this.replace(/[&<>]/g, function(tag) {
        return tagsToReplace[tag] || tag;
    });
};

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
    //Create XHR object
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

//add member function
var addNewMember = function(name, email, school){
  //sanitize user input
  name = name.escape();
  email = email.escape();
  school = school.escape();
  var notifications = document.getElementById('notifications');
  //Create XHR request
  var oReq = new XMLHttpRequest();

  //Onload function
  oReq.onload = function (e) {
    //Parse result to JSON
    var result = JSON.parse(e.target.response)
    if(result === 1){
      //Informing user
      notifications.innerHTML = 'New member added to database!';
      notifications.style.background = 'green';

      //Clear fields
      document.getElementById('name').value = '';
      document.getElementById('email').value = '';

      //Clear cache
      sessionStorage.removeItem('cache');

      //add new member to the list
      var membersDiv = document.getElementById('members');
      var memberDiv = document.createElement("div");
      memberDiv.setAttribute("class", "member");
      memberDiv.innerHTML = name + "<br>" + email + "<br><br>";
      membersDiv.insertBefore(memberDiv, membersDiv.childNodes[0]);
    }else {
      notifications.innerHTML = result;
      notifications.style.background = 'red';
    }

  }
  //Open API url
  oReq.open('GET',api + 'addMember.php?name=' + name+ '&email=' + email + '&school=' + school, true);
  //Send request
  oReq.send();
}
