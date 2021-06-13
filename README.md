Hebergement sous windows :
==========================

### Avoir installé au préalable : ###

1. Node js (permet par la suite du pouvoir run des commandes "npm")
2. npm install discord.js (disocrd.js obligatoire pour utiliser un bot discord)
3. npm install pm2@latest -g (pm2 permet de demarrer le bot et davoir des info dessus)
4. npm install discord.js opusscript OU npm i opusscrip
5. npm i discord.js-musicbot-addon (bot musique)
6. npm install cheerio (implémentation des éléments de bases de jquery)
7. npm i puppeteer (permet de naviguer sur une page web pour ensuite extraire des éléments)
8. npm i forever (permet de restart une application node en cas de crash. => mode production)
9. npm i nodemon (permet de restart une application node en quand on sauvegarde du code => mode debug)

Si les commandes npm ne marchent pas, cela pourrait peut etre due au fait que Nodejs ne soit pas dans les "variables d'environnements".
Tous les npm install doivent êtres dans le dossier ou se situe le bot.

### Install de "FFMPEG" (permet au bot de se co au vocal et de play une musique) : ###

- Aller sur le site officiel de FFMPEG (https://www.ffmpeg.org/)
- Download la version de votre OS (certainement Wibdows)
- Extraire le dossier téléchargé dans le node_modules du projet
- renommer le nom du dossier ultra long en "ffmpeg" (juste pour que ce soit plus lisible)
- Mettre son sous-dossier "bin" dans les variables d'environnements. (donc ffmpeg/bin)
- FIN

### Rappel pour les variables d'environnements : ###

- appuyer sur la touche "windows" ou aller dans le menu démarrer
- tapper : "variables"
- cliquer sur : "modifier les variables d'environnements systeme"
- cliquer sur : "variables d'environnements
- Puis dans "variables systeme" dans "Path", cliquer sur modifier
- cliquer sur "nouveau"
- Enfin, mettre le path du dossier voulu exemeple : C:\ffmpeg\bin

### Demarrage du bot : ###

- Lancer le CMD en ADMINISTRATEUR
- Aller dans le dossier du bot (cd ..)
  - node bot.js ou pm2 start bot.js
  - pm2 : pm2 restart all
  - pm2 usefull commands : pm2 show bot

Il est aussi possible d'utiliser nodemon afin de run le but h24 mais pm2 nous permet davoir des informations supplémentaire sur le status du bot, de le restart, ...

Stop le bot avec pm2 :

- pm2 stop all

Si on désire Allumer le bot tout en voyant les console.log(); alors on doit le démarrrer de la manière suivant :

- node bot.js

Hebergement du bot sous linux ubuntu :
======================================

1. **Créé un nouvel utilisateur :**
    - adduser --disabled-login nom_dutilisateur
    - spammer la touche Entrer

2. **Aller dans le dossier du nouvel utilisateur :**
    - cd /home/nom_dutilisateur

3. **Cloner le répo git**
    - git clone lien_du_git

4. **Aller dans le dossier nouvellement créé**
    - cd dossier_du_repo

5. **Installer Nodejs :**
   - curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
   - sudo apt install -y nodejs

_Le setup_13.x est la version du packet, installer la derniere version en ligne exemple : setup_15.x_

6. **Installer tous les packets un par un avec npm ou alors si le package.json est déja rempli, executer la commande suivante :**
    - npm install

7. **Renommer le fichier discord.js :**
    - Aller dans le folder node_nodules
    - renommer le fichier discord.js en Discord.js (cp -r discord.js Discord.js)

8. **Fix pupetter error :**

    `sudo apt-get install gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget`

9. **Install de "FFMPEG" sous linux :**
    - sudo add-apt-repository ppa:jonathonf/ffmpeg-4
    - sudo apt-get install ffmpeg


Global setup :
==============

### PARAMS ###
Créé un fichier **settings/bot_settings.json** et remplir l'ensemble des champs ci-dessous :
```JSON
{
  "token": "BOT TOKEN", 
  "GOOGLE_API_KEY": "API KEY",
  "UsernameMongo": "ATLAS USERNAME",
  "PasswordMongo": "ATLAS PASSWORD",
  "DatabaseNameMongo": "ATLAS DATABASE NAME",
  "SUPER_ADMIN_ID": "ADMIN DISCORD OF A USER",
  "anilist_client_id": "ANALIST CLIENT ID",
  "anilist_secret": "ANILIST SECRET",
  "anilist_redirect_url": "https://anilist.co/api/v2/oauth/authorize",
  "anilist_redirect_uri": "http://127.0.0.1:8000/",
  "PasswordAnilist": "ANILIST PASSWORD",
  "EmailAnilist": "ANILIST EMAIL",
  "token_2capcha": "2CAPCHA TOKEN"
}
```

### Uninstall package ###
delete a package :
> npm uninstall NAME_PACKAGE -S -D -O