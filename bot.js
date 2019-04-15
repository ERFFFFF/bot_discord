const bot_settings = require('./bot_settings.json');
const Discord = require('Discord.js');
const AnimeFunc = require('./animeFunc.js'); 
const MangaFunc = require('./mangaFunc.js'); 
const bot = new Discord.Client({});

//Prefix for the Botbrowser
const PREFIX = '?';

// Delay, sleep, wait function.
function delay(timeout) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
}

//MUSIC BOT
var opusscript = require("opusscript");
bot.music = require("discord.js-musicbot-addon");

// File reader, writer
var fs = require("fs");

var list_AddNomAnime = 0;

bot.on('ready', () => 
{
    var channel = bot.channels.get('315164681130213386');
    bot.user.setActivity('Peter des gueules');
});


bot.on('message', async message => 
{
    if(!message.content.startsWith(PREFIX)) return;
    if(message.author.bot) return;
    let test = 'Ceci est un test. oui';

    if(message.content.toString() === `${PREFIX}rs`) 
    {
        let user_id_addAnime = message.author.id;
        if(user_id_addAnime == "157510824426995714")
        {
            message.channel.send("Bot restarting....");
            process.exit();
        }
        
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
        let sentenceAnime = Anime.split(" ");
        let bool = 0;

        // Retrieve data from the function animeFunc.js
        let DataAnime = AnimeFunc.anime();
        
        // if the array is not completed, waiting.
        while(DataAnime.length == 0)
        {
            await delay(1);
        }

        //si le premier mot est égale = !anime et que le deuxime est null (que le deuxieme mot n'existe pas)
        if((sentenceAnime[0] == `${PREFIX}anime`) && (sentenceAnime[1] != null) && (sentenceAnime[2] == null))
        {
            for (let j=0; j<DataAnime.length; j++)
            {
                let splitanime = DataAnime[j].en.split(" ");
                //next stape, link that to mysql db
                if ((splitanime[0].toLowerCase() == sentenceAnime[1].toLowerCase()))
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
                                value: "Sortie de l'épisode numéro " + DataAnime[j].next_epiosode + " dans : " + DataAnime[j].countdown + "\n" + DataAnime[j].description
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
        if((sentenceAnime[0] == `${PREFIX}anime`) && (sentenceAnime[1] != null) && (sentenceAnime[2] != null))
        {
            for (let j=0; j<DataAnime.length; j++)
            {
                let splitanime = DataAnime[j].en.split(" ");
                //next stape, link that to mysql db
                if ((splitanime[0].toLowerCase() == sentenceAnime[1].toLowerCase()) && (splitanime[1].toLowerCase() == sentenceAnime[2].toLowerCase()))
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
                                value: "Sortie de l'épisode numéro " + DataAnime[j].next_epiosode + " dans : " + DataAnime[j].countdown + "\n" + DataAnime[j].description
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
        if((sentenceAnime[0] == `${PREFIX}anime`) && (sentenceAnime[1] == null)) 
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
                    dividedAnimeBeginning.push({ en: DataAnime[i].en });
                    list_allAnimeBegin.push("=> ", dividedAnimeBeginning[j].en, "\n");
                    j++;
                }
                else if((i <= dataintdividedby1p5) && (i >= dataintdividedby3))
                {
                    dividedAnimeMid.push({ en: DataAnime[i].en });     
                    list_allAnimeMid.push("=> ", dividedAnimeMid[k].en, "\n");
                    k++;
                }
                else if((i <= DataAnime.length) && (i >= dataintdividedby1p5))
                {
                    dividedAnimeEnd.push({ en: DataAnime[i].en });
                    list_allAnimeEnd.push("=> ",dividedAnimeEnd[l].en, "\n");
                    l++;
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
    }
    if(message.content.startsWith(`${PREFIX}manga`)) 
    {
        let Manga = message.content;
        let sentenceManga = Manga.split(" ");
        let bool = 0;

        let RetieveManga = MangaFunc.manga();
        //Retrieve data from the function mangaFunc.js
        let DataMangaChap = RetieveManga[0];
        let DataMangaName = RetieveManga[1];
        // if the array is not completed, waiting.
        while((DataMangaChap.length == 0))
        {
            await delay(1);
        }

        if((sentenceManga[0] == `${PREFIX}manga`) && (sentenceManga[1] != null) && (sentenceManga[2] == null))
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
                    if ((splitMangaEp[0].toLowerCase() == sentenceManga[1].toLowerCase()) && (splitMangaEn[0].toLowerCase() == sentenceManga[1].toLowerCase()))
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
        if((sentenceManga[0] == `${PREFIX}manga`) && (sentenceManga[1] != null) && (sentenceManga[2] != null))
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
                    if ((splitMangaEp[0].toLowerCase() == sentenceManga[1].toLowerCase()) && (splitMangaEn[0].toLowerCase() == sentenceManga[1].toLowerCase()) && (splitMangaEp[1].toLowerCase() == sentenceManga[2].toLowerCase()) && (splitMangaEn[1].toLowerCase() == sentenceManga[2].toLowerCase()))
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
        if((sentenceManga[0] == `${PREFIX}manga`) && (sentenceManga[1] == null)) 
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
    if(message.content.startsWith(`${PREFIX}addanime`))
    {
        // GET user id
        let user_id_addAnime = message.author.id;
        // GET message
        let AddAnime = message.content;
        // Split message and get last word the user entered
        let sentenceAddAnime = AddAnime.split(" ");
        let list_Addanime=[];
        // Send Message to a price User.
        /*
        let MessageUser = bot.users.get("ID USER");
        MessageUser.send("You need to wake up my friend! your id is : " + "ID USER");
        */
        let DataAnime = AnimeFunc.anime();
        
        while(DataAnime.length == 0)
        {
            await delay(1);
        }

        if((sentenceAddAnime[0] == `${PREFIX}addanime`) && (sentenceAddAnime[1] != null) && (sentenceAddAnime[2] == null)) 
        {
            // Read file
            let contentGetAnime = fs.readFileSync('./DatabaseList/ListeAnime.json');
            // Transorm json file into array
            let parsedGetAnime = JSON.parse(contentGetAnime);
            // GET message
            let DelAnime = message.content;
            // Split message and get last word the user entered
            let sentenceDelAnime = DelAnime.split(" ");
            let bool = 1;

            for (let m=0; m<parsedGetAnime.length; m++)
            {
                let splitDelanime = parsedGetAnime[m].name_anime.split(" ");
                if((sentenceDelAnime[1].toLowerCase() == splitDelanime[0].toLowerCase()) && (parsedGetAnime[m].user_id == user_id_addAnime))
                {  
                    message.channel.send("tutututu kestufé, tu as déjà ajouté cet animé à ta liste perso, essaie pas de m'arnaquer.");
                    bool = 0;
                }
            }
            if(bool == 1)
            {
                for (let h=0; h<DataAnime.length; h++)
                {
                    let splitaddanime = DataAnime[h].en.split(" ")
                    //next stape, link that to mysql db
                    if ((splitaddanime[0].toLowerCase() == sentenceAddAnime[1].toLowerCase()))
                    {
                        let contentAddAnime = fs.readFileSync('./DatabaseList/ListeAnime.json');
                        let parsedAddAnime = JSON.parse(contentAddAnime);
                        let list_anime = { user_id: user_id_addAnime, name_anime: DataAnime[h].en }; 
                        parsedAddAnime.push(list_anime);
                        let JSON_anime = JSON.stringify(parsedAddAnime);
                        fs.writeFile("./DatabaseList/ListeAnime.json", JSON_anime, function(err, result) {
                            if(err) console.log('error', err);
                        });
                        bool = 1;
                        message.channel.send("<@!" +  user_id_addAnime + ">, " + "L'animé " + DataAnime[h].en + " à bien été ajouté à ta liste personelle !");
                        break;
                    }
                    if ((bool == 0) && (h == DataAnime.length - 1))
                    {
                        message.channel.send("Désolé mais ton animé existe pas gros (soit il est pas entrain de sortir sois tu l'as mal ortographié)");   
                    }                
                }               
            }

        }
        if((sentenceAddAnime[0] == `${PREFIX}addanime`) && (sentenceAddAnime[1] != null) && (sentenceAddAnime[2] != null)) 
        {
            // Read file
            let contentGetAnime = fs.readFileSync('./DatabaseList/ListeAnime.json');
            // Transorm json file into array
            let parsedGetAnime = JSON.parse(contentGetAnime);
            // GET message
            let DelAnime = message.content;
            // Split message and get last word the user entered
            let sentenceDelAnime = DelAnime.split(" ");
            let bool = 1;

            for (let m=0; m<parsedGetAnime.length; m++)
            {
                let splitDelanime = parsedGetAnime[m].name_anime.split(" ");
                if((sentenceDelAnime[1].toLowerCase() == splitDelanime[0].toLowerCase()) && (parsedGetAnime[m].user_id == user_id_addAnime) && (sentenceDelAnime[2].toLowerCase() == splitDelanime[1].toLowerCase()))
                {  
                    message.channel.send("tutututu kestufé, tu as déjà ajouté cet animé à ta liste perso, essaie pas de m'arnaquer.");
                    bool = 0;
                }
            }
            if(bool == 1)
            {
                for (let h=0; h<DataAnime.length; h++)
                {
                    let splitaddanime = DataAnime[h].en.split(" ")
                    //next stape, link that to mysql db
                    if ((splitaddanime[0].toLowerCase() == sentenceAddAnime[1].toLowerCase()) && (splitaddanime[1].toLowerCase() == sentenceAddAnime[2].toLowerCase()))
                    {
                        let contentAddAnime = fs.readFileSync('./DatabaseList/ListeAnime.json');
                        let parsedAddAnime = JSON.parse(contentAddAnime);
                        let list_anime = { user_id: user_id_addAnime, name_anime: DataAnime[h].en }; 
                        parsedAddAnime.push(list_anime);
                        let JSON_anime = JSON.stringify(parsedAddAnime);
                        fs.writeFile("./DatabaseList/ListeAnime.json", JSON_anime, function(err, result) {
                            if(err) console.log('error', err);
                        });
                        bool = 1;
                        message.channel.send("<@!" +  user_id_addAnime + ">, " + "L'animé " + DataAnime[h].en + " à bien été ajouté à ta liste personelle !");
                        break;
                    }
                    if ((bool == 0) && (h == DataAnime.length - 1))
                    {
                        message.channel.send("Désolé mais ton animé existe pas gros (soit il est pas entrain de sortir sois tu l'as mal ortographié)");   
                    }                
                }               
            }

        }
        if((sentenceAddAnime[0] == `${PREFIX}addanime`) && (sentenceAddAnime[1] == null))
        {
            message.channel.send(`kestu fais gros, si tu fais juste la commande ${PREFIX}addanime sa fais rien du tout`);
        }
    }
    if(message.content.startsWith(`${PREFIX}delanime`))
    {
        // Get user id
        let user_id_delanime = message.author.id;
        // Read file
        let contentGetAnime = fs.readFileSync('./DatabaseList/ListeAnime.json');
        // Transorm json file into array
        let parsedGetAnime = JSON.parse(contentGetAnime);
        // GET message
        let DelAnime = message.content;
        // Split message and get last word the user entered
        let sentenceDelAnime = DelAnime.split(" ");

        let bool = 0;

        if((sentenceDelAnime[0] == `${PREFIX}delanime`) && (sentenceDelAnime[1] != null) && (sentenceDelAnime[2] == null))
        {
            for (let m=0; m<parsedGetAnime.length; m++)
            {
                let splitDelanime = parsedGetAnime[m].name_anime.split(" ");
                if((sentenceDelAnime[1].toLowerCase() == splitDelanime[0].toLowerCase()) && (parsedGetAnime[m].user_id == user_id_delanime))
                {                    
                    message.channel.send("<@!" +  user_id_delanime + ">, " + "L'animé " + parsedGetAnime[m].name_anime + " à bien été supprimer de ta liste personelle !");
                    parsedGetAnime.splice(m, 1);
                    let JSON_anime = JSON.stringify(parsedGetAnime);
                    fs.writeFile("./DatabaseList/ListeAnime.json", JSON_anime, function(err, result) {
                        if(err) console.log('error', err);
                    });
                    bool = 1;
                    break;
                }
                if ((bool == 0) && (m == parsedGetAnime.length - 1))
                {
                    message.channel.send("Déso gros mais tu essaye de supprimer un animé n'étant pas dans ta liste personelle. (spoiler : du coup tu supprime R)");
                }
            }
        }
        if((sentenceDelAnime[0] == `${PREFIX}delanime`) && (sentenceDelAnime[1] != null) && (sentenceDelAnime[2] != null))
        {
            for (let m=0; m<parsedGetAnime.length; m++)
            {
                let splitDelanime = parsedGetAnime[m].name_anime.split(" ");
                if((sentenceDelAnime[1].toLowerCase() == splitDelanime[0].toLowerCase()) && (parsedGetAnime[m].user_id == user_id_delanime) && (sentenceDelAnime[2].toLowerCase() == splitDelanime[1].toLowerCase()))
                {                    
                    message.channel.send("<@!" +  user_id_delanime + ">, " + "L'animé " + parsedGetAnime[m].name_anime + " à bien été supprimer de ta liste personelle !");
                    parsedGetAnime.splice(m, 1);
                    let JSON_anime = JSON.stringify(parsedGetAnime);
                    fs.writeFile("./DatabaseList/ListeAnime.json", JSON_anime, function(err, result) {
                        if(err) console.log('error', err);
                    });
                    bool = 1;
                    break;
                }
                if ((bool == 0) && (m == parsedGetAnime.length - 1))
                {
                    message.channel.send("Déso gros mais tu essaye de supprimer un animé n'étant pas dans ta liste personelle. (spoiler : du coup tu supprime R)");
                }
            }
        }
        if((sentenceDelAnime[0] == `${PREFIX}delanime`) && (sentenceDelAnime[1] == null))
        {
            message.channel.send(`kestu fais gros, si tu fais juste la commande ${PREFIX}delanime sa fais rien du tout`);
        }
    }
    if(message.content.toString() === `${PREFIX}myanimelist`)
    {
        // Get user id
        let user_id_getAnime = message.author.id;
        // Read file
        let contentGetAnime = fs.readFileSync('./DatabaseList/ListeAnime.json');
        // Transorm json file into array
        let parsedGetAnime = JSON.parse(contentGetAnime);
        
        let DataAnime = AnimeFunc.anime();
        
        while(DataAnime.length == 0)
        {
            await delay(1);
        }

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
        let intrandomcctl = parseInt(LastValrandomcctl);
        let valuecctl = Math.floor(Math.random() * intrandomcctl) + 1;

        switch (LastValrandomcctl)
        {
            case "2":
                message.channel.send("D'après le théorème de Syd, la question " + valuecctl + " est la bonne réponse."); 
                break;

            case "3":
                message.channel.send("D'après le théorème de Syd, la question " + valuecctl + " est la bonne réponse."); 
                break;

            case "4":
                message.channel.send("D'après le théorème de Syd, la question " + valuecctl + " est la bonne réponse."); 
                break;

            case "5":
                message.channel.send("D'après le théorème de Syd, la question " + valuecctl + " est la bonne réponse.");
                break;

            default:
                message.channel.send("Hey déso mais le théorème de Syd ne marche pas quand il y a " + intrandomcctl  + " questions :'( rip")
                break;
        }
    }
    //Delete X message on the current channel.
    if(message.content.startsWith(`${PREFIX}prune`))
    {
        let user_id_addAnime = message.author.id;
        if(user_id_addAnime == "157510824426995714")
        {
            // GET message
            let PruneMessage = message.content;
            // Split message and get last word the user entered
            let splitPrune = PruneMessage.split(" ");
            let LastValPrune = splitPrune[splitPrune.length -1];
            // Delete X message
            message.channel.bulkDelete(LastValPrune);
        }

    }
    if(message.content.toString() === `${PREFIX}help`)
    {
        message.channel.send({embed: 
            {
                color: 3447003,
                author: {
                  name: bot.user.username,
                  icon_url: bot.user.avatarURL
                },
                fields:
                [
                    { name: `${PREFIX}anime`, value: "Liste les animés en cours de parutions"},
                    { name: `${PREFIX}anime nom_anime`, value: "Permets de voir en détail un animé. \n nom_anime = premier mot ou premier & deuxieme mot de l'animé. \n Exemple : Tate no Yuusha no Nariagari \n -> Tate \n -> Tate no"},
                    { name: `${PREFIX}rs`, value: "Restart le bot."},
                    { name: `${PREFIX}random`, value: "Nombre random entre 0 et 100."},
                    { name: `${PREFIX}manga`, value: "Liste les mangas qui sont sorties aujourdhui"},
                    { name: `${PREFIX}manga nom_manga`, value: "Permets de voir en détail un manga. \n nom_manga = premier mot ou premier & deuxieme mot du manga. \n Exemple : Tate no Yuusha no Nariagari \n -> Tate \n -> Tate no"},
                    { name: `${PREFIX}addanime nom_anime`, value: "Permet d'ajouter un animé à votre liste personnelle. \n nom_anime = premier mot ou premier & deuxieme mot de l'animé. \n Exemple : Tate no Yuusha no Nariagari \n -> Tate \n -> Tate no"},
                    { name: `${PREFIX}delanime nom_anime`, value: "Permet de supprimer un animé de votre liste personnelle. \n nom_anime = premier mot ou premier & deuxieme mot de l'animé. \n Exemple : Tate no Yuusha no Nariagari \n -> Tate \n -> Tate no"},
                    { name: `${PREFIX}myanimelist`, value: "Liste les animés de votre liste personnelle"},
                    { name: `${PREFIX}cctl x`, value: "Utilise un algorithme mathématique permettant de déterminer la réponse à une question de N'IMPORTE quel cctl. \n x = nombre de questions possibles (nombre entre 2 et 5)"},
                    { name: `${PREFIX}prune x`, value: "Permet de supprimer x messages dans un channel.\n x = nombres de messages à supprimer"}
                ],
                timestamp: new Date(),
                footer: {
                  icon_url: bot.user.avatarURL,
                  text: "©"
                }
            }
        });
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


// New method for get words of an user for the commands

/*let Anime = message.content;
let splitAnime = Anime.split(" ");
if((splitAnime[0] == "!anime") && (splitAnime[1] == null))
{
    // !anime
    console.log("je suis juste !anime")
}
if(((splitAnime[0] == "!anime") && (splitAnime[1] != null)) && (splitAnime[2] == null))
{
    // !anime Tensei
    console.log("je suis juste !anime anime")
}
if(((splitAnime[0] == "!anime") && (splitAnime[1] != null)) && (splitAnime[2] != null))
{
    // !anime Tensei
    console.log("je suis juste !anime anime anime")
}*/