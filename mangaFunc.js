const bot_settings = require("./bot_settings.json");
const Discord = require("Discord.js");
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

function manga()
{
	//board that will contain our final data
	var dataMangaChap=[];
	var dataMangaName=[];
    (async () => 
    {
        //launch pupeteer
        const browser = await puppeteer.launch(/*{headless: false}*/);

        //create a new page
        const page = await browser.newPage();

        //tell to the bot to go to the website
        await page.goto('https://www.japscan.to/', { waitUntil: 'load'});
        await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'});

        //Tell to the bot to scroll to the bottom of the page
        page.evaluate(_ => 
        {
            window.scrollBy(0, window.innerHeight);
        });

        //get the data of the website
        let content = await page.content();
        console.log(content)
        //put all the content of the webpage into cheerio
        var $ = cheerio.load(content);

        //research all the items that we want to get
        $('.container .row #main .card .chapters .tab-pane .chapters_list').each((index,item)=>
        {
            const $element = $(item);
            //verify if the class is the object that we want
            if($element.attr('class') == "chapters_list")
            {
                //push the data into a board
                dataMangaChap.push
                ({
                    //the data, we dont need to describe all the path but just the path after the class anime
                    next_epiosode:$element.find('.text-truncate .text-dark').text()
                })
                console.log(dataMangaChap)
            }
        })	       
        //close the browser
        browser.close();
    })();
    //return/export data
    module.exports = { dataMangaChap };
}

manga()