const bot_settings = require('./bot_settings.json');
const Discord = require('Discord.js');
const AnimeFunc = require('./animeFunc.js'); 
const MangaFunc = require('./mangaFunc.js'); 
const bot = new Discord.Client({});

//Prefix for the Botbrowser
const PREFIX = '!';

//Retrieve data from the function animeFunc.js
var DataAnime = AnimeFunc.dataAnime

//Retrieve data from the function mangaFunc.js
var DataMangaChap = MangaFunc.dataMangaChap
var DataMangaName = MangaFunc.dataMangaName

//MUSIC BOT
var opusscript = require("opusscript");
bot.music = require("discord.js-musicbot-addon");

var fs = require("fs");

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
    if(message.content.startsWith(`${PREFIX}anime`)) 
    {
        let Anime = message.content;
        let splitAnime = Anime.split(" ");
        let LastValAnime = splitAnime[splitAnime.length -1];
        let bool = 0;
        
        if(LastValAnime != "!anime")
        {
            //Print message to discord
            for (let j=0; j<DataAnime.length; j++)
            {
                let splitanime = DataAnime[j].en.split(" ")

                //next stape, link that to mysql db
                if ((splitanime[0] == LastValAnime))
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
                    bool = 1;
                    break;
                }
                if ((bool == 0) && (j == DataAnime.length - 1))
                {
                    message.channel.send("Soit l'Animé séléctionné n'est pas encore sortit aujourdhui soit vous avez fais une érreur d'ortographe ! veuillez mettre seulement le premier mot de l'animé avec les majuscules ainsi que les minuscules, exemple, pour l'animé 'Tensei Shitara Slime Datta Ken' il faut taper : !manga Tensei");
                }
            }
        }
        else 
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
    }
    if(message.content.startsWith(`${PREFIX}manga`)) 
    {
        let Manga = message.content;
        let splitManga = Manga.split(" ");
        let LastValManga = splitManga[splitManga.length -1];
        let bool = 0;

        if(LastValManga != "!manga")
        {
            //Un manga à été demandé : !manga One
            //One pour One piece, mais on doit mettre seulement le premier mot du manga.
            for (let k=0; k<DataMangaChap.length; k++)
            {
                for (let m=0; m<DataMangaName.length; m++)
                {
                    let splitMangaEp = DataMangaChap[k].next_epiosode.split(" ");
                    let splitMangaEn = DataMangaName[m].en.split(" ");

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
                        message.channel.send("Soit le manga séléctionné n'est pas encore sortit aujourdhui soit vous avez fais une érreur d'ortographe ! veuillez mettre seulement le premier mot du manga avec les majuscules ainsi que les minuscules, exemple, pour le manga 'One piece' il faut taper : !manga One");
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
                    let splitMangaEp = DataMangaChap[k].next_epiosode.split(" ");
                    let splitMangaEn = DataMangaName[m].en.split(" ");

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
    if(message.content.startsWith(`${PREFIX}add`))
    {
        var obj = { name: "John", age: 30, city: "New York" }; 
        var myJSON = JSON.stringify(obj);
        fs.writeFile("test.json", myJSON, function(err, result) {
            if(err) console.log('error', err);
        }
        );
        /*
        var dataAnime = fs.readFile("test.json");
        var datafile = JSON.parse("dataAnime");
        console.log(datafile);*/

        /* TEST git pc portable depuis sublimedd/ */
    }
});

bot.music.start(bot, {
  // Set the api key used for YouTube.
  // This is required to run the bot.
  youtubeKey: bot_settings.GOOGLE_API_KEY,
  // The PLAY command Object.
  play: {
    // Usage text for the help command.
    usage: "{{PREFIX}}play Youtube_links",
    // Whether or not to exclude the command from the help command.
    exclude: false  
  },

  // Make it so anyone in the voice channel can skip the
  // currently playing song.
  anyoneCanSkip: true,

  // Make it so the owner (you) bypass permissions for music.
  ownerOverMember: true,
  ownerID: "yourDiscordId",

  // The cooldown Object.
  cooldown: {
    // This disables the cooldown. Not recommended.
    enabled: false
  }
});

bot.login(bot_settings.token);
