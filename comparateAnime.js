
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
                    //notify the user
					msg("Hey <@!" +  parsedAddAnime[m].user_id + ">, " + "l'épisode numéro " + DataAnime[j].next_epiosode.replace(":", "") + " de " + parsedAddAnime[m].name_anime + " vient de sortir !")
					// change the number of the anime inside the ListAnime.json by the real data online.

/*				    let list_anime = { user_id: parsedAddAnime[m].user_id , name_anime: DataAnime[j].en, number_anime: DataAnime[j].next_epiosode.replace(":", "")}; 
                    parsedAddAnime.push(list_anime);
                    let ye = parsedAddAnime.splice(parsedAddAnime[m], 1)
					console.log(parsedAddAnime.splice(parsedAddAnime[m], 1))*/
                    
                    //parsedAddAnime.push(ye);
                    var yes = parsedAddAnime[m].number_anime = DataAnime[j].next_epiosode.replace(":","")
                    
                    parsedAddAnime.push(yes);
                    let JSON_anime = JSON.stringify(parsedAddAnime);
                    fs.writeFile("./DatabaseList/ListeAnime.json", JSON_anime, function(err, result) {
                        if(err) console.log('error', err);
                    });
/*                    var ye = delete parsedAddAnime[1]
                    parsedAddAnime.push(ye);
                    let JSON_OUE = JSON.stringify(parsedAddAnime);
                    fs.writeFile("./DatabaseList/ListeAnime.json", JSON_anime, function(err, result) {
                        if(err) console.log('error', err);
                    });*/

				}
			}
		}
	}
}
exports.notif = (bot, msg) => { var varnotif = setInterval(comparateAnime, 5000, bot, msg); }