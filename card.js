exports.register = (msg, message, collectionMemo) => {
  (async () => {
    const __dirname = './playing_cards/';
    const fs = require('fs');
    let arrayOfFiles = [];
    collectionMemo.find({ id: message.author.id, cards: { $exists: true }, $where: 'this.cards.length > 0' }, function (err, result) {
      if (err) throw err;
      console.log(result.body)
      if (result != 0) {
        fs.readdirSync(__dirname).map(fileName => {
          arrayOfFiles.push(fileName)
        })
        collectionMemo.insertOne({ id: message.author.id, cards: arrayOfFiles }, function (err, res) {
          if (err) throw err;
        });
      }
    }).toArray().then((docs) => { console.log(docs) })
  })();
}
exports.card = (msg, msgFile, message) => {
  (async () => {
    const __dirname = './playing_cards/';
    const fs = require('fs');
    let arrayOfFiles = []
    fs.readdirSync(__dirname).map(fileName => {
      arrayOfFiles.push(fileName)
    })
    let randomCards = Math.floor(Math.random() * 52) + 1;
    msgFile(`${message.author} a tiré la carte `, __dirname + arrayOfFiles[randomCards])
  })();
}