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
const { VoiceChannel } = require('discord.js');
const fetch = require('node-fetch');
// Chromium controler
// puppeteer-extra in an extra module of puppeteer
const puppeteer = require('puppeteer-extra');
// puppeteer-extra-plugin-recaptcha is an extra module for puppeteer-extra
// in order to RecaptchaPlugin to work, we need to add fund to the website "2captcha"
// moreover, to resolve a captcha it need between 10 and 60 seconds.
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha');
var browser = '';

var request = require('request');

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

bot.on('ready', () => {
  //notifAnime.notif(bot, msg);

  //msg('Bot is up !');
  bot.user.setActivity('Peter des gueules');
});
/* Connect to the Database */
var db = null;
var collectionMemo = null;
client.connect((err) => {
  db = client.db(NameDB);
  collectionMemo = db.collection('memo');
  console.log('Connected to Atlas Mongo.');
});

/* We use express to get the code token for anilist. We get this code when we accept the authorization on localhost:8000/*/
var express = require('express');
var app = express();
var token_anilist = '';
// after login to anilist with the link => https://anilist.co/api/v2/oauth/authorize?client_id=${bot_settings.anilist_client_id}&redirect_uri=${bot_settings.anilist_redirect_uri}&response_type=code or the /command ,connect
app.get('/', function (req, res) {
  // request to localhost:8000/ and get the code and transform it into a token
  let options = {
    uri: 'https://anilist.co/api/v2/oauth/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    json: {
      grant_type: 'authorization_code',
      client_id: bot_settings.anilist_client_id,
      client_secret: bot_settings.anilist_secret,
      redirect_uri: 'http://127.0.0.1:8000/', // http://example.com/callback
      code: req.query.code, // The Authorization Code received previously
    },
  };
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      token_anilist = body.access_token;
      // show token of anilist
      console.log(token_anilist);
      // close browser
      browser.close();
    }
  });
});
var server = app.listen(8000, 'localhost', function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});

/* BOT SECTION */
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
  // connect user to anilist
  if (message.content.toString() === `${PREFIX}connect`) {
    (async () => {
      msgs('Connecting...');
      // add params
      puppeteer.use(
        RecaptchaPlugin({
          provider: {
            id: '2captcha',
            token: bot_settings.token_2capcha, // token of 2captcha with funds
          },
          visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
        })
      );

      // without navigation

      const browser = await puppeteer
        // headless: true => without showing the navigation
        // headless: false => not showing the navigation
        .launch({ headless: true })
        .then(async (browser) => {
          const page = await browser.newPage();
          // Change the signature of the bot: bot => user
          await page.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'
          );
          await page.setExtraHTTPHeaders({
            'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
          });

          //tell to the bot to go to the website
          await page.goto(
            `https://anilist.co/login?apiVersion=v2&client_id=${bot_settings.anilist_client_id}&redirect_uri=${bot_settings.anilist_redirect_uri}&response_type=code`,
            {
              waitUntil: 'networkidle2',
            }
          );
          // set the email
          await page.type('[placeholder="Email"]', bot_settings.EmailAnilist);
          // set the password
          await page.type(
            '[placeholder="Password"]',
            bot_settings.PasswordAnilist
          );
          // resolve Recaptcha
          await page.solveRecaptchas();
          // login + wait loading of the page
          await Promise.all([page.waitForNavigation(), page.click(`.submit`)]);
          // close the browser
          //await browser.close();
        });

      // show the navigation
      /*
      browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: false,
      });
*/
      /*
      //create a new page
      const page = await browser.newPage();
      // set timeout to 70 seconds (cuz the program take ~60s)
      await page.setDefaultNavigationTimeout(0);

      try {
        //tell to the bot to go to the website
        await page.goto(
          `https://anilist.co/login?apiVersion=v2&client_id=${bot_settings.anilist_client_id}&redirect_uri=${bot_settings.anilist_redirect_uri}&response_type=code`,
          {
            waitUntil: 'networkidle2',
          }
        );

        await page.type('[placeholder="Email"]', bot_settings.EmailAnilist);

        await page.type(
          '[placeholder="Password"]',
          bot_settings.PasswordAnilist
        );

        // resolve Recaptcha
        await page.solveRecaptchas();

        // submit
        await Promise.all([
          // click on the login button
          page.click(`.submit`),
          browser.on('targetchanged', () => {
            console.log('salut');
          }),
          page.waitForNavigation(),
          // close the browser after clicking on submit
          //browser.close(),
        ]);

        /* after submit */
      //await page.waitForNavigation();
      // AUTHORIZE THE APP
      //console.log('New Page URL:', page.url());

      /*
        console.log('9');
        msgs('Connected !');
        */
      /*
      } catch (error) {
        console.log(error);
        msgs('Impossible de se connecter à anilist.');
        // close browser
        //await browser.close();
      }
      */
    })();
  }
  /* TEST */
  if (message.content.toString() === `${PREFIX}yes`) {
    // request to make (user is authenticated)
    var query = `
    mutation ($about: String) {
      UpdateUser(about: $about) {
        about
      }
    }
    `;
    // variables used for the query
    var variables = {
      // variables qui va remplacer le $about dans la mutation UpdateUser
      about: 'je suis un test !',
    };
    // make a request with the token to make authenticated requests
    let url = 'https://graphql.anilist.co',
      options = {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token_anilist,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          query: query,
          variables: variables,
        }),
      };
    fetch(url, options)
      .then(handleResponse)
      .then(handleData)
      .catch(handleError);
    function handleResponse(response) {
      return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
      });
    }
    function handleData(data) {
      console.log('data => ', data);
      msgs('Requête bien effectuée !');
    }

    function handleError(error) {
      console.error(error);
      msgs("Impossible d'effectuer l'action demandée.");
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

/* GET ANIME BY NAME FROM PAGE 1 TO 3
var query = `
query ($id: Int, $page: Int, $perPage: Int, $search: String) {
  Page (page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media (id: $id, search: $search) {
      id
      title {
        romaji
      }
    }
  }
}
`;

var variables = {
    search: "Fate/Zero",
    page: 1,
    perPage: 3
};

var url = 'https://graphql.anilist.co',
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    };

fetch(url, options).then(handleResponse)
                   .then(handleData)
                   .catch(handleError);

*/

/* GET ANIME BY ID
    var query = `
     query ($id: Int) { # Define which variables will be used in the query (id)
       Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
         id
         title {
           romaji
           english
           native
         }
       }
     }
     `;

    // Define our query variables and values that will be used in the query request
    var variables = {
      id: 15125,
    };

    // Define the config we'll need for our Api request
    var url = 'https://graphql.anilist.co',
      options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          query: query,
          variables: variables,
        }),
      };

    // Make the HTTP Api request
    fetch(url, options)
      .then(handleResponse)
      .then(handleData)
      .catch(handleError);

    function handleResponse(response) {
      return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
      });
    }

    function handleData(data) {
      console.log('data => ', data);
    }

    function handleError(error) {
      alert('Error, check console');
      console.error(error);
    }
    */

/* REQUETE FAITE PAR MOI QUI CHANGE LA BIO ANILIST AVEC FULL EXPLICATIONS
// request to make (user is authenticated)
var query = `
    // type de la requete soit <query> ou <mutation>, query => general, mutation => user est authentifié
    // les parametres de la mutation sont la déclaration des parametres de la/les mutation(s) utilisé(es), içi UpdateUser avec <about>
    mutation ($about: String) {
      // mutation a faire, içi UpdateUser avec comme parametres about (ce quon veut changer/effectuer)
      // $about => variables a écrire
      UpdateUser(about: $about) {
        // ce qu'on doit display, (a voir dans le type, içi dans le type <user> on peut afficher <about>)
        about
      }
    }
    `;
// variables used for the query
var variables = {
  // variables qui va remplacer le $about dans la mutation UpdateUser
  about: 'je suis un test !',
};
// make a request with the token to make authenticated requests
let url = 'https://graphql.anilist.co',
  options = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token_anilist,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  };
fetch(url, options).then(handleResponse).then(handleData).catch(handleError);
function handleResponse(response) {
  return response.json().then(function (json) {
    return response.ok ? json : Promise.reject(json);
  });
}
function handleData(data) {
  console.log('data => ', data);
}

function handleError(error) {
  console.error(error);
}
*/
