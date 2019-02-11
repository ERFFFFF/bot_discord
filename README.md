Avoir installé au préalable : 
=============================

1. Node js (permet par la suite du pouvoir run des commandes "npm")
2. npm install discord.js (disocrd.js)
3. pm2 (npm install pm2@latest -g)
4. npm install ytdl-core (youtube)
5. npm install simple-youtube-api(youtube)
6. npm install ffmpeg-binaries
7. npm install opusscript
8. npm install cheerio (implémentation des éléments de bases de jquery)
9. npm install axios (Permet de faire des requettes http)

Si les commandes npm ne marchent pas, cela pourrait peut etre due au fait que npm ne soit pas dans les "variables d'environnements".

Tous les npm install doivent êtres dans le dossier ou se situe le bot.

Demarrage du bot :
==================

- pm2 : pm2 start bot.js
- pm2 : pm2 restart all
- pm2 usefull commands : pm2 show bot

Il est aussi possible d'utiliser nodemon afin de run le but h24 mais pm2 nous permet davoir des informations supplémentaire sur le status du bot, de le restart, ...

Si on désire Allumer le bot tout en voyant les console.log(); alors on doit le démarrrer de la manière suivant : 

- node bot.js
