const axios = require('axios');
const cheerio = require('cheerio');
const bot_settings = require('./bot_settings.json');
const Discord = require('Discord.js');
const function_ = require('./function.js'); 
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const bot = new Discord.Client({});
const PREFIX = '!';
const youtube = new YouTube(bot_settings.GOOGLE_API_KEY);
//npm install phantom --save
var phantom = require('phantom');

bot.on('ready', () => 
{
    let bot_connected = `Bot ${bot.user.username} is ready.`;
    var channel = bot.channels.get('315164681130213386');
    channel.send(bot_connected);
    bot.user.setActivity('Peter des gueules');
});

bot.on('message', async message => 
{

    if(!message.content.startsWith(PREFIX)) return;
    if(message.author.bot) return;
    let test = 'Ceci est un test.';
    let oun = function_.hello();

    if(message.content.toString() === `${PREFIX}rs`) 
    {
        process.exit();
    }

    if(message.content.toString() === `${PREFIX}test`) 
    {
        message.channel.send(test);
    }

    if(message.content.toString() === `${PREFIX}random`) 
    {
        message.channel.send(Math.floor(Math.random() * 101));
    }
    if(message.content.toString() === `${PREFIX}anime`) 
    {
        const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch(/*{headless: false}*/);
  const page = await browser.newPage();

  await page.goto('https://anichart.net/Winter-2019', { waitUntil: 'networkidle2'});
  await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'});

  page.evaluate(_ => {
    window.scrollBy(0, window.innerHeight);
  });

  let content = await page.content();
  let data=[]

  var $ = cheerio.load(content);

    $('.site-theme-default #app .main-content .chart-view .card-list .media-card').each((index,item)=>
    {
      //console.log('Contenue de la page trouvé !')
        const $element = $(item);
        if($element.attr('class') == "media-card")
        {
          //console.log('Items trouvé !')
            data.push
            ({ 
                en:$element.find('.cover .overlay').text(),
                image:$element.find('.cover img').attr('src'),//.slice(21, -1),
                next_epiosode:$element.find('.data .scroller .scroller-wrap .body .header .episode').text(),
                countdown:$element.find('.data .scroller .scroller-wrap .body .header .countdown').text()
            })
        }
        console.log(data)
    })

    for (var j=0; j<data.length; j++)
    {
        if ((data[j].en == "Tensei Shitara Slime Datta Ken"))
        {
            message.channel.send({embed: 
                {
                    color: 3447003,
                    author: {
                      name: bot.user.username,
                      icon_url: bot.user.avatarURL
                    },
                    image: 
                    {
                        url: data[j].image
                    },
                    fields:
                    [{
                        name: data[j].en,
                        value: "Sortie du prochain épisode dans : " + data[j].countdown
                     }],
                    timestamp: new Date(),
                    footer: {
                      icon_url: bot.user.avatarURL,
                      text: "©"
                    }
                }
            });
        }
    }    
/*  let data = await page.evaluate(() => {

    let title = document.querySelector('div[class="day"] > h2').innerText

    return title



  })*/

  console.log(data)

  browser.close();
})();

 //return  document.querySelectorAll(".site-theme-default, .noscript modern-browser, a").innerHTML
/*
        var phantom = require('phantom');
        var _ph, _page, _outObj;

        phantom.create()
        .then(ph => {
            _ph = ph;
            return _ph.createPage();
        })
        .then(page => {
            _page = page;
             return _page.open('https://anichart.net/airing')
        })

      //  .then(function(oui) {
//console.log(oui)
//return _page.includeJs("https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js")
            //return _page.property('cont');
       // })
        .then(function(cont) 
        {
            console.log(cont)
            var oui = _page.evaluate(function() {
               // var $ = res;
               // return $(".site-theme-default #app .main-content .airing-view .calendar day h2");
               return document; 
            })
            return oui
        })
        .then(function(finalRes) {
            console.log("HTML=<"+finalRes+">")
        })

        .catch(e => console.log(e));
        */
    }
});

//vocal bot music
bot.on('message', async message => 
{
    const args = message.content.split(' ');
    if (!message.guild) return;

    if (message.content.startsWith(`${PREFIX}play`))
    {
        if (message.member.voiceChannel)
        {

            const connection = await message.member.voiceChannel.join();

            try 
            {
                const dispatcher = connection.playStream(ytdl(args[1], { filter: 'audioonly' }));
                dispatcher.setVolume(0.5);
            } catch (error) { console.error(error)};
        }

        else 
        {
          message.channel.send('Le bot ne peut pas rejoindre le channel vocal vu que tu es pas dedans. (fdp)');
        }
  }

  if (message.content.toString() === `${PREFIX}leave`) {

    if (message.member.voiceChannel) {
    const deconnection = await message.member.voiceChannel.leave();
    
    }
  }
  
});
    
bot.login(bot_settings.token);