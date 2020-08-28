const puppeteer = require('puppeteer');
let count = 0; 
var dateFormat = require('dateformat');
let errors = false;
function vote(){
(async () => {
    count++;
    console.log(`Voting number ${count}`)
    var now = new Date();
    const nowish = dateFormat(now, "yyyy-mm-dd'_'hh-MMTT");
    
  const browser = await puppeteer.launch();
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1280 })
  await page.goto('https://www.10best.com/awards/travel/best-canned-cocktail-company/bravazzi-hard-italian-soda');
  try {
    await page.click('#awardVoteButton')
    await page.waitForNavigation()
    //await page.screenshot({path: `./ss/${nowish}.png`});
    setTimeout(vote, rand * 1000);
  } catch (e) {
    console.log('an expection on page.evaluate ', e);
    errors = true;
  }
  await browser.close();})();
var rand = Math.random().toFixed(3) * 2 + 5;
console.log(`delay ${rand * 1000}`);

if (!errors){}
}
vote();
