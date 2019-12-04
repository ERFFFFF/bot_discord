exports.rs = (bot, msg, message) =>
{
	(async () => 
    {
        let admin_id = message.author.id;
        if(admin_id == "157510824426995714")
        {
            msg("Bot restarting....");
            process.exit();
        }
	})();
}