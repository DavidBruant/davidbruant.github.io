
Réponse à certains morceaux de cette [merveilleuse pièce][1] par [Clochix][2].

> Je me suis trompé sur le Web. J’aime HTTP, mais ça reste un protocole client-serveur, donc fondamentalement centralisateur. Toute solution impliquant d’installer un serveur est réservée à une élite, donc ne peut être émancipatrice. Il nous faut remettre l’intelligence à la marge, dans les mains des gens, dans leurs ordiphones plutôt que sur des serveurs, fussent-ils Web.

Et instantanément se débloquent des clefs, des “mais bien sûr !”. La formulation est un peu brute et certaines aspects méritent clarification et peut-être discussion.

> Poche est une application PHP qu’on installe sur un serveur. Je ne veux plus installer d’applications PHP sur mes serveurs. Ni Ruby ou Python d’ailleurs.

Malheureusement, certaines applications nécessitent un serveur, parce qu’il faut une source de confiance et que chaque client pourrait “tricher”. Les jeux multijoueurs sont un exemple, mais on pourrait en trouver d’autre. Certaines applications demandent aussi une disponibilité de contenu 24/24 ce qui demande un serveur sous une forme ou une autre.  
Je concède facilement par contre que beaucoup d’application ne nécessitent pas du tout de serveur.

> Parce qu’héberger une telle application demande une vigilance quotidienne. Il suffit d’être déconnecté ou occupé ailleurs quelques jours pour louper l’annonce d’une faille critique dans le logiciel ou la pile sous-jacente, et perdre le contrôle de son serveur et ses données. Sans même parler de faille, des évolutions des plateformes peuvent modifier les réglages par défaut et nécessiter de reconfigurer les applications. Mes priorités actuelles font que je n’ai plus beaucoup de temps à consacrer à ça.

Bim. Elite. C’est écrit là. Pour installer son serveur, il faut des ressources en temps et des compétences pour s’intéresser à la sécurité qui vont au-delà de ce qu’il est raisonnable d’attendre du commun des mortels.  
Et quel est le risque encouru si on n’a pas ces ressources ? “perdre le contrôle de son serveur et ses données” en gros, perdre tout l’intérêt d’un ordinateur :-s

L’évolution des plateformes est un problème un peu à part, mais concernant la sécurité, il est dommage que l’on en soit dans cet état. les failles de sécurités sont toujours les mêmes et pire, on y perd quasi-systématiquement le contrôle de sa machine en entier. WTF!

Et pourtant on sait faire des systèmes qui, [même en présence d’une faille ne donnent pas le contrôle de la machine entière][3] (le contenu a une qualité bien supérieure au flux vidéo ) [(autre vidéo sur le sujet)][4]. La version très courte, c’est que la modularité marche aussi pour la sécurité. Mais faut qu’on perde nos habitudes des plugins WordPress qui ont le droit de massacrer n’importe quel partie du logiciel ou des données sous prétexte d’ajouter des fonctionnalités.

On bosse aussi sur [des langages][5] qui n’ont pas les soucis de sécurités par défaut des langages du passé. Pourquoi la planète ne se rue pas pour investir sur Rust reste un mystère. Pourquoi Linux et toutes les bibliothèques d’infrastructure ne sont pas graduellement réécrites en Rust vitesse grand V reste un mystère.

On prend en pratique le risque issue de la nonchalance des projets open source quant à la sécurité. Oui, le risque est moins grand qu’avec du source fermé, mais on reste à un niveau trop élevé par rapport à ce qu’on sait faire en 2013. On sait faire des systèmes sécurisé. On sait faire des systèmes qui ne donnent pas contrôle de la machine sous prétexte que le module de parsing JSON a un bug ou [crashent la machine sous prétexte d’un problème de rendu texte][6]. On sait le faire, faisons-le. Le manque de sécurité ne devrait pas être une raison de ne pas avoir son propre serveur.

> Alternativement, on peut également le synchroniser via le génial protocole remoteStorage (…) La synchronisation nécessite dans ce cas de passer par un serveur (…)

… ce qui pourrait paraître comme une régression vu qu’on a besoin d’un serveur qui peut se faire taper dessus en HTTP de n’importe où sur la planète. On est sauvé par le fait que ce composant serveur est de taille normalement réduite ce qui réduira les opportunités de failles de sécurité. Le fait d’utiliser une API standardisée garantit une pérennité entre le serveur et les clients.  
Ce qu’il manque peut-être à remoteStorage, c’est le côté réplication + cryptage d’un [Tahoe-LAFS][7] qui permettrait d’utiliser Dropbox ou Google Drive pour le stockage de nos données même si on ne leur fait pas confiance !

> Mais installer un serveur n’est pas une réponse qui résiste à la démocratisation de la technologie. Avec cette démocratisation est venue l’utilisation de serveurs tiers, et, assez logiquement me semble-t-il, des silos actuels.

Cette idée est fascinante. Le coût imposé à chaque personne pour être autonome sur le web est trop élevé, donc des silos se sont créés en réponse à cette difficulté pour apporter les bénéfices sociaux du web (partage, collaboration instantanés, etc.) en abaissant les coûts.  
Nous aurions perdu le web décentralisé à ne pas reconnaître la barrière à l’entrée qu’imposait de gérer son propre serveur. L’enjeu pour récupérer le web serait d’abaisser cette barrière.

> Dire que pour échapper aux silos il « suffit » d’avoir son propre serveur, est aussi irréaliste que de conseiller de faire son potager pour échapper aux grandes chaines agro-alimentaires. Juste sur le papier, très difficile à grande échelle dans la réalité.

Au lieu de chacun son jardin, on peut aussi développer une relation plus directe avec le producteur comme ça se fait avec les [AMAP][8].

> Accessoirement, peut-être que nombre de nos contemporains n’ont pas envie d’être autonomes mais se sentent parfaitement bien dans les jardins privatifs totalement sécurisés, aseptisés, confortables. Et qu’avec nos histoires de serveurs-à-la-maison nous ne cherchons pas à répondre à un besoin mais à promouvoir notre vision de ce qui serait bon pour l’humanité collectée.

Ce paragraphe mériterait un bouquin en réponse :-) Un premier problème est qu’il est dur de juger si nos contemporains ont envie d’être autonomes notamment à cause d’une carence en éducation au web. Quand tout le monde sera éduqué sur le web et continuera à choisir les silos, peut-être pourrons-nous conclure que nous cherchons à imposer notre vision et pas le bien commun d’un commun qui s’en tape.

Mais l’exemple de la nourriture semble nous suggérer une leçon. Des scandales sur la grande distribution, on en entend plusieurs par an dans les médias centralisés. Pour autant, la grande distribution ne se meurt pas, forte de sa [clientèle fidèle][9].  
L’article lié explique tout. Il explique comment une limitation/faiblesse humaine, (tendance à ne pas changer nos habitudes), tendance neurologique, biologique, est abusée (bidouillée ?) à des fins de profits. L’abus de la neurologie humaine ne me semble pas être un terrain sur lequel je veux m’aventurer. A tort peut-être, garantissant une défaite sûrement ?  
L’humanité est-elle condamnée à se faire bouffer par ceux qui profitent légalement d’une limitation neurologique ?

Mais je m’éloigne aussi.

Même si l’humanité entière ne veut pas d’un internet a-centré, est-ce une raison suffisante pour ne pas y travailler ?  
Continuons. Même si ce n’est que pour la minorité pour qui c’est important.

 [1]: http://esquisses.clochix.net/2013/12/15/gloubiboulga/
 [2]: https://twitter.com/clochix
 [3]: http://www.erights.org/talks/skynet/
 [4]: https://www.youtube.com/watch?v=pMhH6IKBrVo
 [5]: http://www.rust-lang.org/
 [6]: http://techcrunch.com/2013/08/29/bug-in-apples-coretext-allows-specific-string-of-characters-to-crash-ios-6-os-x-10-8-apps/
 [7]: https://tahoe-lafs.org/trac/tahoe-lafs
 [8]: http://www.reseau-amap.org/
 [9]: http://www.nytimes.com/2012/02/19/magazine/shopping-habits.html?pagewanted=all