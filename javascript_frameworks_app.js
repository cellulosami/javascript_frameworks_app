const axios = require("axios");

module.exports = function (n) {
  return n * 111;
};

var number = 7;
document.querySelector(".data").innerHTML = number;

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

Promise.all([getVue(), getAngular(), getEmber(), getSvelte(), getReact()])
  .then(function (results) {
    results.forEach(function (response) {
      console.log(response.data);
      let appName = response.data.name;
      let stars = response.data.stargazers_count;
      let watchers = response.data.subscribers_count;
      let forks = response.data.forks_count;
      let data = {
        "forks": forks,
        "watchers": watchers,
        "Stars": stars
      };
      frameworkData[appName] = data;
    });
  })
  .catch(function (error) {
    console.log(error);
  });

console.log(frameworkData);
