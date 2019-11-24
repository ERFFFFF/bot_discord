
const AnimeFunc = require('./animeFunc.js');
var fs = require("fs");
// Delay, sleep, wait function.
function delay(timeout) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
}

async function comparateAnime(bot, msg)
{
	let DataAnime = AnimeFunc.anime();
	while(DataAnime.length == 0)
	{
	    await delay(1);
	}

	let contentAddAnime = fs.readFileSync('./DatabaseList/ListeAnime.json');
	let parsedAddAnime = JSON.parse(contentAddAnime);
    for (let j=0; j<DataAnime.length; j++)
    {
        for (let m=0; m<parsedAddAnime.length; m++)
        {
            if ((DataAnime[j].en == parsedAddAnime[m].name_anime))
            {
            	//print the anime name, the data inside ListAnime.json and the real data online
				/*console.log("name\t" + parsedAddAnime[m].name_anime)
				console.log("bdd\t" + parsedAddAnime[m].number_anime)
				console.log("irl\t" + DataAnime[j].next_epiosode.replace(":",""))*/
				
				if (parsedAddAnime[m].number_anime != DataAnime[j].next_epiosode.replace(":","")) 
				{
					msg("Hey <@!" +  parsedAddAnime[m].user_id + ">, " + "un nouvel épisode de " + parsedAddAnime[m].name_anime + " vient de sortir !")
				}
			}
		}
	}
}
exports.notif = (bot, msg) => { var varnotif = setInterval(comparateAnime, 5000, bot, msg); }