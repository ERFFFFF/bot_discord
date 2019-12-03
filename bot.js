const bot_settings = require('./bot_settings.json');
const Discord = require('Discord.js');
const AnimeFunc = require('./animeFunc.js'); 
const MangaFunc = require('./mangaFunc.js');
const bot = new Discord.Client({});
const notifAnime = require('./comparateAnime.js');
const delay = require("./delay.js");
const anime = require("./anime.js");
// File reader, writer
var fs = require("fs");
//MUSIC BOT
var opusscript = require("opusscript");
bot.music = require("discord.js-musicbot-addon");

//Prefix for the Botbrowser
const PREFIX = ',';

var list_AddNomAnime = 0;

function cl(Message)
{
    console.log(Message)
}

bot.on('ready', () => 
{
    var channel = bot.channels.get('589224223470256129')
    function msg(msgs)
    {
        channel.send(msgs);
    }
    notifAnime.notif(bot, msg)
    
    bot.user.setActivity('Peter des gueules');
});

bot.on('message', async message => 
{    
    function msgs(msg)
    {
        message.channel.send(msg);
    }

    //¨PRIVATE MESSAGE
    bot.users.get("157510824426995714").send("poulet")

    if(!message.content.startsWith(PREFIX)) return;
    if(message.author.bot) return;
    let test = 'Ceci est un test. oui';
    if(message.content.toString() === `${PREFIX}rs`) 
    {
        let admin_id = message.author.id;
        if(admin_id == "157510824426995714")
        {
            msgs("Bot restarting....");
            process.exit();
        }
    }
    if(message.content.toString() === `${PREFIX}test`) 
    {
        msgs(test);
    }
    if(message.content.toString() === `${PREFIX}random`) 
    {
        msgs(Math.floor(Math.random() * 101));
    }
    if(message.content.startsWith(`${PREFIX}anime`)) 
    {
        let Anime = message.content;
        anime.anime(bot,msgs,Anime, PREFIX)
    }
    if(message.content.startsWith(`${PREFIX}addanime`))
    {
        // GET user id
        let user_id_addAnime = message.author.id;
        // GET message
        let AddAnime = message.content;
        anime.addanime(bot, msgs, PREFIX, user_id_addAnime, AddAnime)
    }
    if(message.content.startsWith(`${PREFIX}delanime`))
    {
        // Get user id
        let user_id_delanime = message.author.id;
        // GET message
        let DelAnime = message.content;
        anime.delanime(bot, msgs, PREFIX, user_id_delanime, DelAnime)
    }
    if(message.content.toString() === `${PREFIX}myanimelist`)
    {
        // Get user id
        let user_id_getAnime = message.author.id;
        anime.myanimelist(bot, msgs, PREFIX, user_id_getAnime)
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
                msgs("D'après le théorème de Syd, la question " + valuecctl + " est la bonne réponse."); 
                break;

            case "3":
                msgs("D'après le théorème de Syd, la question " + valuecctl + " est la bonne réponse."); 
                break;

            case "4":
                msgs("D'après le théorème de Syd, la question " + valuecctl + " est la bonne réponse."); 
                break;

            case "5":
                msgs("D'après le théorème de Syd, la question " + valuecctl + " est la bonne réponse.");
                break;

            default:
                msgs("Hey déso mais le théorème de Syd ne marche pas quand il y a " + intrandomcctl  + " questions :'( rip")
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
            if(LastValPrune <= 100)
            {
                // Delete X message
                message.channel.bulkDelete(LastValPrune);
            }
            else
            {
                msgs("Erreur, la taille maximale pour un prune est de 100.")
            }
        }

    }
    if(message.content.toString() === `${PREFIX}mymemo`)
    {
        let user_id_memo = message.author.id;
        // Read file
        let contentGetMemo = fs.readFileSync('./DatabaseList/ListeMemo.json');
        // Transorm json file into array
        let parsedGetMemo = JSON.parse(contentGetMemo);
        let list_memo = []

        let sexe = []

        for (let i=0; i<parsedGetMemo.length; i++)
        {
            if(parsedGetMemo[i].user_id == user_id_memo)
            {
                list_memo.push(i, "**",parsedGetMemo[i].name_memo, "** \n",parsedGetMemo[i].content_memo, "\n");
                sexe.push({name: parsedGetMemo[i].name_memo, value: parsedGetMemo[i].content_memo})
            }
        }
        let string_memo = list_memo.join().replace(/,/g, " ");
         
        msgs({embed: 
        {
            color: 3447003,
            author: {
              name: bot.user.username,
              icon_url: bot.user.avatarURL
            },
            fields: sexe,
            timestamp: new Date(),
            footer: {
              icon_url: bot.user.avatarURL,
              text: "©"
            }
        }})
    }
    if(message.content.startsWith(`${PREFIX}addmemo`))
    {
        // GET user id
        let user_id_addMemo = message.author.id;
        // GET message
        let AddMemo = message.content;
        // Split message and get last word the user entered
        let sentenceAddMemo = AddMemo.split(" ");
        let list_AddMemo=[];
        // Send Message to a price User.
        /*
        let MessageUser = bot.users.get("ID USER");
        MessageUser.send("You need to wake up my friend! your id is : " + "ID USER");
        */

        if((sentenceAddMemo[0] == `${PREFIX}addmemo`) && (sentenceAddMemo[1] != null)) 
        {
            // Read file
            let contentGetMemo = fs.readFileSync('./DatabaseList/ListeMemo.json');
            // Transorm json file into array
            let parsedGetMemo = JSON.parse(contentGetMemo);

            let bool = 1;
            
            let contentMemo = "";
            for (let h=2; h<sentenceAddMemo.length; h++)
            {
                tempMemo = sentenceAddMemo[h];
                contentMemo = contentMemo + " " + tempMemo;
            }
            
            for (let m=0; m<parsedGetMemo.length; m++)
            {
                if((sentenceAddMemo[1].toLowerCase() == parsedGetMemo[m].name_memo.toLowerCase()) && (parsedGetMemo[m].user_id == user_id_addMemo))
                {  
                    msgs("tutututu kestufé, tu as déjà ajouté ce mémo à ta liste perso, essaie pas de m'arnaquer.");
                    bool = 0;
                }
            }
            if((sentenceAddMemo[1].length <=256) && (contentMemo.length <=1024))
            {
                if(bool == 1)
                {
                    let contentAddMemo = fs.readFileSync('./DatabaseList/ListeMemo.json');
                    let parsedAddMemo = JSON.parse(contentAddMemo);
                    let list_Memo = { user_id: user_id_addMemo, name_memo: sentenceAddMemo[1], content_memo: contentMemo}; 
                    parsedAddMemo.push(list_Memo);
                    let JSON_memo = JSON.stringify(parsedAddMemo);
                    fs.writeFile("./DatabaseList/ListeMemo.json", JSON_memo, function(err, result) {
                        if(err) console.log('error', err);
                    });
                    bool = 1;
                    msgs("<@!" +  user_id_addMemo + ">, " + "Le mémo **" + sentenceAddMemo[1] + "** avec le contenu : **" + contentMemo + "** à bien été ajouté à ta liste personelle !");
                }                
            }
            else
            {
                msgs("tutututu kestufé, ta cru tu voulais réécrire la bible fdp, fais un titre et un content plus cours sale chien, pour un titre c'est max 256 characteres et la t'en as " + sentenceAddMemo[1].length + " et dans le content c'est max 1024 charactères et la t'en as " + contentMemo.length);
            }
        }   
    }
    if(message.content.startsWith(`${PREFIX}delmemo`))
    {
        // Get user id
        let user_id_delmemo = message.author.id;
        // Read file
        let contentGetMemo = fs.readFileSync('./DatabaseList/ListeMemo.json');
        // Transorm json file into array
        let parsedGetMemo = JSON.parse(contentGetAnime);
        // GET message
        let DelMemo = message.content;
        // Split message and get last word the user entered
        let sentenceDelMemo = DelMemo.split(" ");

        let bool = 0;

        if((sentenceDelMemo[0] == `${PREFIX}delmemo`) && (sentenceDelAnime[1] != null) && (sentenceDelAnime[2] == null))
        {
            for (let m=0; m<parsedGetMemo.length; m++)
            {
                if((sentenceDelMemo[1].toLowerCase() == parsedGetMemo[m].toLowerCase()) && (parsedGetMemo[m].user_id == user_id_delmemo))
                {                    
                    msgs("<@!" +  user_id_delmemo + ">, " + "Le Mémo " + parsedGetMemo[m].name_anime + " à bien été supprimer de ta liste personelle !");
                    parsedGetMemo.splice(m, 1);
                    let JSON_Memo = JSON.stringify(parsedGetMemo);
                    fs.writeFile("./DatabaseList/ListeAnime.json", JSON_Memo, function(err, result) {
                        if(err) console.log('error', err);
                    });
                    bool = 1;
                    break;
                }
                if ((bool == 0) && (m == parsedGetMemo.length - 1))
                {
                    msgs("Déso gros mais tu essaye de supprimer un animé n'étant pas dans ta liste personelle. (spoiler : du coup tu supprime R)");
                }
            }
        }
    }
    if(message.content.toString() === `${PREFIX}help`)
    {
        msgs({embed: 
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
                    { name: `${PREFIX}prune x`, value: "Permet de supprimer x messages dans un channel.\n x = nombres de messages à supprimer"},
                    { name: `${PREFIX}addmanga nom_manga nombre_chapitre`, value: "ajoute un manga à votre lise personnelle. \n nom_manga = nom du manga mettre un _ à la place des espaces. \n nombre_chapitre = numéro du chapitre auquel vous etes. \n Exemple : addmanga one_piece 934"},
                    { name: `${PREFIX}delmanga nom_manga`, value: "Permet de supprimer un manga de votre liste personnelle \n Exemple : delmanga one_piece \n Le nom du manga que vous supprimer doit être le même que le nom du manga dans votre liste personnelle."},
                    { name: `${PREFIX}addmemo titre content`, value: "Permet d'ajouter un mémo. \n titre = Je_suis_un_titre (le titre doit être un seul mot) \n content = je suis un paragraphe. (paragraphe/phrase à mettre dans le mémo)"},
                    { name: `${PREFIX}mymemo`, value: "Permet d'afficher votre liste de mémo.'"}
                  
                ],
                timestamp: new Date(),
                footer: {
                  icon_url: bot.user.avatarURL,
                  text: "©"
                }
            }
        });
    }
    
// TTS MESSAGE
/*   if(message.content.toString() === `${PREFIX}tts`)
   {
        //console.log("yes")
        msgs("text", {tts:true})
   }*/
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

