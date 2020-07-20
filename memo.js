var fs = require('fs');

exports.mymemo = (bot, msg, message, PREFIX, db) => {
  (async () => {
    let user_id_mymemo = message.author.id;
    let list_memo = [];
    // GET message
    let Mymemo = message.content;
    // Split message and get last word the user entered
    let sentenceMymemo = Mymemo.split(' ');
    // show a certain memo
    if (sentenceMymemo[0] == `${PREFIX}mymemo` && sentenceMymemo[1] != null) {
      db.collection('memo').findOne(
        {
          user_id: user_id_mymemo,
          title: sentenceMymemo[1],
        },
        function (err, result) {
          if (err) throw err;
          // memo exist.
          if (result) {
            list_memo.push({
              name: '**' + result.title + '**',
              value: result.content,
            });
            msg({
              embed: {
                color: 3447003,
                author: {
                  name: bot.user.username,
                  icon_url: bot.user.avatarURL,
                },
                fields: list_memo,
                timestamp: new Date(),
                footer: {
                  icon_url: bot.user.avatarURL,
                  text: '©',
                },
              },
            });
          } else {
            msg('Memo doesnt exist.');
          }
        }
      );
    }
    // show all the memo (without the content)
    if (sentenceMymemo[0] == `${PREFIX}mymemo` && sentenceMymemo[1] == null) {
      db.collection('memo')
        .find({ user_id: user_id_mymemo })
        .toArray(function (err, result) {
          if (err) throw err;
          if (result != []) {
            for (let index = 0; index < result.length; index++) {
              console.log(result[index].title);
              list_memo.push(` => ${result[index].title} \n`);
            }
            // .join : array to string, .replace : on enleve TOUTES les virgules.
            let stringval = list_memo.join().replace(/,/g, ' ');
            msg({
              embed: {
                color: 3447003,
                author: {
                  name: bot.user.username,
                  icon_url: bot.user.avatarURL,
                },
                fields: [
                  {
                    name: 'List de tes Mémos perso : ',
                    value: stringval,
                  },
                ],
                timestamp: new Date(),
                footer: {
                  icon_url: bot.user.avatarURL,
                  text: '©',
                },
              },
            });
          } else {
            msg('aucun item dans ta liste perso de mémo.');
          }
        });
    }
  })();
};
exports.addmemo = (bot, msg, message, PREFIX, db) => {
  (async () => {
    // GET user id
    let user_id_addMemo = message.author.id;
    // GET message
    let AddMemo = message.content;
    // Split message and get last word the user entered
    let sentenceAddMemo = AddMemo.split(' ');
    // Send Message to a certain User.
    /*
        let MessageUser = bot.users.get("ID USER");
        MessageUser.send("You need to wake up my friend! your id is : " + "ID USER");
    */

    if (
      sentenceAddMemo[0] == `${PREFIX}addmemo` &&
      sentenceAddMemo[1] != null &&
      sentenceAddMemo[2] != null
    ) {
      // check if a memo with the same title exist
      db.collection('memo').findOne(
        {
          user_id: user_id_addMemo,
          title: sentenceAddMemo[1],
        },
        function (err, result) {
          if (err) throw err;
          // memo doesnt exist, continue.
          if (!result) {
            // get all the content inside a variable
            let contentMemo = '';
            for (let h = 2; h < sentenceAddMemo.length; h++) {
              tempMemo = sentenceAddMemo[h];
              contentMemo = contentMemo + ' ' + tempMemo;
            }
            // verify the length before inserting the data in mongo
            if (
              sentenceAddMemo[1].length <= 256 &&
              contentMemo.length <= 1024
            ) {
              // write data inside mongo
              db.collection('memo').insertOne({
                user_id: user_id_addMemo,
                title: sentenceAddMemo[1],
                content: contentMemo,
              });
              msg(
                '<@!' +
                  user_id_addMemo +
                  '>, ' +
                  'Le mémo **' +
                  sentenceAddMemo[1] +
                  '** avec le contenu : **' +
                  contentMemo +
                  '** à bien été ajouté à ta liste personelle !'
              );
            } else {
              // length error.
              msg(
                "tutututu kestufé, ta cru tu voulais réécrire la bible fdp, fais un titre et un content plus cours sale chien, pour un titre c'est max 256 characteres et la t'en as " +
                  sentenceAddMemo[1].length +
                  " et dans le content c'est max 1024 charactères et la t'en as " +
                  contentMemo.length
              );
            }
          } else {
            // title already exist, error.
            msg(
              "tutututu kestufé, tu as déjà ajouté ce mémo à ta liste perso, essaie pas de m'arnaquer."
            );
          }
        }
      );
    }
  })();
};
exports.delmemo = (bot, msg, PREFIX, message, db) => {
  (async () => {
    // Get user id
    let user_id_delmemo = message.author.id;
    // GET message
    let DelMemo = message.content;
    // Split message and get last word the user entered
    let sentenceDelMemo = DelMemo.split(' ');
    if (
      sentenceDelMemo[0] == `${PREFIX}delmemo` &&
      sentenceDelMemo[1] != null
    ) {
      // delete the memo
      db.collection('memo').deleteOne(
        {
          user_id: user_id_delmemo,
          title: sentenceDelMemo[1],
        },
        function (err, obj) {
          if (err) throw err;
          // check if the title exist
          if (obj.result.n == 0) {
            msg('ya R a delete vu que le mémo existe pas bouffon');
          } else {
            // send message to confirm that the memo is deleted
            msg(
              '<@!' +
                user_id_delmemo +
                '>, ' +
                'Le Mémo ' +
                sentenceDelMemo[1] +
                ' à bien été supprimer de ta liste personelle !'
            );
          }
        }
      );
    }
  })();
};
