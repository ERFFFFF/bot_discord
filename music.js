const ytdl = require("ytdl-core-discord");
// list with all the song to play
let musicUrl = [];
exports.play = (bot, msg, message) => {
  (async () => {
    if (!message.member.voice.channel) {
      //check if the user is in a voice channel
      msg(
        "Tu dois être dans un salon vocal pour que je puisse mettre de la musique"
      );
      return;
    }
    let getSentence = message.content;
    // Split message and get last word the user entered
    let getUrlMusic = getSentence.split(" ");
    // check if arg1 is empty
    if (!getUrlMusic[1]) {
      msg(
        "Tu dois me fournir un lien youtube pour que je mette de la musique !"
      );
    }
    // verify if the url is correct
    if (ytdl.validateURL(getUrlMusic[1])) {
      musicUrl.push(getUrlMusic[1]);
      msg("Musique ajoutée à la liste de lecture !");
      // connect the bot to the vocal
      const voiceBot = message.member.voice.channel;
      // bot join the vocal channel
      const connection = await message.member.voice.channel.join();
      playSong();
      async function playSong() {
        // play the song
        var dispatcher = connection.play(await ytdl(musicUrl[0]), {
          type: "opus",
        });
        // when the song is finished
        dispatcher.on("finish", () => {
          // delete first element of my array music
          musicUrl.shift();
          if (musicUrl.length == 0) {
            // bot leave the vocal channel
            voiceBot.leave();
          } else {
            // bot play another song
            playSong();
          }
        });
      }
    }
  })();
};

exports.skip = (bot, msg, message) => {
  (async () => {
    // delete first element of my array music
    try {
      msg("Musique passée.");
      dispatcher.destroy();
      console.log(musicUrl);
    } catch (error) {
      console.log(error);
      msg("impossibe de passer la musique en cours.");
    }
  })();
};
