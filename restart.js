const bot_settings = require('./settings/bot_settings.json');
exports.rs = (bot, msg, message) => {
  (async () => {
    let admin_id = message.author.id;
    if (
      (admin_id == '157510824426995714') |
      message.member.permissions.has('ADMIN')
    ) {
      msg('Bot restarting....');
      bot.destroy();
      bot.login(bot_settings.token);
    }
  })();
};
