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

      calculatePopularity();
      buildCharts();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function buildCharts() {
  let chartOptions = {
    name: "stars",
    type: "bar",
    label: "Number of Stars"
  };
  buildChart(chartOptions);

  chartOptions = {
    name: "watchers",
    type: "bar",
    label: "Number of Watchers"
  };
  buildChart(chartOptions);

  chartOptions = {
    name: "forks",
    type: "bar",
    label: "Number of Forks"
  };
  buildChart(chartOptions);

  chartOptions = {
    name: "popularity",
    type: "pie",
    label: "Existence is Meaningless"
  };
  buildChart(chartOptions);
}

function buildChart(chartOptions) {
  //get context
  let ctx = document.getElementById(`${chartOptions.name}-chart`).getContext('2d');

  //get chart-specific data
  let chartData = {};
  let labels = [];
  let data = [];

  frameworkData.forEach(function (framework) {
    labels.push(framework.name);
    data.push(framework[`${chartOptions.name}`]);
  });

  chartData.labels = labels;
  chartData.data = data;
  chartData.label = chartOptions.label;
  chartData.type = chartOptions.type;
  chartData.ctx = ctx;

  renderChart(chartData);
}

function renderChart(chartData) {
  var myChart = new Chart(chartData.ctx, {
    type: chartData.type,
    data: {
      labels: chartData.labels,
      datasets: [{
        label: chartData.label,
        data: chartData.data,
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
      responsive: false
    }
  });
}

function calculatePopularity() {
  let starsTotal = sumFrameworkAttribute("stars");
  let watchersTotal = sumFrameworkAttribute("watchers");
  let forksTotal = sumFrameworkAttribute("forks");

  frameworkData.forEach(function (framework) {
    let starsPercent = framework.stars / starsTotal;
    let watchersPercent = framework.watchers / watchersTotal;
    let forksPercent = framework.forks / forksTotal;
    let popularity = ((starsPercent + watchersPercent + forksPercent) / 3).toFixed(2);
    framework.popularity = popularity;
  });
  //for each attribute, get the total count. Then, divide a particular framework's count by the total to get their percent of that pie

  //total each frameworks percent for each attribute, then divide by the number of attributes to get their overall percentage
}

function sumFrameworkAttribute(attribute) {
  let result = 0;
  frameworkData.forEach(function (framework) {
    result += framework[`${attribute}`];
  });

  return result;
}

getAll();