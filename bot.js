const bot_settings = require('./bot_settings.json');
const Discord = require('Discord.js');
const AnimeFunc = require('./animeFunc.js'); 
const MangaFunc = require('./mangaFunc.js'); 
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const bot = new Discord.Client({});
const PREFIX = '!';
const youtube = new YouTube(bot_settings.GOOGLE_API_KEY);
//retrieve data from the function animeFunc.js
var DataAnime = AnimeFunc.dataAnime
//retrieve data from the function mangaFunc.js
var DataMangaChap = MangaFunc.dataMangaChap
var DataMangaName = MangaFunc.dataMangaName
//only the first word of the manga name
//var Manga="";

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
        //Print message to discord
        for (let j=0; j<DataAnime.length; j++)
        {
            //next stape, link that to mysql db
            if ((DataAnime[j].en == "Tensei Shitara Slime Datta Ken") || (DataAnime[j].en == "Tate no Yuusha no Nariagari") || (DataAnime[j].en == "Mob Psycho 100 II") || (DataAnime[j].en == "Kakegurui ××") || (DataAnime[j].en == "Sword Art Online: Alicization"))
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
    if(message.content.startsWith(`${PREFIX}manga`)) 
    {
        var Manga = message.content;
        var splitManga = Manga.split(" ")
        var LastValManga = splitManga[splitManga.length -1]
        let bool = 0;

        if(LastValManga != "!manga")
        {
            //Un manga à été demandé : !manga One
            //One pour One piece, mais on doit mettre seulement le premier mot du manga.
            for (let k=0; k<DataMangaChap.length; k++)
            {
                for (let m=0; m<DataMangaName.length; m++)
                {
                    let splitMangaEp = DataMangaChap[k].next_epiosode.split(" ")
                    let splitMangaEn = DataMangaName[m].en.split(" ")

                    //next stape, link that to mysql db
                    if ((splitMangaEp[0] == LastValManga) && (splitMangaEn[0] == LastValManga))
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
                                    name: DataMangaName[m].en,
                                    value: "**__Le chapitre sélectionné sortit est :__** " + DataMangaChap[k].next_epiosode
                                 }],
                                timestamp: new Date(),
                                footer: {
                                  icon_url: bot.user.avatarURL,
                                  text: "©"
                                }
                            }
                        });
                        bool = 1;
                        break;
                    }
                    if ((bool == 0) && (m == DataMangaName.length - 1) && (k == DataMangaChap.length - 1))
                    {
                        message.channel.send("Soit le manga séléctionné n'est pas encore sortit aujourdhui soit vous avez fais une érreur d'ortographe ! veuillez mettre seulement le premier mot du manga avec les majuscules ainsi que les minuscules, exemple, pour le manga 'One piece' il faut taper : !manga One")
                       // break;
                    }
                }
            }      
        }
        else 
        {
            //Aucun manga n'a été demandé : !manga
            //return TOUT les mangas sortits aujourdhui.
            for (let k=0; k<DataMangaChap.length; k++)
            {
                for (let m=0; m<DataMangaName.length; m++)
                {
                    let splitMangaEp = DataMangaChap[k].next_epiosode.split(" ")
                    let splitMangaEn = DataMangaName[m].en.split(" ")

                    //next stape, link that to mysql db
                    if ((splitMangaEp[0] == splitMangaEn[0]))
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
                                    name: DataMangaName[m].en,
                                    value: "**__Le/Les chapitres sorties aujourdhui est/sont :__** " + DataMangaChap[k].next_epiosode
                                 }],
                                timestamp: new Date(),
                                footer: {
                                  icon_url: bot.user.avatarURL,
                                  text: "©"
                                }
                            }
                        });
                        break;
                    }
                }
            }
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