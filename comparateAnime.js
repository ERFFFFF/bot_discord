
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

					// read TempListeAnime and put the new data of the anime
                    let contentAddAnimeTemp = fs.readFileSync('./DatabaseList/TempListeAnime.json');
					let parsedAddAnimeTemp = JSON.parse(contentAddAnimeTemp);
                    let new_list_anime = { user_id: parsedAddAnime[m].user_id , name_anime: parsedAddAnime[m].name_anime, number_anime: DataAnime[j].next_epiosode.replace(":", "")};
                    parsedAddAnimeTemp.push(new_list_anime);
                    let JSON_animeTemp = JSON.stringify(parsedAddAnimeTemp);
                    fs.writeFile("./DatabaseList/TempListeAnime.json", JSON_animeTemp, function(err, result) {
                        if(err) console.log('error', err);
                    });

                    // replace the content of the old data (ListeAnime) by the new data (TempListeAnime)
                    function replaceContents(file, replacement, cb) {

					  fs.readFile(replacement, (err, contents) => {
					    if (err) return cb(err);
					    fs.writeFile(file, contents, cb);
					  });

					}

					// replace contents of file './DatabaseList/ListeAnime.json' with contents of './DatabaseList/TempListeAnime.json'
					replaceContents("./DatabaseList/ListeAnime.json", "./DatabaseList/TempListeAnime.json", err => {
					  if (err) {
					    // handle errors here
					    throw err;
					  }
					});

					// delete the Temp file
					fs.unlink('./DatabaseList/TempListeAnime.json', function (err) {
					  if (err) throw err;
					});

					// create the Temp file
                    fs.appendFile('./DatabaseList/TempListeAnime.json', '[]', function (err) {
					  if (err) throw err;
					});
					// empty the content of TempListeAnime
/*					let contentAddAnimedelete = fs.readFileSync('./DatabaseList/TempListeAnime.json');
					let parsedAddAnimedelete = JSON.parse(contentAddAnimedelete);
					let emptyTempListe = []
					parsedAddAnimedelete.push(emptyTempListe);
                    let JSON_animedelete = JSON.stringify(parsedAddAnimedelete);
                    fs.writeFile("./DatabaseList/TempListeAnime.json", JSON_animedelete, function(err, result) {
                        if(err) console.log('error', err);
                    });*/
				}
			}
		}
	}
}
exports.notif = (bot, msg) => { var varnotif = setInterval(comparateAnime, 5000, bot, msg); }