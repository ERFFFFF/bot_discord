const bot_settings = require('./settings/bot_settings.json');
exports.prune = (msg, message) => {
  (async () => {
    let user_id_addAnime = message.author.id;
    if (
      (user_id_addAnime == bot_settings.SUPER_ADMIN_ID) |
      message.member.permissions.has('ADMIN')
    ) {
      // GET message
      let PruneMessage = message.content;
      // Split message and get last word the user entered
      let splitPrune = PruneMessage.split(' ');
      // check if the second element is null and is a number
      if (splitPrune[1] != null && isNaN(splitPrune[1]) == false) {
        let LastValPrune = splitPrune[1];
        // delete the command <prune>
        LastValPrune++;
        if (LastValPrune <= 100) {
          // Delete X message
          message.channel.bulkDelete(LastValPrune);
        } else {
          msg('Erreur, la taille maximale pour un prune est de 100.');
        }
      } else {
        msg('Veuillez rentrer un nombre valide.');
      }
    }
  })();
};
