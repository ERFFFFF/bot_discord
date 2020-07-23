exports.help = (bot, msg, PREFIX) => {
  (async () => {
    msg({
      embed: {
        color: 3447003,
        author: {
          name: bot.user.username,
          icon_url: bot.user.avatarURL,
        },
        fields: [
          { name: `**${PREFIX}rs**`, value: 'Restart le bot.' },
          {
            name: `**${PREFIX}random**`,
            value: 'Nombre random entre 0 et 100.',
          },
          //{ name: `**${PREFIX}anime**`, value: "Liste les animés en cours de parutions"},
          //{ name: `**${PREFIX}anime nom_anime**`, value: "Permets de voir en détail un animé. \n nom_anime = premier mot ou premier & deuxieme mot de l'animé. \n Exemple : Tate no Yuusha no Nariagari \n -> Tate \n -> Tate no"},
          //{ name: `**${PREFIX}addanime nom_anime**`, value: "Permet d'ajouter un animé à votre liste personnelle. \n nom_anime = premier mot ou premier & deuxieme mot de l'animé. \n Exemple : Tate no Yuusha no Nariagari \n -> Tate \n -> Tate no"},
          //{ name: `**${PREFIX}delanime nom_anime**`, value: "Permet de supprimer un animé de votre liste personnelle. \n nom_anime = premier mot ou premier & deuxieme mot de l'animé. \n Exemple : Tate no Yuusha no Nariagari \n -> Tate \n -> Tate no"},
          //{ name: `**${PREFIX}myanimelist**`, value: "Liste les animés de votre liste personnelle"},
          {
            name: `**${PREFIX}cctl x**`,
            value:
              "Utilise un algorithme mathématique permettant de déterminer la réponse à une question de N'IMPORTE quel cctl. \n x = nombre de questions possibles (nombre entre 2 et 5)",
          },
          {
            name: `**${PREFIX}prune x**`,
            value:
              'Permet de supprimer x messages dans un channel.\n x = nombres de messages à supprimer',
          },
          //{ name: `~~**${PREFIX}addmanga nom_manga nombre_chapitre**~~`, value: "ajoute un manga à votre lise personnelle. \n nom_manga = nom du manga mettre un _ à la place des espaces. \n nombre_chapitre = numéro du chapitre auquel vous etes. \n Exemple : addmanga one_piece 934"},
          //{ name: `~~**${PREFIX}delmanga nom_manga**~~`, value: "Permet de supprimer un manga de votre liste personnelle \n Exemple : delmanga one_piece \n Le nom du manga que vous supprimer doit être le même que le nom du manga dans votre liste personnelle."},
          //{ name: `~~**${PREFIX}manga**~~`, value: "Liste les mangas qui sont sorties aujourdhui"},
          //{ name: `~~**${PREFIX}manga nom_manga**~~`, value: "Permets de voir en détail un manga. \n nom_manga = premier mot ou premier & deuxieme mot du manga. \n Exemple : Tate no Yuusha no Nariagari \n -> Tate \n -> Tate no"},
          {
            name: `**${PREFIX}addmemo titre content**`,
            value:
              "Permet d'ajouter un mémo. \n titre = Je_suis_un_titre (le titre doit être un seul mot) \n content = je suis un paragraphe. (paragraphe/phrase à mettre dans le mémo)",
          },
          {
            name: `**${PREFIX}mymemo**`,
            value: "Permet d'afficher votre liste de mémo.'",
          },
          {
            name: `**${PREFIX}mymemo titre**`,
            value:
              "Permet d'afficher un element de votre liste de mémo. \n titre = titre_de_ma_liste_de_memo'",
          },
          {
            name: `**${PREFIX}mymemopv**`,
            value: "Permet d'afficher votre liste de mémo en MP.'",
          },
          {
            name: `**${PREFIX}mymemopv titre**`,
            value:
              "Permet d'afficher un element de votre liste de mémo en MP. \n titre = titre_de_ma_liste_de_memo'",
          },
          {
            name: `**${PREFIX}delmemo titre**`,
            value:
              "Permet de supprimer un element de votre liste de mémo. \n titre = Je_suis_un_titre (le titre doit être un seul mot)'",
          },
        ],
        timestamp: new Date(),
        footer: {
          icon_url: bot.user.avatarURL,
          text: '©',
        },
      },
    });
  })();
};
