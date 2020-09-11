const puppeteer = require('puppeteer');
const exec = require('child_process').exec;
let count = 0;
var dateFormat = require('dateformat');
let errors = false;
let changing = false;

function vote() {
  if (changing) {
    console.log('Another function is changing. Skipping...');
    return;
  } else {
    (async () => {
      count++;
      console.log(`Voting number ${count}`);
      let now = new Date();
      const nowish = dateFormat(now, "yyyy-mm-dd'_'hh-MMTT");

      const browser = await puppeteer.launch({
        args: ['--proxy-server=socks5://127.0.0.1:9050'],
      });
      const page = await browser.newPage();
      //await page.setViewport({ width: 1280, height: 1280 })

      let current_ip_address = '';
      try {
        //await page.setViewport({ width: 1280, height: 1280 });
        await page.goto(
          'https://www.10best.com/awards/travel/best-canned-cocktail-company/bravazzi-hard-italian-soda'
        );
        //await page.screenshot({path: `./ss/${nowish}.png`});
        await page.click('#awardVoteButton');
        await page.waitForNavigation();
        //await page.screenshot({ path: `./ss/${nowish}.png` });

        //await page.screenshot({path: `./ss/latest.png`});
        setTimeout(vote, rand * 1000);
      } catch (e) {
        errors = true;
        console.log('an expection on page.evaluate ', e);
        console.log('waiting 60s for master to change');
        setTimeout(vote, rand * 60000);
      }
      //current_ip_address = await page.evaluate(() => document.body.textContent.trim());

      //console.log(current_ip_address);
      await browser.close();
    })();
  }
  let rand = Math.random().toFixed(3) * 1 + 0.15;
  console.log(`delay ${rand * 1000}`);

  if (!errors) {
  }
}

vote();
