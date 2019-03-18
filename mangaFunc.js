const bot_settings = require("./bot_settings.json");
const Discord = require("Discord.js");
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

function delay(timeout) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
}

function manga()
{
	//board that will contain our final data
	var dataMangaChap=[];
	var dataMangaName=[];

    (async () => 
    {
        //launch pupeteer
        const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});

        //create a new page
        const page = await browser.newPage();

        //tell to the bot to go to the website
        await page.goto('https://www.japscan.to/', { waitUntil: 'networkidle2'});

       	await delay(5500);

        //Tell to the bot to scroll to the bottom of the page
        page.evaluate(_ => 
        {
            window.scrollBy(0, window.innerHeight);
        });

        //get the data of the website
        let content = await page.content();

        //put all the content of the webpage into cheerio
        var $ = cheerio.load(content);
        //research all the items that we want to get
        $('.container .row #main .card .tab-content #tab-1 .chapters_list').each((index,item)=>
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
               // console.log(dataMangaChap)
            }
        })
        $('.container .row #main .card .tab-content #tab-1 .text-truncate').each((index,item)=>
        {
            const $elem = $(item);
            //verify if the class is the object that we want
            if($elem.attr('class') == "text-truncate")
            {
                //push the data into a board
                dataMangaName.push
                ({
                    //the data, we dont need to describe all the path but just the path after the class anime
                    en:$elem.find('.text-dark').text()
                })
            }
        })		       
        //close the browser
        browser.close();
        console.log("Manga ready to use.")
    })();
    //return/export data
    module.exports = { dataMangaChap, dataMangaName };
}

manga()
