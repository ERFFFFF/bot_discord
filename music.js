const ytdl = require('ytdl-core-discord');
// list with all the song to play
let musicUrl = [];
let dispatcher = '';
let voiceBot = '';
let connection = '';

async function playSong(message, voiceBot, connection) {
  // play the song
  dispatcher = connection.play(await ytdl(musicUrl[0]), {
    type: 'opus',
  });
  // when the song is finished
  dispatcher.on('finish', () => {
    // delete first element of my array music
    musicUrl.shift();
    if (musicUrl.length == 0) {
      // bot leave the vocal channel
      voiceBot.leave();
    } else {
      // play another song
      playSong(message, voiceBot, connection);
    }
  });
}

exports.play = async (msg, message) => {
  if (!message.member.voice.channel) {
    //check if the user is in a voice channel
    msg(
      'Tu dois être dans un salon vocal pour que je puisse mettre de la musique'
    );
    return;
  }
  let getSentence = message.content;
  // Split message and get last word the user entered
  let getUrlMusic = getSentence.split(' ');
  // check if arg1 is empty
  if (!getUrlMusic[1]) {
    msg(
      'Tu dois me fournir un lien youtube pour que je mette de la musique !'
    );
  }
  // verify if the url is correct
  if (ytdl.validateURL(getUrlMusic[1])) {
    musicUrl.push(getUrlMusic[1]);
    msg('Musique ajoutée à la liste de lecture !');

    voiceBot = message.member.voice.channel;
    // bot join the vocal channel
    connection = await message.member.voice.channel.join();
    // check if a music is currently playing.
    if (dispatcher == '') {
      playSong(message, voiceBot, connection);
    }
  }
};

exports.skip = async (msg, message) => {
  // check if there is a music
  if (musicUrl.length > 1) {
    try {
      // end the current music
      dispatcher.destroy();
      // delete the current music
      musicUrl.shift();
      // play the next music
      playSong(message, voiceBot, connection);
      msg('Musique passée.');
    } catch (error) {
      msg('impossibe de passer la musique en cours.');
      console.log(error);
      // bot leave the vocal channel
      voiceBot.leave();
    }
  } else {
    msg('Aucune musique a passer.');
  }
};

exports.stop = async (msg) => {
  // check if there is a music
  if (musicUrl.length > 0) {
    try {
      for (let index = 0; index < musicUrl.length; index++) {
        musicUrl.splice(index, 1);
      }
      // end the current music
      dispatcher.destroy();
      msg('Musique Stopper.');
      voiceBot.leave();
    } catch (error) {
      msg('impossibe de stopper la musique.');
      console.log(error);
    }
  } else {
    msg('Aucune musique a stopper.');
  }
};
