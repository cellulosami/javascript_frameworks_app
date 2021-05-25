const axios = require("axios");

module.exports = function (n) {
  return n * 111;
};

var number = 7;
document.querySelector(".data").innerHTML = number;

axios.get("https://api.github.com/repos/vuejs/vue")
  .then(function (response) {
    console.log("yay");
  })
  .catch(function (error) {
    console.log("boo");
    console.log(error);
  });