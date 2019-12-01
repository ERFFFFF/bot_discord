
const AnimeFunc = require('./animeFunc.js');
var fs = require("fs");
const delay = require('./delay.js');

function replaceContents(file, replacement, cb) {

  fs.readFile(replacement, (err, contents) => {
    if (err) return cb(err);
    fs.writeFile(file, contents, cb);
  });

}

async function comparateAnime(bot, msg)
{
	let DataAnime = AnimeFunc.anime();
	while(DataAnime.length == 0)
	{
	    await delay.delay(1);
	}

	let contentAddAnime = fs.readFileSync('./DatabaseList/ListeAnime.json');
	let parsedAddAnime = JSON.parse(contentAddAnime);

	// read TempListeAnime and put the new data of the anime
	let contentAddAnimeTemp = fs.readFileSync('./DatabaseList/TempListeAnime.json');
	let parsedAddAnimeTemp = JSON.parse(contentAddAnimeTemp);

	let changeData = false
	let keepData = false

    for (let j=0; j<DataAnime.length; j++)
    {
        for (let m=0; m<parsedAddAnime.length; m++)
        {
            if ((DataAnime[j].en == parsedAddAnime[m].name_anime))
            {
            	//print the anime name, the data inside ListAnime.json and the real data online
/*				console.log("name\t" + parsedAddAnime[m].name_anime)
				console.log("bdd\t" + parsedAddAnime[m].number_anime)
				console.log("irl\t" + DataAnime[j].next_epiosode.replace(":",""))*/

				if (parsedAddAnime[m].number_anime != DataAnime[j].next_epiosode.replace(":","")) 
				{
                    //notify the user
					msg("Hey <@!" +  parsedAddAnime[m].user_id + ">, " + "l'épisode numéro " + DataAnime[j].next_epiosode.replace(":", "") + " de " + parsedAddAnime[m].name_anime + " vient de sortir !")

					//add the new data inside an array
                    let new_list_anime = { user_id: parsedAddAnime[m].user_id , name_anime: parsedAddAnime[m].name_anime, number_anime: DataAnime[j].next_epiosode.replace(":", "")}
                    parsedAddAnimeTemp.push(new_list_anime);
                    changeData = true
                    keepData = true
				}
				else
				{
					//add the keeping data inside an array
                    let new_list_anime = { user_id: parsedAddAnime[m].user_id , name_anime: parsedAddAnime[m].name_anime, number_anime: DataAnime[j].next_epiosode.replace(":", "")}
                    parsedAddAnimeTemp.push(new_list_anime);
				}
			}
		}
	}

	if(changeData == true)
	{
		//transform the array into a json file
	    let JSON_animeTemp = JSON.stringify(parsedAddAnimeTemp);
	    //write in the file
	    fs.writeFile("./DatabaseList/TempListeAnime.json", JSON_animeTemp, function(err, result) {
	        if(err) console.log('error', err);
	    });
		// replace the content of the old data (ListeAnime) by the new data (TempListeAnime)
		// replace contents of file './DatabaseList/ListeAnime.json' with contents of './DatabaseList/TempListeAnime.json'
		replaceContents("./DatabaseList/ListeAnime.json", "./DatabaseList/TempListeAnime.json", err => {
		  if (err) {
		    // handle errors here
		    throw err;
		  }
		});

		replaceContents("./DatabaseList/TempListeAnime.json", "./DatabaseList/EmptyFile.json", err => {
		  if (err) {
		    // handle errors here
		    throw err;
		  }
		});
		changeData = false
        keepData = false
	}
}
exports.notif = (bot, msg) => { var varnotif = setInterval(comparateAnime, 5000, bot, msg); }