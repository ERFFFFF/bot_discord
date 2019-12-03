exports.prune = (bot, msg, message) =>
{
    (async () => 
    {

        let user_id_addAnime = message.author.id;
        if(user_id_addAnime == "157510824426995714")
        {
            // GET message
            let PruneMessage = message.content;
            // Split message and get last word the user entered
            let splitPrune = PruneMessage.split(" ");
            let LastValPrune = splitPrune[splitPrune.length -1];
            if(LastValPrune <= 100)
            {
                // Delete X message
                message.channel.bulkDelete(LastValPrune);
            }
            else
            {
                msg("Erreur, la taille maximale pour un prune est de 100.")
            }
        }
    })();
}