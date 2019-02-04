Avoir installé au préalable : 
=============================

1. Node js (permet par la suite du pouvoir run des commandes "npm")
2. disocrd.js (npm install discord.js) 
3. pm2 (npm install pm2@latest -g)
4. youtube (npm install ytdl-core)
5. youtube (npm install simple-youtube-api)
6. npm install ffmpeg-binaries
7. npm install opusscript
8. npm install --save anilist-api-pt

Si les commandes npm ne marchent pas, cela pourrait peut etre due au fait que npm ne soit pas dans les "variables d'environnements".

Demarrage du bot :
==================

- pm2 : pm2 start bot.js
- pm2 : pm2 restart all
- pm2 usefull commands : pm2 show bot

Il est aussi possible d'utiliser nodemon afin de run le but h24 mais pm2 nous permet davoir des informations supplémentaire sur le status du bot, de le restart, ...
