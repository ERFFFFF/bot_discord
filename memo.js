var fs = require("fs");
exports.mymemo = (bot, msg, message) =>
{
	(async () => 
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
         
        msg({embed: 
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
	})();
}
exports.addmemo = (bot, msg, message, PREFIX) =>
{
	(async () => 
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
                    msg("tutututu kestufé, tu as déjà ajouté ce mémo à ta liste perso, essaie pas de m'arnaquer.");
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
                    msg("<@!" +  user_id_addMemo + ">, " + "Le mémo **" + sentenceAddMemo[1] + "** avec le contenu : **" + contentMemo + "** à bien été ajouté à ta liste personelle !");
                }                
            }
            else
            {
                msg("tutututu kestufé, ta cru tu voulais réécrire la bible fdp, fais un titre et un content plus cours sale chien, pour un titre c'est max 256 characteres et la t'en as " + sentenceAddMemo[1].length + " et dans le content c'est max 1024 charactères et la t'en as " + contentMemo.length);
            }
        }   
	})();
}
exports.delmemo = (bot, msg, PREFIX, message) =>
{
	(async () => 
    {
    	        // Get user id
        let user_id_delmemo = message.author.id;
        // Read file
        let contentGetMemo = fs.readFileSync('./DatabaseList/ListeMemo.json');
        // Transorm json file into array
        let parsedGetMemo = JSON.parse(contentGetMemo);
        // GET message
        let DelMemo = message.content;
        // Split message and get last word the user entered
        let sentenceDelMemo = DelMemo.split(" ");

        let bool = 0;

        if((sentenceDelMemo[0] == `${PREFIX}delmemo`) && (sentenceDelMemo[1] != null) && (sentenceDelMemo[2] == null))
        {
            for (let m=0; m<parsedGetMemo.length; m++)
            {
                if((sentenceDelMemo[1].toLowerCase() == parsedGetMemo[m].toLowerCase()) && (parsedGetMemo[m].user_id == user_id_delmemo))
                {                    
                    msg("<@!" +  user_id_delmemo + ">, " + "Le Mémo " + parsedGetMemo[m].name_anime + " à bien été supprimer de ta liste personelle !");
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
                    msg("Déso gros mais tu essaye de supprimer un animé n'étant pas dans ta liste personelle. (spoiler : du coup tu supprime R)");
                }
            }
        }
	})();
}