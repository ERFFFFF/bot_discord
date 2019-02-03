Avoir installé au préalable : 
=============================

1. Node js
2. disocrd.js (npm install discord.js) 
3. pm2 (npm install pm2@latest -g)
4. youtube (npm install ytdl-core)
5. youtube (npm install simple-youtube-api)
6. npm install ffmpeg-binaries
7. npm install opusscript

Demarrage du bot :
==================

pm2 : pm2 start bot.js
pm2 : pm2 restart all
pm2 usefull commands : pm2 show bot

Il est aussi possible d'utiliser nodemon afin de run le but h24 mais pm2 nous permet davoir des informations supplémentaire sur le status du bot, de le restart, ...
