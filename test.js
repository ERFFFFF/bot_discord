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
        var phantom = require('phantom');
        var _ph, _page, _outObj;

        phantom.create()
          .then(ph => {
            _ph = ph;
            return _ph.createPage();
          })
          .then(page => {
            _page = page;
            var test = _page.open('https://anichart.net/airing')
                            .then(function() {
                                    _page.includeJs("https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js")
                                    .then(function() {
                                            _page.evaluate(function() {
                                                            return document.getElementById('app').innerHTML;
                                                           /* $('.listMain > li').each(
                                                                function () {

                                                                    console.log($(this).find('a').attr('href'));
                                                                }
                                                            );
                                                          },
                                                          function() {
                                                             _ph.exit()
                                                          }*/
                                                        })
                                            .then(function(toto){ console.log("HTML=<"+toto+">")})
                                        })
                              });
            return test;
          })
         /* .then(status => {
            console.log("status="+status);
            return _page.property('content');
          })
          .then(content => {
           // console.log(content);
            //_page.close();
            //_ph.exit();
          })*/
          .catch(e => console.log(e));

        
       // var data = []
        // Print all of the news items on hackernews
     //   var phantom = require('phantom');

        /*phantom.create(
            function (ph)
            {
              ph.createPage(
                function (page) {
                    var url = "https://anichart.net/airing";
                    page.open(url, 
                              function() {
                                    page.includeJs("https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js", 
                                                    function() {
                                                        page.evaluate(function() {
                                                                        $('.listMain > li').each(
                                                                            function () {
                                                                                console.log($(this).find('a').attr('href'));
                                                                            }
                                                                        );
                                                                      },
                                                                      function() {
                                                                         ph.exit()
                                                                      }
                                                        );
                                                    }
                                    );
                              }
                    );
                }
              );
            }
        );*/
        /*
         console.log("coucou");
        phantom.create(function (ph) {
            console.log("page1");
          ph.createPage(function (page) {
            console.log("page2");
            var url = "https://anichart.net/airing";
            page.open(url, function() {
                console.log("page3")
              page.includeJs("https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js", function() {
                console.log("page4")
                page.evaluate(function() {
                    console.log("page5")
                 //   const $ = cheerio.load(result);
            $('.main-content .browse .browse__content .calendar .section').each(function () {
                console.log('Contenue de la page trouvé !')
                const $element = $(item);
                if($element.find('span .item')){
                    console.log('Items trouvé !')
                    data.push
                    ({
                        en:$element.find('.title a').text(),
                        image:$element.find('.image').attr('style'),
                        next_epiosode:$element.find('.airing span').text(),
                        countdown:$element.find('.airing timer span').text()
                    })
                    console.log(data)
                }
                else {
                    console.log('aucun item trouvé')
                }
            })
            for (var j=0; j<data.length; j++){
                if ((data[j].en == "Tensei Shitara Slime Datta Ken") || (data[j].en == "Fukigen na Mononokean: Tsuzuki")){
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
                                value: data[j].countdown
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
        }, function(){
                  ph.exit()
                });
              });
            });
          });
        });*/
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