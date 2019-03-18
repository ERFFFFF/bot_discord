const bot_settings = require("./bot_settings.json");
const Discord = require("Discord.js");
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

function delay(timeout) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
}

function anime()
{

	//board that will contain our final data
	var dataAnime=[];
    (async () => 
    {
        //launch pupeteer
        const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
       // const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox'], headless: false});
      
        //create a new page
        const page = await browser.newPage();

        //tell to the bot to go to the website
        await page.goto('https://www.livechart.me/', { waitUntil: 'networkidle2'});

        // scroll bottom of the page and laod the data each time
        for(let i=0; i<20; i++)
        {
            page.evaluate(_ => 
            {
                // scroll bottom of the page
                //window.scrollTo(0,document.body.scrollHeight);
                window.scrollBy(0, window.innerHeight);                
            });
            // wait loading
            await delay(500)
        }

        //get the data of the website
        let content = await page.content();

        //put all the content of the webpage into cheerio
        var $ = cheerio.load(content);
        
        //research all the items that we want to get
        $('#content .chart .anime').each((index,item)=>
        {
            const $element = $(item);
            //verify if the class is the object that we want
            if($element.attr('class') == "anime")
            {
                //push the data into a board
                dataAnime.push
                ({ 
                    //the data, we dont need to describe all the path but just the path after the class anime
                    en:$element.find('.anime-card .main-title a').text(),
                    image:$element.find('.anime-card .poster-container img').attr('src'),//.slice(21, -1),
                    next_epiosode:$element.find('.anime-card .poster-container .episode-countdown').text().slice(2, 4),
                    countdown:$element.find('.anime-card .poster-container time').text()
                })
            }
        })	       
        //close the browser
        browser.close();
        console.log("Anime ready to use.")
    })();
    //return/export data
    module.exports = { dataAnime };
}

anime()
