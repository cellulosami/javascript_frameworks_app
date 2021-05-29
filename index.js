const axios = require("axios");
const Chart = require("chart.js");

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
      buildCharts();
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

function buildCharts() {
  buildChart("stars");
  buildChart("watchers");
  buildChart("forks");
}

function buildChart(name) {
  //get context
  let ctx = document.getElementById(`${name}Chart`).getContext('2d');

  //get chart-specific data
  let chartData = {};
  let labels = [];
  frameworkData.forEach(function (framework) {
    labels.push(framework.name);
  });

  chartData.labels = labels;

  renderChart(ctx, chartData);
}

function renderChart(ctx, chartData) {
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: chartData.labels,
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

getAll();

var ctx = document.getElementById('starsChart').getContext('2d');
