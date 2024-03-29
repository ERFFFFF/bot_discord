// get the data of the anime online and store it.

const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const delay = require("./delay.js");

exports.anime = async () => {

  // array that will contain our final data
  var dataAnime = [];

  //launch pupeteer
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  // const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox'], headless: false});

  //create a new page
  const page = await browser.newPage();

  //tell to the bot to go to the website
  await page.goto('https://www.livechart.me/', { waitUntil: 'networkidle2' });

  // scroll bottom of the page and laod the data each time
  for (let i = 0; i < 20; i++) {
    page.evaluate(_ => {
      // scroll bottom of the page
      //window.scrollTo(0,document.body.scrollHeight);
      window.scrollBy(0, window.innerHeight);
    });
    // wait loading
    await delay.delay(100)
  }

  //get the data of the website
  let content = await page.content();

  //put all the content of the webpage into cheerio
  var $ = cheerio.load(content);

  //research all the items that we want to get
  $('#content .chart .anime').each((index, item) => {
    const $element = $(item);
    //verify if the class is the object that we want
    if ($element.attr('class') == "anime") {
      //push the data into a board
      dataAnime.push
        ({
          //the data, we dont need to describe all the path but just the path after the class anime
          en: $element.find('.anime-card .main-title a').text(),
          image: $element.find('.anime-card .poster-container img').attr('src'),//.slice(21, -1),
          next_epiosode: $element.find('.anime-card .poster-container .episode-countdown').text().slice(2, 4),
          countdown: $element.find('.anime-card .poster-container time').text(),
          description: $element.find('.anime-card .anime-info .anime-synopsis p').text()
        })
    }
  })
  //close the browser
  browser.close();

  return dataAnime;
}


// just do GET request to get all content => https://www.livechart.me/summer-2021/tv