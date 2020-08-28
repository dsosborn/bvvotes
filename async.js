const puppeteer = require('puppeteer');
const exec = require('child_process').exec;
let count = 0; 
var dateFormat = require('dateformat');
let errors = false;
let changing = false;
let rand = Math.random().toFixed(3) * 1 + 0.15;
let browser;

async function vote(){
    if (changing){
        console.log("Another function is changing. Skipping...");
        return;
    } else{
      try {
    count++;
    console.log(`Starting vote ${count}`)
    let now = new Date();
    const nowish = dateFormat(now, "yyyy-mm-dd'_'hh-MMTT");

  const page = await browser.newPage();
  //await page.setViewport({ width: 1280, height: 1280 })


        //await page.setViewport({ width: 1280, height: 1280 })
        await page.goto('https://www.10best.com/awards/travel/best-canned-cocktail-company/bravazzi-hard-italian-soda');
              //await page.screenshot({path: `./ss/${nowish}.png`});
      await page.click('#awardVoteButton')
      await page.waitForNavigation()
      //await page.screenshot({path: `./ss/latest.png`});
      setTimeout(vote, rand * 1000);
      console.log(`Successful Vote ${count}`)
    } catch (e) {
        errors = true;
        changing = true;
      console.log('an expection on page.evaluate ', e);
      exec('(echo authenticate \'""\'; echo signal newnym; echo quit) | nc localhost 9051', (error, stdout, stderr) => {
        if (stdout && stdout.match(/250/g).length === 3) {
          console.log('Success: The IP Address has been changed.');
          setTimeout(vote, rand * 1000);
          changing = false;
        } else {
          console.log('Error: A problem occured while attempting to change the IP Address.');
          setTimeout(vote, rand * 60000);
        }
      });
    }
    //current_ip_address = await page.evaluate(() => document.body.textContent.trim());
  
    //console.log(current_ip_address);
      await browser.close();
    
  
  
}
    }
(async () => {
  browser = await puppeteer.launch({
    args: [
      '--proxy-server=socks5://127.0.0.1:9050'
    ],
  });
  
    vote();
    setTimeout(vote, 2000);
    setTimeout(vote, 4000);
})();
