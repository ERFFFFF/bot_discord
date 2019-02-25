Avoir installé au préalable : 
=============================

1. Node js (permet par la suite du pouvoir run des commandes "npm")
2. npm install discord.js (disocrd.js obligatoire pour utiliser un bot discord)
3. npm install pm2@latest -g (pm2 permet de demarrer le bot et davoir des info dessus)
4. npm install discord.js opusscript OU npm i opusscrip
5. npm i discord.js-musicbot-addon (bot musique)
6. npm install cheerio (implémentation des éléments de bases de jquery)
7. npm i puppeteer (permet de naviguer sur une page web pour ensuite extraire des éléments)

Si les commandes npm ne marchent pas, cela pourrait peut etre due au fait que Nodejs ne soit pas dans les "variables d'environnements".
Tous les npm install doivent êtres dans le dossier ou se situe le bot.

Install de "FFMPEG" (permet au bot de se co au vocal et de play une musique) :
==============================================================================

- Aller sur le site officiel de FFMPEG (https://www.ffmpeg.org/)
- Download la version de votre OS (certainement Wibdows)
- Extraire le dossier sur le bureau (ou autre)
- renommer le nom du dossier ultra long en "ffmpeg" (juste pour que ce soit plus lisible)
- Mettre son sous-dossier "bin" dans les variables d'environnements. (donc ffmpeg/bin)
- FIN

Rappel pour les variables d'environnements :
============================================
- appuyer sur la touche "windows" ou aller dans le menu démarrer
- tapper : "variables"
- cliquer sur : "modifier les variables d'environnements systeme"
- cliquer sur : "variables d'environnements
- Puis dans "variables systeme" dans "Path", cliquer sur modifier
- cliquer sur "nouveau"
- Enfin, mettre le path du dossier voulu exemeple : C:\ffmpeg\bin

Demarrage du bot :
==================

- Lancer le CMD en ADMINISTRATEUR
- Aller dans le dossier du bot (cd ..)
  - node bot.js ou pm2 start bot.js 
  - pm2 : pm2 restart all
  - pm2 usefull commands : pm2 show bot

Il est aussi possible d'utiliser nodemon afin de run le but h24 mais pm2 nous permet davoir des informations supplémentaire sur le status du bot, de le restart, ...

Si on désire Allumer le bot tout en voyant les console.log(); alors on doit le démarrrer de la manière suivant : 

- node bot.js
