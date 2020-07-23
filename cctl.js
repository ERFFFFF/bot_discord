exports.cctlRandom = (msg, message) =>
{
	(async () =>
    {
    	let randomcctl = message.content;
        let splitrandomcctl = randomcctl.split(" ");
        let LastValrandomcctl = splitrandomcctl[splitrandomcctl.length -1];
        let intrandomcctl = parseInt(LastValrandomcctl);
        let valuecctl = Math.floor(Math.random() * intrandomcctl) + 1;

        switch (LastValrandomcctl)
        {
            case "2":
                msg("D'après le théorème de Syd, la question " + valuecctl + " est la bonne réponse.");
                break;

            case "3":
                msg("D'après le théorème de Syd, la question " + valuecctl + " est la bonne réponse.");
                break;

            case "4":
                msg("D'après le théorème de Syd, la question " + valuecctl + " est la bonne réponse.");
                break;

            case "5":
                msg("D'après le théorème de Syd, la question " + valuecctl + " est la bonne réponse.");
                break;

            default:
                msg("Hey déso mais le théorème de Syd ne marche pas quand il y a " + intrandomcctl  + " questions :'( rip")
                break;
        }
	})();
}
/*exports.addanime = (bot, msg, PREFIX, user_id_addAnime, AddAnime) =>
{
	(async () =>
    {

	})();
}*/