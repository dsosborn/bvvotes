const exec = require('child_process').exec;
let count = 0;
function doit() {
  exec(`chrome-cli close -w`);
  count++;
  console.log(count);
  exec(
    `open -na "Google Chrome" --args --incognito "https://www.10best.com/awards/travel/best-canned-cocktail-company/bravazzi-hard-italian-soda/"`,
    function(err) {
      if (!err && count < 501) {
        setTimeout(doit, 4000);
      } else {
        console.log(err || 'over 500');
      }
    }
  );
}
doit();

function doit2() {}
