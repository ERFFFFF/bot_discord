const Memo = require("./models/memoModel");

exports.mymemo = async (bot, msg, message, PREFIX) => {
  let user_id_mymemo = message.author.id;
  let list_memo = [];
  // Split message and get last word the user entered
  let sentenceMymemo = message.content.split(' ');
  // show a precise memo by using his title (content will be shown)
  if (sentenceMymemo[1] != null) {
    console.log(list_memo)
    Memo.findOne(
      {
        user_id: user_id_mymemo,
        title: sentenceMymemo[1],
      },
      function (err, result) {
        if (err) throw err;
        // memo exist.
        if (result) {
          list_memo.push({
            name: `${result.title}`,
            value: result.content,
          });
          console.log(list_memo)
          if (sentenceMymemo[0] == `${PREFIX}mymemo`) {
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
          }
          if (sentenceMymemo[0] == `${PREFIX}mymemopv`) {
            bot.users.cache.get(user_id_mymemo).send({
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
          }
        } else {
          msg('Memo doesnt exist.');
        }
      }
    );
  }
  // show all the memo (without the content)
  if (sentenceMymemo[1] == null) {
    Memo
      .find({ user_id: user_id_mymemo }, function (err, result) {
        if (err) throw err;
        if (result.length = 0) {
          for (var index = 0; index <= result.length; index++) {
            // .join : array to string, .replace : on enleve TOUTES les virgules.
            let stringval = list_memo.join().replace(/,/g, ' ');
            if (stringval.length >= 1000 || index == result.length) {
              if (stringval.length >= 1000) {
                // delete last element in order to be under 1000 characters.
                let lastElement = list_memo.splice(-1, 1);
                // rollback the new stream
                stringval = list_memo.join().replace(/,/g, ' ');
                // rollback the index
                index--;
                // reset array before implementing the last value (value deleted)
                list_memo = [];
                // re implement last element to array
                list_memo.push(lastElement[0])
                lastElement.splice(0, 1)
              } else {
                list_memo = [];
              }
              // send list to the public
              if (sentenceMymemo[0] == `${PREFIX}mymemo`) {
                msg({
                  embed: {
                    color: 3447003,
                    author: {
                      name: message.author.username,
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
              }
              // send list to user in DM.
              if (sentenceMymemo[0] == `${PREFIX}mymemopv`) {
                bot.users.cache.get(user_id_mymemo).send({
                  embed: {
                    color: 3447003,
                    author: {
                      name: message.author.username,
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
              }
              stringval = '';
            } else {
              list_memo.push(` => [${index}] ${result[index].title} \n`);
            }
          }
        } else {
          msg(`Aucun mémo n'a été trouvé dans ta liste personnelle.`);
        }
      });
  }
};
exports.addmemo = async (msg, message, PREFIX) => {
  // GET user id
  let user_id_addMemo = message.author.id;
  // Split message
  let sentenceAddMemo = message.content.split(' ');
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
    Memo.findOne(
      {
        user_id: user_id_addMemo,
        title: sentenceAddMemo[1],
      },
      function (err, result) {
        if (err) throw err;
        // memo doesnt exist, continue.
        if (!result) {
          // a bit weird, delete all but not the first two elements and stock it in this variable
          let contentMemo = sentenceAddMemo.slice(2, sentenceAddMemo.length);
          // join the array with a space => making a sentence
          contentMemo = contentMemo.join(" ");
          // verify the length before inserting the data in mongo
          // why 252 ? beacause a "name" field is max 256 characters but we add bold text wich add 4 characters (**_**)
          // why 1024 ? beacause a "value" field is max 1024 characters
          if (
            sentenceAddMemo[1].length <= 252 &&
            contentMemo.length <= 1024
          ) {
            // write data inside mongo
            newMemo = new Memo({
              user_id: user_id_addMemo,
              title: sentenceAddMemo[1],
              content: contentMemo,
              Date: Date.now()
            });
            // SAVE BDD
            newMemo.save();
            msg(`<@!${user_id_addMemo}>, le mémo **${sentenceAddMemo[1]}** ainsi que son contenu à bien été ajouté à ta liste de mémos personelle !`)
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
};
exports.delmemo = async (msg, PREFIX, message) => {
  // Get user id
  let user_id_delmemo = message.author.id;
  // Split message and get last word the user entered
  let sentenceDelMemo = message.content.split(' ');
  if (
    sentenceDelMemo[0] == `${PREFIX}delmemo` &&
    sentenceDelMemo[1] != null
  ) {
    // delete the memo
    Memo.deleteOne(
      {
        user_id: user_id_delmemo,
        title: sentenceDelMemo[1],
      },
      function (err, result) {
        if (err) throw err;
        // check if the title exist
        //console.log("obj.result.n => ", obj.result.n)
        console.log("result => ", result)
        if (result.n == 0) {
          msg('ya R a delete vu que le mémo existe pas bouffon');
        } else {
          // send message to confirm that the memo is deleted
          msg(`<@!${user_id_delmemo}>, le mémo ${sentenceDelMemo[1]} à bien été supprimer de ta liste personelle !`);
        }
      }
    );
  } else {
    msg(`delmemo de quoi fils de pute`);
  }
};
