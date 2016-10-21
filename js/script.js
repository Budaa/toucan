"use strict"
//CONFIG
var local = document.location.href,
    api = local + 'api/';
console.log(api)

//defining result




let oReq = new XMLHttpRequest();
oReq.onload = function (e) {
    var result = JSON.parse(e.target.response)
    console.log(result)

}
oReq.open('GET',api + 'schoolMembers.php', true);

oReq.send();
