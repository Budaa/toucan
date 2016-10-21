"use strict"
//CONFIG
var local = document.location.href,
    api = local + 'api/';
console.log(api)

//defining result



console.time();

console.time('someFunction');
let oReq = new XMLHttpRequest();
oReq.onload = function (e) {
    var result = JSON.parse(e.target.response)
    console.log(result)
    console.timeEnd();
}
oReq.open('GET',api + 'schoolMembers.php', true);

oReq.send();
