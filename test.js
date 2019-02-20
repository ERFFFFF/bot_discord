const bot_settings = require('./bot_settings.json');
const Discord = require('Discord.js');
const AnimeFunc = require('./animeFunc.js'); 
const MangaFunc = require('./mangaFunc.js'); 
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const bot = new Discord.Client({});
const PREFIX = '!';
const youtube = new YouTube(bot_settings.GOOGLE_API_KEY);


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
        //retrieve data from the function animeFunc.js
        let DataAnime = AnimeFunc.dataAnime
        //Print message to discord
        for (var j=0; j<DataAnime.length; j++)
        {
            //next stape, link that to mysql db
            if ((DataAnime[j].en == "Tensei Shitara Slime Datta Ken"))
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
                            url: DataAnime[j].image
                        },
                        fields:
                        [{
                            name: DataAnime[j].en,
                            value: "Sortie de l'épisode numéro " + DataAnime[j].next_epiosode + " dans : " + DataAnime[j].countdown
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
    }
    if(message.content.toString() === `${PREFIX}manga`) 
    {
        let dataMangaChap = MangaFunc.dataMangaChap
        //next stape, link that to mysql db
        if ((dataMangaChap[j].next_epiosode == "Yuan Zun 25 VF: L’ascension de Zhou"))
        {
            message.channel.send({embed: 
                {
                    color: 3447003,
                    author: {
                      name: bot.user.username,
                      icon_url: bot.user.avatarURL
                    },
                    fields:
                    [{
                       // name: dataMangaName[j].en,
                        value: "Le/Les chapitres sorties aujourdhui est/sont : " + dataMangaChap[j].next_epiosode
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