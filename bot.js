
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
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

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
		let data = []
		function readTextFile()
		{
		    var file = "file://C:/Users/ERFFFFF/Desktop/anichart.html"
		    var rawFile = new XMLHttpRequest();
		    rawFile.open("GET", file, false);
		    rawFile.onreadystatechange = function ()
		    {
		    			//console.log('Page récupéré !')
		                var data1 = rawFile.responseText;
		                const $ = cheerio.load(data1);
		                $('.main-content .browse .browse__content .calendar .section span').each((index,item)=>
		                {
		                //	console.log('Contenue de la page trouvé !')
		                    const $element = $(item);
		                    if($element.attr('ng-repeat') == "b in series | filter:browseVm.filter | orderBy:browseVm.currentSort")
		                    {
		                    //	console.log('Items trouvé !')
		                        data.push
		                        ({
			                        en:$element.find('.item .title a').text(),
			                        image:$element.find('.item .image').attr('style').slice(21, -1),
			                        next_epiosode:$element.find('.item .airing span').text(),
			                        countdown:$element.find('.item .airing timer span').text().slice(1, -1)
		                        })
		                    }
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
		               // console.log(data.length)
		    }
		    rawFile.send(null);
		}
readTextFile()
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