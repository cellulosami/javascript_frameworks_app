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
      //add each frameworks data to variable
      results.forEach(function (response) {
        let appName = capitalize(response.data.name);
        let stars = response.data.stargazers_count;
        let watchers = response.data.subscribers_count;
        let forks = response.data.forks_count;
        let data = {
          "name": appName,
          "forks": forks,
          "watchers": watchers,
          "stars": stars
        };
        frameworkData.push(data);
      });

      renderData();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function renderData() {
  let dataContainer = document.querySelector(".data");
  frameworkData.forEach(function (framework) {
    //render name
    let x = document.createElement("H3");
    let t = document.createTextNode(`Name: ${framework.name}`);
    x.appendChild(t);
    dataContainer.appendChild(x);

    //render stars
    x = document.createElement("P");
    t = document.createTextNode(`Stars: ${framework.stars}`);
    x.appendChild(t);
    dataContainer.appendChild(x);

    //render watchers
    x = document.createElement("P");
    t = document.createTextNode(`Watchers: ${framework.watchers}`);
    x.appendChild(t);
    dataContainer.appendChild(x);

    //render forks
    x = document.createElement("P");
    t = document.createTextNode(`Forks: ${framework.forks}`);
    x.appendChild(t);
    dataContainer.appendChild(x);
  });

}
getAll();
