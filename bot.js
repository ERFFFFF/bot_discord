//discord
const Discord = require('Discord.js');
const bot = new Discord.Client({});

//bot settings
const bot_settings = require('./settings/bot_settings.json');

// created commands
//const AnimeFunc = require('./animeFunc.js');
//const MangaFunc = require('./mangaFunc.js');
//const notifAnime = require('./comparateAnime.js');
const delay = require('./delay.js');
//const anime = require('./anime.js');
const cctl = require('./cctl.js');
const prune = require('./prune.js');
const memo = require('./memo.js');
const help = require('./help.js');
const restart = require('./restart.js');
// bot music
const music = require('./music.js');
// File reader, writer
var fs = require('fs');
//MUSIC BOT
//bot.music = require('discord.js-musicbot-addon');

// scraper for MyAnimeList
const malScraper = require('mal-scraper');
const { VoiceChannel } = require('discord.js');

//Prefix for the Botbrowser
const PREFIX = ',';

// connection to the database
const MongoClient = require('mongodb').MongoClient;
const NameDB = bot_settings.DatabaseNameMongo;
const uri = `mongodb+srv://${bot_settings.UsernameMongo}:${bot_settings.PasswordMongo}@cluster0.skkqx.mongodb.net/${NameDB}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var list_AddNomAnime = 0;

bot.on('ready', () => {
  //notifAnime.notif(bot, msg);

  //msg('Bot is up !');
  bot.user.setActivity('Peter des gueules');
});
var db = null;
var collectionMemo = null;
client.connect((err) => {
  db = client.db(NameDB);
  collectionMemo = db.collection('memo');
  console.log('Connected to Atlas Mongo.');
});
bot.on('message', async (message) => {
  function msgs(msg) {
    message.channel.send(msg);
  }

  //¨PRIVATE MESSAGE
  // hiroi
  // bot.users.cache.get("160835265928232961").send("poulet")

  if (!message.content.startsWith(PREFIX)) return;
  if (message.author.bot) return;
  /* Restart the bot */
  if (message.content.toString() === `${PREFIX}rs`) {
    restart.rs(bot, msgs, message);
  }
  /* Test */
  if (message.content.toString() === `${PREFIX}test`) {
    let test = 'Ceci est un test. oui';
    msgs(test);
  }
  /* Rnadom number between 0 and 100 */
  if (message.content.toString() === `${PREFIX}random`) {
    msgs(Math.floor(Math.random() * 101));
  }
  /* REWORK */
  if (message.content.startsWith(`${PREFIX}anime`)) {
    //anime.anime(bot, msgs, PREFIX, message);
  }
  /* REWORK */
  if (message.content.startsWith(`${PREFIX}addanime`)) {
    //anime.addanime(bot, msgs, PREFIX, message);
  }
  /* REWORK */
  if (message.content.startsWith(`${PREFIX}delanime`)) {
    //anime.delanime(bot, msgs, PREFIX, message);
  }
  /* REWORK */
  if (message.content.toString() === `${PREFIX}myanimelist`) {
    //anime.myanimelist(bot, msgs, PREFIX, message);
  }
  /* Answer the cctl question. 100% acuracy */
  if (message.content.startsWith(`${PREFIX}cctl`)) {
    cctl.cctlRandom(msgs, message);
  }
  /* Delete X message on the current channel. */
  if (message.content.startsWith(`${PREFIX}prune`)) {
    prune.prune(msgs, message);
  }
  if (message.content.startsWith(`${PREFIX}mymemo`)) {
    memo.mymemo(bot, msgs, message, PREFIX, db);
  }
  if (message.content.startsWith(`${PREFIX}addmemo`)) {
    memo.addmemo(msgs, message, PREFIX, db);
  }
  if (message.content.startsWith(`${PREFIX}delmemo`)) {
    memo.delmemo(msgs, PREFIX, message, db);
  }
  /* Show all the commands */
  if (message.content.toString() === `${PREFIX}help`) {
    help.help(bot, msgs, PREFIX);
  }
  if (message.content.startsWith(`${PREFIX}play`)) {
    music.play(msgs, message);
  }
  if (message.content.toString() === `${PREFIX}skip`) {
    music.skip(msgs, PREFIX);
  }
  if (message.content.toString() === `${PREFIX}stop`) {
    music.stop(msgs);
  }
  /* TEST */
  if (message.content.toString() === `${PREFIX}yes`) {
    const name = 'Fugou Keiji: Balance:Unlimited';
    // get data of an anime
    malScraper
      .getInfoFromName(name)
      .then((data) => {
        console.log(data.picture);
        message.channel.send(data.picture);
      })
      .catch((err) => console.log(err));

    // get list of aired on a particular anime
    malScraper
      .getEpisodesList(name)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }
  /* Reset the DB */
  if (message.content.toString() === `${PREFIX}resetDB`) {
    if (
      message.member.permissions.has('ADMIN') |
      (user_id_addAnime == bot_settings.SUPER_ADMIN_ID)
    ) {
      collectionMemo.drop();
      db.createCollection('memo');
    }
  }
});

//client.close();

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
