const bot_settings = require("./bot_settings.json");

const Discord = require("Discord.js");


module.exports = {
   hello: function() {
      return "coucou les zamis";
   }
}

/*function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}*/

//let message = message.channel.send("coucou les zamis");