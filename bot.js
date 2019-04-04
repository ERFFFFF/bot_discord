const bot_settings = require('./bot_settings.json');
const Discord = require('Discord.js');
const AnimeFunc = require('./animeFunc.js'); 
const MangaFunc = require('./mangaFunc.js'); 
const bot = new Discord.Client({});

//Prefix for the Botbrowser
const PREFIX = '?';

function delay(timeout) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
}

/*function animeData() {
    return new Promise((resolve) => {
      var DataAnime = AnimeFunc.anime()
      resolve(DataAnime)
    });
    console.log(DataAnime)
}*/
//Retrieve data from the function mangaFunc.js
var DataMangaChap = MangaFunc.dataMangaChap
var DataMangaName = MangaFunc.dataMangaName

//MUSIC BOT
var opusscript = require("opusscript");
bot.music = require("discord.js-musicbot-addon");

var fs = require("fs");

var list_AddNomAnime = 0;

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
        //Retrieve data from the function animeFunc.js
       // let DataAnime = AnimeFunc.anime()
       // besoin dune promise pasque probleme avec asynchrone, résolution : promise qui fait du synchrone afin dattendre que la fonction ce soit bien executé pour continuer le programme
      //  await animeData();
      AnimeFunc.anime().then((dataAnime) => {
        let DataAnime = dataAnime;
        let Anime = message.content;
        let splitAnime = Anime.split(" ");
        let LastValAnime = splitAnime[splitAnime.length -1];
        let bool = 0;
        console.log(DataAnime)
        console.log(dataAnime)
        if(LastValAnime != `${PREFIX}anime`)
        {
            for (let j=0; j<DataAnime.length; j++)
            {
                let splitanime = DataAnime[j].en.split(" ")
                //next stape, link that to mysql db
                if ((splitanime[0] == LastValAnime))
                {
                    //Print message to discord

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
            let dividedAnimeBeginning = [], dividedAnimeMid = [], dividedAnimeEnd = [], list_allAnimeBegin = [], list_allAnimeMid = [], list_allAnimeEnd = [];

            let dataintdividedby3 = DataAnime.length/3;
            let dataintdividedby1p5 = DataAnime.length/1.5;

            let j = k = l = datafloatdividedby3 = datafloatdividedby1p5 = 0;

            // Si le résultat du module est diferrent de zero, c'est un float donc on le transforme en int.
            if((dataintdividedby3 % 1) != 0)
            {
                datafloatdividedby3 = 1 - (dataintdividedby3 % 1);
                dataintdividedby3 = dataintdividedby3 + datafloatdividedby3;
            }
            if((dataintdividedby1p5 % 1) != 0)
            {
                datafloatdividedby1p5 = 1 - (dataintdividedby1p5 % 1);
                dataintdividedby1p5 = dataintdividedby1p5 + datafloatdividedby1p5;
            }

            // On sépare la liste Dataanime en trois, discord ne peut pas afficher plus de 1024 caracteres
            // environ 60 animés, que l'on divise en trois parties donc 20/20/20
            for (let i=0; i<DataAnime.length; i++)
            {
                if(i <= dataintdividedby3)
                {
                    dividedAnimeBeginning.push({ en: DataAnime[i].en })
                    list_allAnimeBegin.push("=> ", dividedAnimeBeginning[j].en, "\n")
                    j++
                }
                else if((i <= dataintdividedby1p5) && (i >= dataintdividedby3))
                {
                    dividedAnimeMid.push({ en: DataAnime[i].en })                    
                    list_allAnimeMid.push("=> ", dividedAnimeMid[k].en, "\n")
                    k++
                }
                else if((i <= DataAnime.length) && (i >= dataintdividedby1p5))
                {
                    dividedAnimeEnd.push({ en: DataAnime[i].en })
                    list_allAnimeEnd.push("=> ",dividedAnimeEnd[l].en, "\n")
                    l++
                }
            }

            // .join : array to string, .replace : on enleve TOUTES les virgules.
            let final_listAnimeBegin = list_allAnimeBegin.join().replace(/,/g, " "); 
            let final_listAnimeMid = list_allAnimeMid.join().replace(/,/g, " ");
            let final_listAnimeEnd = list_allAnimeEnd.join().replace(/,/g, " ");

            let displayAnime = "";

            // print on discord
            for(let i=0; i<3; i++)
            {

                switch (i)
                {
                    case 0:
                        displayAnime = final_listAnimeBegin;
                        break;

                    case 1:
                        displayAnime = final_listAnimeMid;
                        break;

                    case 2:
                        displayAnime = final_listAnimeEnd;
                        break;
                    default:
                        message.channel.send("aieaie ERROR");
                }
                message.channel.send({embed: 
                {
                    color: 3447003,
                    author: {
                      name: bot.user.username,
                      icon_url: bot.user.avatarURL
                    },
                    fields:
                    [{
                        name: "Anime List : ",
                        value: " " + displayAnime
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
    })

    }
    if(message.content.startsWith(`${PREFIX}manga`)) 
    {
        let Manga = message.content;
        let splitManga = Manga.split(" ");
        let LastValManga = splitManga[splitManga.length -1];
        let bool = 0;

        if(LastValManga != `${PREFIX}manga`)
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
        // GET user id
        var user_id_addAnime = message.author.id
        // GET message
        let AddAnime = message.content;
        // Split message and get last word the user entered
        let splitAddAnime = AddAnime.split(" ");
        let LastValAddAnime = splitAddAnime[splitAddAnime.length -1];
        let bool = 0;
        let list_Addanime=[]
        // Send Message to a price User.
        /*
        let MessageUser = bot.users.get("ID USER");
        MessageUser.send("You need to wake up my friend! your id is : " + "ID USER");
        */
        if(LastValAddAnime != `${PREFIX}add`)
        {
            for (let h=0; h<DataAnime.length; h++)
            {
                let splitaddanime = DataAnime[h].en.split(" ")
                //next stape, link that to mysql db
                if ((splitaddanime[0] == LastValAddAnime))
                {
                    let contentAddAnime = fs.readFileSync('ListeAnime.json')
                    let parsedAddAnime = JSON.parse(contentAddAnime);
                    let list_anime = { user_id: user_id_addAnime, name_anime: DataAnime[h].en }; 
                    parsedAddAnime.push(list_anime)
                    let JSON_anime = JSON.stringify(parsedAddAnime);
                    fs.writeFile("ListeAnime.json", JSON_anime, function(err, result) {
                        if(err) console.log('error', err);
                    });
                    bool = 1;
                    break;
                }
                if ((bool == 0) && (h == DataAnime.length - 1))
                {
                    message.channel.send("Soit l'Animé séléctionné n'est pas encore sortit aujourdhui soit vous avez fais une érreur d'ortographe ! veuillez mettre seulement le premier mot de l'animé avec les majuscules ainsi que les minuscules, exemple, pour l'animé 'Tensei Shitara Slime Datta Ken' il faut taper : !manga Tensei");   
                }
            }
        }
    }
    if(message.content.toString() === `${PREFIX}mylistanime`)
    {
        // Get user id
        let user_id_getAnime = message.author.id
        // Read file
        let contentGetAnime = fs.readFileSync('ListeAnime.json')
        // Transorm json file into array
        let parsedGetAnime = JSON.parse(contentGetAnime);

        for (let j=0; j<DataAnime.length; j++)
        {
            for (let m=0; m<parsedGetAnime.length; m++)
            {
                if ((DataAnime[j].en == parsedGetAnime[m].name_anime) && (parsedGetAnime[m].user_id == user_id_getAnime))
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
    if(message.content.startsWith(`${PREFIX}cctl`))  
    {
        let randomcctl = message.content;
        let splitrandomcctl = randomcctl.split(" ");
        let LastValrandomcctl = splitrandomcctl[splitrandomcctl.length -1];
        let intrandomcctl = parseInt(LastValrandomcctl)
        let valuecctl = Math.floor(Math.random() * intrandomcctl) + 1;

        switch (LastValrandomcctl)
        {
            case "2":
                message.channel.send("D'après le théorème du pif, la question " + valuecctl + " est la bonne réponse."); 
                break;

            case "3":
                message.channel.send("D'après le théorème du pif, la question " + valuecctl + " est la bonne réponse."); 
                break;

            case "4":
                message.channel.send("D'après le théorème du pif, la question " + valuecctl + " est la bonne réponse."); 
                break;

            case "5":
                message.channel.send("D'après le théorème du pif, la question " + valuecctl + " est la bonne réponse.");
                break;

            default:
                message.channel.send("Hey déso mais jai pas de théorème quand il y a " + intrandomcctl  + " questions :'( rip")
                break;
        }
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
  ownerID: "157510824426995714",

  // The cooldown Object.
  cooldown: {
    // This disables the cooldown. Not recommended.
    enabled: false
  }
});

bot.login(bot_settings.token);

// token ainz 
//"token": "NDUzNjY5MTY1MzYyODM5NTYz.D0NtqQ.H6SAH8RDMC2bmUmF7IY6JBI6vXA",

// token putine
//"token": "MjI1MjE2MzY5ODIwNTY1NTA0.D2zv7A.S_qZGgKDhKyPEEaw5LM-SPI-7s8",
