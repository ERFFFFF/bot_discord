const cheerio = require('cheerio');
const bot_settings = require('./bot_settings.json');
const Discord = require('Discord.js');
const function_ = require('./function.js'); 
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const bot = new Discord.Client({});
const PREFIX = '!';
const youtube = new YouTube(bot_settings.GOOGLE_API_KEY);
const puppeteer = require('puppeteer');

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


        (async () => 
        {
            //launch pupeteer
            const browser = await puppeteer.launch(/*{headless: false}*/);

            //create a new page
            const page = await browser.newPage();

            //tell to the bot to go to the website
            await page.goto('https://www.livechart.me/', { waitUntil: 'networkidle2'});
            await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'});

            //Tell to the bot to scroll to the bottom of the page
            page.evaluate(_ => 
            {
                window.scrollBy(0, window.innerHeight);
            });

            //get the data of the website
            let content = await page.content();

            //board that will contain our final data
            let data=[];

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
                    data.push
                    ({ 
                        //the data, we dont need to describe all the path but just the path after the class anime
                        en:$element.find('.anime-card .main-title a').text(),
                        image:$element.find('.anime-card .poster-container img').attr('src'),//.slice(21, -1),
                        next_epiosode:$element.find('.anime-card .poster-container .episode-countdown').text().slice(2, 4),
                        countdown:$element.find('.anime-card .poster-container time').text()
                    })
                }
            })
            //Print message to discord
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
                                value: "Sortie de l'épisode numéro " + data[j].next_epiosode + " dans : " + data[j].countdown
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
            //close the browser
            browser.close();
        })();
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
