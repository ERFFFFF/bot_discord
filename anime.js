// show animelist, add an anime, delete an anime, show all the anime.
const AnimeFunc = require('./animeFunc.js'); 
var fs = require("fs");
const delay = require('./delay.js');

function replaceContents(file, replacement, cb) {

  fs.readFile(replacement, (err, contents) => {
    if (err) return cb(err);
    fs.writeFile(file, contents, cb);
  });

}

exports.anime = (bot, msg, PREFIX, message) =>
{
	(async () => 
    {
        let Anime = message.content;
	    let sentenceAnime = Anime.split(" ");
	    let bool = 0;

	    // Retrieve data from the function animeFunc.js
	    let DataAnime = AnimeFunc.anime();
	    
	    // if the array is not completed, waiting.
	    while(DataAnime.length == 0)
	    {
	        await delay.delay(1);
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
	                msg({embed: 
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
	                msg("Soit l'Animé séléctionné n'est pas encore sortit aujourdhui soit vous avez fais une érreur d'ortographe ! veuillez mettre seulement le premier mot de l'animé avec les majuscules ainsi que les minuscules, exemple, pour l'animé 'Tensei Shitara Slime Datta Ken' il faut taper : !manga Tensei");   
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
	                msg({embed: 
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
	                msg("Soit l'Animé séléctionné n'est pas encore sortit aujourdhui soit vous avez fais une érreur d'ortographe ! veuillez mettre seulement le premier mot de l'animé avec les majuscules ainsi que les minuscules, exemple, pour l'animé 'Tensei Shitara Slime Datta Ken' il faut taper : !manga Tensei");   
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
                        msg("aieaie ERROR");
                }
                msg({embed: 
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
	})();
}

exports.addanime = (bot, msg, PREFIX, message) =>
{
	(async () => 
    {
    	// GET user id
        let user_id_addAnime = message.author.id;
        // GET message
        let AddAnime = message.content;
        // Split message and get last word the user entered
        let sentenceAddAnime = AddAnime.split(" ");
        // Send Message to a price User.
        
        //let MessageUser = bot.users.get("ID USER");
        //MessageUser.send("You need to wake up my friend! your id is : " + "ID USER");
        
        let DataAnime = AnimeFunc.anime();
        
        while(DataAnime.length == 0)
        {
            await delay.delay(1);
        }

        if((sentenceAddAnime[0] == `${PREFIX}addanime`) && (sentenceAddAnime[1] != null) && (sentenceAddAnime[2] == null)) 
        {
            // Read file
            let contentGetAnime = fs.readFileSync('./DatabaseList/ListeAnime.json');
            // Transorm json file into array
            let parsedGetAnime = JSON.parse(contentGetAnime);
            // Split message and get last word the user entered
            let sentenceAddAnime = AddAnime.split(" ");
            let bool = 1;

            for (let m=0; m<parsedGetAnime.length; m++)
            {
                let splitAddAnime = parsedGetAnime[m].name_anime.split(" ");
                if((sentenceAddAnime[1].toLowerCase() == splitAddAnime[0].toLowerCase()) && (parsedGetAnime[m].user_id == user_id_addAnime))
                {  
                    msg("tutututu kestufé, tu as déjà ajouté cet animé à ta liste perso, essaie pas de m'arnaquer.");
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
                        let list_anime = { user_id: user_id_addAnime, name_anime: DataAnime[h].en, number_anime: DataAnime[h].next_epiosode.replace(":", "")}; 
                        parsedAddAnime.push(list_anime);
                        let JSON_anime = JSON.stringify(parsedAddAnime);
                        fs.writeFile("./DatabaseList/ListeAnime.json", JSON_anime, function(err, result) {
                            if(err) console.log('error', err);
                        });
                        bool = 1;
                        msg("<@!" +  user_id_addAnime + ">, " + "L'animé " + DataAnime[h].en + " à bien été ajouté à ta liste personelle !");
                        break;
                    }
                    if ((bool == 0) && (h == DataAnime.length - 1))
                    {
                        msg("Désolé mais ton animé existe pas gros (soit il est pas entrain de sortir sois tu l'as mal ortographié)");   
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
            // Split message and get last word the user entered
            let sentenceAddAnime = AddAnime.split(" ");
            let bool = 1;

            for (let m=0; m<parsedGetAnime.length; m++)
            {
                let splitAddAnime = parsedGetAnime[m].name_anime.split(" ");
                if((sentenceAddAnime[1].toLowerCase() == splitAddAnime[0].toLowerCase()) && (parsedGetAnime[m].user_id == user_id_addAnime) && (sentenceAddAnime[2].toLowerCase() == splitAddAnime[1].toLowerCase()))
                {  
                    msg("tutututu kestufé, tu as déjà ajouté cet animé à ta liste perso, essaie pas de m'arnaquer.");
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
                        let list_anime = { user_id: user_id_addAnime, name_anime: DataAnime[h].en, number_anime: DataAnime[h].next_epiosode.replace(":", "")}; 
                        parsedAddAnime.push(list_anime);
                        let JSON_anime = JSON.stringify(parsedAddAnime);
                        fs.writeFile("./DatabaseList/ListeAnime.json", JSON_anime, function(err, result) {
                            if(err) console.log('error', err);
                        });
                        bool = 1;
                        msg("<@!" +  user_id_addAnime + ">, " + "L'animé " + DataAnime[h].en + " à bien été ajouté à ta liste personelle !");
                        break;
                    }
                    if ((bool == 0) && (h == DataAnime.length - 1))
                    {
                        msg("Désolé mais ton animé existe pas gros (soit il est pas entrain de sortir sois tu l'as mal ortographié)");   
                    }                
                }               
            }
        }
        if((sentenceAddAnime[0] == `${PREFIX}addanime`) && (sentenceAddAnime[1] == null))
        {
            msg(`kestu fais gros, si tu fais juste la commande ${PREFIX}addanime sa fais rien du tout`);
        }
    
	})();
}
exports.delanime = (bot, msg, PREFIX, message) =>
{
	(async () => 
    {
    	// Get user id
        let user_id_delanime = message.author.id;
        // GET message
        let DelAnime = message.content;
        // Read file
        let contentGetAnime = fs.readFileSync('./DatabaseList/ListeAnime.json');
        // Transorm json file into array
        let parsedGetAnime = JSON.parse(contentGetAnime);

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
                    msg("<@!" +  user_id_delanime + ">, " + "L'animé " + parsedGetAnime[m].name_anime + " à bien été supprimer de ta liste personelle !");
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
                    msg("Déso gros mais tu essaye de supprimer un animé n'étant pas dans ta liste personelle. (spoiler : du coup tu supprime R)");
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
                    msg("<@!" +  user_id_delanime + ">, " + "L'animé " + parsedGetAnime[m].name_anime + " à bien été supprimer de ta liste personelle !");
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
                    msg("Déso gros mais tu essaye de supprimer un animé n'étant pas dans ta liste personelle. (spoiler : du coup tu supprime R)");
                }
            }
        }
        if((sentenceDelAnime[0] == `${PREFIX}delanime`) && (sentenceDelAnime[1] == null))
        {
            msg(`kestu fais gros, si tu fais juste la commande ${PREFIX}delanime sa fais rien du tout`);
        }
	})();
}
exports.myanimelist = (bot, msg, PREFIX, message) =>
{
	(async () => 
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
            await delay.delay(1);
        }
        
        if(parsedGetAnime.length != 0)
        {
	        for (let j=0; j<DataAnime.length; j++)
	        {
	            for (let m=0; m<parsedGetAnime.length; m++)
	            {
	                if ((DataAnime[j].en == parsedGetAnime[m].name_anime) && (parsedGetAnime[m].user_id == user_id_getAnime))
	                {
	                    msg({embed: 
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
    	else
    	{
    		msg("Déso gros mais tu n'as pas d'anime dans ta liste perso.");
    	}
	})();
}