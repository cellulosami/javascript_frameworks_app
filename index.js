const axios = require("axios");

module.exports = function (n) {
  return n * 111;
};

var frameworkData = [];

function getVue() {
  return axios.get("https://api.github.com/repos/vuejs/vue");
}
function getAngular() {
  return axios.get("https://api.github.com/repos/angular/angular.js");
}
function getEmber() {
  return axios.get("https://api.github.com/repos/emberjs/ember.js");
}
function getSvelte() {
  return axios.get("https://api.github.com/repos/sveltejs/svelte");
}
function getReact() {
  return axios.get("https://api.github.com/repos/facebook/react");
}

function getAll() {
  Promise.all([getVue(), getAngular(), getEmber(), getSvelte(), getReact()])
    .then(function (results) {
      results.forEach(function (response) {
        console.log(response.data);
        let appName = response.data.name;
        let stars = response.data.stargazers_count;
        let watchers = response.data.subscribers_count;
        let forks = response.data.forks_count;
        let data = {
          "name": appName,
          "forks": forks,
          "watchers": watchers,
          "Stars": stars
        };
        frameworkData.push(data);
      });

      logData();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function logData() {
  console.log(frameworkData);
  console.log(frameworkData[0]);
  console.log(frameworkData[1]);
  console.log(frameworkData.length);
  console.log(frameworkData);
  document.querySelector(".data").innerHTML = frameworkData[1].name;
}

getAll();
