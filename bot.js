// add bot to server => https://discord.com/oauth2/authorize?client_id=453669165362839563&scope=bot+applications.commands where the client id is the id of the bot, see more at discord developers
//discord
const Discord = require('Discord.js');
const bot = new Discord.Client({});

//bot settings
const bot_settings = require('./settings/bot_settings.json');

// mongoose
const mongoose = require("mongoose");

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
const jdr = require('./jdr.js');
// bot music
const music = require('./music.js');

//Prefix for the Botbrowser
const PREFIX = ',';

// connection to the database
mongoose.connect(
  `mongodb+srv://${bot_settings.UsernameMongo}:${bot_settings.PasswordMongo}@cluster0.skkqx.mongodb.net/${bot_settings.DatabaseNameMongo}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
);

const connection = mongoose.connection;
var db = null
connection.on("error", console.error.bind(console, "connection error: "));
connection.once("open", () => {
  console.log('Connected to Atlas Mongo.');
  db = connection.db;
});

bot.on('ready', () => {
  //msg('Bot is up !');
  bot.users.fetch("150251967959138304").then(result => { bot.user.setActivity(result.username + ' ptite salope'); })

});

/* BOT SECTION */
bot.on('message', async (message) => {
  function msg(msg) {
    message.channel.send(msg);
  }
  function msgFile(msg, file) {
    message.channel.send(msg, { files: [file] });
  }
  //console.log(message.author.id)
  //¨PRIVATE MESSAGE
  // hiroi
  // bot.users.cache.get("160835265928232961").send("poulet")
  // mougow id
  //bot.users.cache.get("150251967959138304").send("salut ma cocotte")
  if (!message.content.startsWith(PREFIX)) return;
  if (message.author.bot) return;
  /* Test */
  if (message.content.toString() === `${PREFIX}test`) {
    let test = 'Ceci est un test. oui';
    msg(test);
  }
  /* Random number between 0 and 100 */
  if (message.content.toString() === `${PREFIX}random`) {
    msg(Math.floor(Math.random() * 101));
  }
  /* DELETE, NEED FURTHER API */
  /*
  if (message.content.startsWith(`${PREFIX}anime`)) {
    //anime.anime(bot, msg, PREFIX, message);
  }
  */
  /* DELETE, NEED FURTHER API */
  /*
  if (message.content.startsWith(`${PREFIX}addanime`)) {
    //anime.addanime(bot, msg, PREFIX, message);
  }
  */
  /* DELETE, NEED FURTHER API */
  /*
  if (message.content.startsWith(`${PREFIX}delanime`)) {
    //anime.delanime(bot, msg, PREFIX, message);
  }
  */
  /* DELETE, NEED FURTHER API */
  /*
  if (message.content.toString() === `${PREFIX}myanimelist`) {
    anime.myanimelist(bot, msg, PREFIX, message);
  }
  */
  /* Answer the cctl question. 100% acuracy */
  if (message.content.startsWith(`${PREFIX}cctl`)) {
    cctl.cctlRandom(msg, message);
  }
  /* Delete X message on the current channel. */
  if (message.content.startsWith(`${PREFIX}prune`)) {
    prune.prune(msg, message);
  }
  /* a revoir, continuer a dev */
  if (message.content.startsWith(`${PREFIX}mymemo`)) {
    memo.mymemo(bot, msg, message, PREFIX, db);
  }
  /* a revoir, continuer a dev */
  if (message.content.startsWith(`${PREFIX}addmemo`)) {
    memo.addmemo(msg, message, PREFIX, db);
  }
  /* a revoir, continuer a dev */
  if (message.content.startsWith(`${PREFIX}delmemo`)) {
    memo.delmemo(msg, PREFIX, message, db);
  }
  /* Show all the commands */
  if (message.content.toString() === `${PREFIX}help`) {
    help.help(bot, msg, PREFIX);
  }
  /* Play a music with a youtube link */
  if (message.content.startsWith(`${PREFIX}play`)) {
    music.play(msg, message);
  }
  /* Skip the current music */
  if (message.content.toString() === `${PREFIX}skip`) {
    music.skip(msg, PREFIX);
  }
  /* Stop the current music */
  if (message.content.toString() === `${PREFIX}stop`) {
    music.stop(msg);
  }
  /* Reset the DB */
  if (message.content.toString() === `${PREFIX}resetDB`) {
    if (
      message.member.permissions.has('ADMIN') |
      (message.author.id == bot_settings.SUPER_ADMIN_ID)
    ) {
      // list collections
      //db.listCollections().toArray((error, collections) => { console.log(collections) })
      db.dropCollection('Memo')
      db.dropCollection('User')
      db.createCollection('Memo')
      db.createCollection('User')
      console.log("Collections reseted !");
      msg("Collections reseted ! ")
    }
  }
  /* Dice for JDR */
  if (message.content.startsWith(`${PREFIX}dice`)) {
    jdr.dice(msg, message);
  }
  /* Cards mage for JDR */
  if (message.content.toString() === `${PREFIX}card`) {
    jdr.card(msgFile, message);
  }
});

bot.login(bot_settings.token);