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