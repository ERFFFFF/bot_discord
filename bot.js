//discord
const Discord = require('Discord.js');
const bot = new Discord.Client({});

//bot settings
const bot_settings = require('./settings/bot_settings.json');

// created commands
const AnimeFunc = require('./animeFunc.js'); 
const MangaFunc = require('./mangaFunc.js');
const notifAnime = require('./comparateAnime.js');
const delay = require("./delay.js");
const anime = require("./anime.js");
const cctl = require("./cctl.js");
const prune = require("./prune.js");
const memo = require("./memo.js");
const help = require("./help.js");
const restart = require("./restart.js");

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
    // erfffff
    //bot.users.get("157510824426995714").send("poulet")
    // hiroi
    //bot.users.get("160835265928232961").send("poulet")

    if(!message.content.startsWith(PREFIX)) return;
    if(message.author.bot) return;
    if(message.content.toString() === `${PREFIX}rs`) 
    {
        restart.rs(bot, msgs, message)
    }
    if(message.content.toString() === `${PREFIX}test`) 
    {
        let test = 'Ceci est un test. oui';
        msgs(test);
    }
    if(message.content.toString() === `${PREFIX}random`) 
    {
        msgs(Math.floor(Math.random() * 101));
    }
    if(message.content.startsWith(`${PREFIX}anime`)) 
    {
        anime.anime(bot, msgs, PREFIX, message)
    }
    if(message.content.startsWith(`${PREFIX}addanime`))
    {
        anime.addanime(bot, msgs, PREFIX, message)
    }
    if(message.content.startsWith(`${PREFIX}delanime`))
    {
        anime.delanime(bot, msgs, PREFIX, message)
    }
    if(message.content.toString() === `${PREFIX}myanimelist`)
    {
        anime.myanimelist(bot, msgs, PREFIX, message)
    }
    if(message.content.startsWith(`${PREFIX}cctl`))  
    {
        cctl.cctlRandom(bot, msgs, message)
    }
    //Delete X message on the current channel.
    if(message.content.startsWith(`${PREFIX}prune`))
    {
        prune.prune(bot, msgs, message)
    }
    if(message.content.toString() === `${PREFIX}mymemo`)
    {
        memo.mymemo(bot, msgs, message)
    }
    if(message.content.startsWith(`${PREFIX}addmemo`))
    {
        memo.addmemo(bot, msgs, message, PREFIX)
    }
    if(message.content.startsWith(`${PREFIX}delmemo`))
    {
        memo.delmemo(bot, msgs, PREFIX, message)
    }
    if(message.content.toString() === `${PREFIX}help`)
    {
        help.help(bot, msgs, PREFIX)
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

