const axios = require("axios").default;
const cheerio = require("cheerio");
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const tough = require('tough-cookie');

axiosCookieJarSupport(axios);
 
const cookieJar = new tough.CookieJar();
 

function getPage() {
  axios
    .get(
      "https://www.10best.com/awards/travel/best-canned-cocktail-company/bravazzi-hard-italian-soda/" ,{withCredentials: true}
    )
    .then(function (response) {
      // handle success
      // console.log(response);
      const $ = cheerio.load(response.data);
      var theOnClick = $("#awardVoteButton").attr("onclick");
      var theOnClickPass = theOnClick.split("('").pop().split("')")[0];
      let cookies = "";

      const cookie1 = response.headers["set-cookie"][0].split(";")[0] + "; ";
      const cookie2 = response.headers["set-cookie"][1].split(";")[0] + "; ";
      cookieJar.setCookie(cookie1, 'https://www.10best.com/', {"ignoreError":true});
      cookieJar.setCookie(cookie2, 'https://www.10best.com/', {"ignoreError":true});
      getKey(theOnClickPass, cookies);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
}
function getKey(theOnClickPass, cookies) {
  console.log(theOnClickPass);
  console.log(cookies);
  axios
    .get(
      `https://www.10best.com/common/ajax/voteKey.php?key=${theOnClickPass}` ,{jar: cookieJar,withCredentials: true}
    )
    .then(function (response) {
      // handle success
      const valKey = encodeURIComponent(response.data.results.validationKey)
        console.log(valKey);
      vote(theOnClickPass, valKey)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
}

function vote(theOnClickPass, valKey) {
    axios
      .get(
          `https://www.10best.com/common/ajax/vote.php?voteKey=${theOnClickPass}&validationKey=${valKey}&email=&c=`, {jar: cookieJar,withCredentials: true}
      )
      .then(function (response) {
        // handle success
          console.log(response.data.results.errors);
        
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }

getPage();
