

const bot_settings = require('./bot_settings.json');

const Discord = require('Discord.js');

const function_ = require('./function.js');	

const YouTube = require('simple-youtube-api');

const ytdl = require('ytdl-core');

const bot = new Discord.Client({});

const PREFIX = '!';

const youtube = new YouTube(bot_settings.GOOGLE_API_KEY);


bot.on('ready', () => {

	let bot_connected = `Bot ${bot.user.username} is ready.`;
	var channel = bot.channels.get('315164681130213386');
	channel.send(bot_connected);
	bot.user.setActivity('Peter des gueules');
 
});


bot.on('message', message => {
	
	if(!message.content.startsWith(PREFIX)) return;
	if(message.author.bot) return;
	let test = 'Ceci est un test.';
	let oun = function_.hello();

	if(message.content.toString() === `${PREFIX}rs`) {

		process.exit();
	}

	if(message.content.toString() === `${PREFIX}test`) {

        message.channel.send(test);
	}

	if(message.content.toString() === `${PREFIX}random`) {

		message.channel.send(Math.floor(Math.random() * 101));
	}
});

bot.on('message', async message => {

const args = message.content.split(' ');
  if (!message.guild) return;

  if (message.content.startsWith(`${PREFIX}play`)) {
   
    if (message.member.voiceChannel) {

      const connection = await message.member.voiceChannel.join();

    try {
      	   
      	const dispatcher = connection.playStream(ytdl(args[1], { filter: 'audioonly' }));
		dispatcher.setVolume(0.5);

 	} catch (error) { console.error(error)};

    }

    else {

      message.channel.send('Le bot ne peut pas rejoindre le channel vocal vu que tu es pas dedans. (fdp)');

    }

  }

  if (message.content.toString() === `${PREFIX}leave`) {

  	if (message.member.voiceChannel) {
	const deconnection = await message.member.voiceChannel.leave();
	
	}

  }
  
});

bot.login(bot_settings.token);