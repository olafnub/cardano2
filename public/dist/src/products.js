"use strict";
// Fetchs data from own server to bypass CORS
const fetchData = fetch("http://localhost:8888/merch.json")
    .then(res => res.json())
    .then(data => {
    return data;
})
    .catch(err => console.log(err));
module.exports = fetchData;
