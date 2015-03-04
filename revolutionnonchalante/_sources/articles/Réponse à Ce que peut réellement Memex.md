# Réponse à "Ce que peut réellement Memex"

Pfouuu ! Ca fait un bon moment que j'ai pas blogué...

Il aura fallu un [post de blog](http://www.diplomatie-digitale.com/featured/surete/memex-web-profond-darpa-1534) des excellents de [Diplomatie Digitale](https://twitter.com/LesDiplomates) pour me sortir de mon silence.

Allez voir ce qu'ils écrivent, c'est de la bonne !

Mais leur dernier article avait beaucoup de morceaux naïfs ou mal-informés. Ce post est ma réponse au leur. J'avais pensé écrire un email, mais je me dis que ce que je vais écrire va sûrement servir à d'autres.

## Contexte : Memex

La [DARPA](http://en.wikipedia.org/wiki/DARPA) a récemment [dévoilé un projet nommé Memex](http://www.cbsnews.com/news/new-search-engine-exposes-the-dark-web/). Memex est un outil qui permet notamment de trouver/comprendre les réseaux de traffic d'être humains (qui sont souvent une porte d'entrée pour trouver des groupes qui font toutes sortes d'autres traffics).

Pour trouver ces groupes, Memex explore le [deep web](http://en.wikipedia.org/wiki/Deep_Web)... et puis aussi le [dark net](http://en.wikipedia.org/wiki/Darknet_(file_sharing). Ces 2 notions sont assez différentes.
Le deep web, c'est juste les pages que Google (et les autres moteurs de recherche) ne font pas remonter dans leur résultats. Soit parce que le site a demandé à ce que la page ne ressorte pas, soit parce que le moteur de recherche pense que cette page n'a pas vraiment de valeur.

La DARPA ne donne pas de détails sur la manière dont Memex est construit techniquement. L'ironie voudra que je sois en train de travailler sur un projet équivalent : [My Web Intelligence](https://github.com/MyWebIntelligence/MyWebIntelligence)
Donc, j'ai une vague idée de l'effort nécessaire pour construire Memex :-)

Diplomatie Digitale a essayé d'expliquer ce dont Memex est capable, mais leur article mérite quelques précisions.


## Morceaux choisis

> Pour s’attaquer aux échanges illégaux, le département de la défense américain est en train de développer Memex, une sorte de super Google qui va fouiller dans ces pans non explorés du Web. Il est encore difficile de savoir comment il procède, mais en toute vraisemblance l’outil a réussi à passer outre le fichier robots.txt qui est généralement utilisé sur le Web pour bloquer l’accès à certaines parties d’un site Internet.

Pour explorer le *deep web*, il n'y a aucun doute que Memex utilise un [crawler](http://en.wikipedia.org/wiki/Web_crawler). Un crawler est juste un logiciel auquel on donne des URLs vers des pages web et qui trouve les liens dans ces pages et va visiter les pages au bout de ces liens et continue jusqu'à une condition décidée par le code qui le dirige.
En gros, un crawler fait pareil que l'humain qui navigue le web (visite une page, clic sur des liens pour voir d'autres pages), sauf que le crawler le fait beaucoup plus vite parce qu'automatiquement.

Le fichier [robots.txt](https://support.google.com/webmasters/answer/6062608?hl=fr) est une convention entre humains (pour qu'ils le transmettent aux machines). Via ce fichier, un site peut indiquer à Google, aux moteurs de recherches ou toute autre personne écrivant un crawler qu'il ne veut pas que certaines pages soient visitées.
Le fichier `robots.txt`, c'est un peu comme si une ville mettait un panneau à l'entrée disant "n'allez pas rue des Lilas ni rue Grace Hopper, ni au bureau de poste" (mais sans avoir mis de barrière empêchant les gens d'y aller). Tout le monde peut y aller, c'est juste déconseillé.
Comme le dit très bien Google : "Les instructions des fichiers robots.txt sont des consignes et non des règles".

Donc Memex ne "passe outre" rien du tout. Memex roule dans la ville en ignorant la panneau. En même temps, si je suis de la police et je m'aventure dans une ville où a lieu du traffic d'être humains, je ne vais pas arrêter ma voiture juste parce qu'un panneau m'indique qu'il ne faut pas regarder ce qu'il se passe à telle ou telle adresse.

> Memex va donc essayer d’accéder aux parties cachées du Web ou accessibles uniquement par lien direct

Memex va juste le faire, pas seulement essayer. Si Memex a le lien, Memex peut aller chercher la page, trouver des liens vers d'autres pages, etc.

> (cela inclut apparemment les sites en .onion accessibles par TOR)

Je sors un peu de mon champ d'expertise, mais en gros, le web TOR fonctionne sur le même mode de fonctionnement. Il y a des URLs et des pages web si on fait une requête HTTP GET sur cette URL. Donc Memex a "juste" besoin de quelques liens initiaux et Memex peut lancer son crawler.

> Pour ce faire, le moteur de recherche semble fusionner les fonctionnalités de plusieurs outils différents : (Les capacités de recherche/crawl/reconnaissance d’images de Google + Les capacités de data vizualisation de Gephi + Les fonctionnalités de traitement de données d’Analyst’s Notebook)

Non. L'un des composant de Memex, c'est un crawler qui permet d'explorer une partie du web. 

Ces autres outils servent à d'autres buts.


> Les capacités de recherche/crawl/reconnaissance d’images de Google

Memex comprend sûrement des modules d'analyse de texte et d'analyse d'image. Il n'y a aucune certitudes qu'ils utilisent le travail de Google dans ces domaines.


> Les capacités de data vizualisation de Gephi

D'après ce que j'ai vu des vidéos, j'ai l'impression que pour Memex, ils ont utilisé [d3](http://d3js.org/) pour faire la dataviz. Pour sûr, leur viz est une appli web (vu qu'ils la lancent dans Chrome ;-) ). 

Gephi est un logiciel plus complet et plus générique d'analyse de graphe avec beaucoup d'algos de traitement de graphe qu'il n'est pas sûr que Memex utilise. Le screenshot montre une viz dont Gephi n'est pas capable, je crois (noeuds bien alignés par niveaux). Gephi n'a pas non plus de carte géographique.


> Les fonctionnalités de traitement de données d’Analyst’s Notebook

Je ne connais pas Analyst Notebook, mais pareil que pour les autres, ils n'ont pas "fusioné" cette outil, ils ont juste ré-implémenté quelques fonctionnalités.



> Dans le cas de Memex, la fonctionnalité de reconnaissance des images semble par ailleurs extrêmement puissante.

Source ? ;-)



> Memex fait donc figure d’outil trois-en-un qui couvre chaque aspect d’une enquête Web : recherche de données, visualisation et traitement.

Pas vraiment. Memex n'est pas la fusion des logiciels cités, mais plutôt une composition de briques logicielles agencées pour faire un produit avec un but bien précis (trouver les réseaux de traffic d'êtres humains, donc trouver des patterns dans des images, du texte et une structure en réseau).
Memex va sûrement beaucoup moins loin que Gephi pour la visualisation parce que Memex n'a pas besoin de tous les algos, juste de certains bien utilisés.

Aussi, "recherche de données, visualisation et traitement.", c'est à peu près la description de tous les logiciels un peu utiles ;-)


> L’arrivée de ce super-moteur dans deux ans (pour l’instant, il demeure en phase bêta) pose néanmoins plusieurs questions, notamment de loi et de sécurité.

Ah merde, My Web Intelligence est déjà open source (mais pas encore fini, pas même en béta, on verra ça vers juin) :-p


> Pour autant, le cas de Memex est différent car il flotte sur un vide juridique : celui-ci ne part pas à la recherche de données qui appartiennent à une entreprise mais va explorer les données non-propriétaires (nom, adresse, numéro de téléphone…) et ce sans mandat, tant que ces données sont disponibles de façon publique, c’est-à-dire non protégées par un mot de passe.

Il n'y a aucun vide juridique. Les données sont disponibles de manière publique.
Pour ce genre de cas, on se souvient notamment du [cas de Bluetouffe](http://www.numerama.com/magazine/28295-bluetouff-condamne-en-appel-pour-avoir-su-utiliser-google.html) qui a accedé à des documents confidentiels de l'ANSES qui étaient accessibles via recherche Google. Il a été condamné non pour avoir accédé aux documents, mais pour les avoir conservés alors qu'il avait conscience de la confidentialité de ces derniers.
Pareil là. On ne pourra pas reprocher à un crawler de trouver de l'information disponible en explorant l'espace publique.

> Comme nous avons pu le voir, la vraie force de Memex réside dans sa capacité à fusionner plusieurs outils en un, ce qui est à la fois une prouesse technique mais aussi une démonstration de force. Mais la recherche, la mise en relief et le traitement de données demandent des moyens considérables en termes de serveurs et de supercalculateurs. 

N'importe quoi :-/
Concernant les logiciels, un bon crawler s'écrit en 100 lignes de Node.js (sauf peut-être pour Tor qui a peut-être nécessité un peu plus de travail, mais pas forcément tant que ça). La visualisation, a tout l'air d'être un morceau de d3.js open source qu'on peut trouver gratuitement sur le web en 10 minutes quand on sait un peu où chercher. Les viz avec des cartes géographiques sont faciles avec l'API Google Maps ou Leaflet+Mapbox. Côté logiciel, il n'y a **aucune** prouesse technique, ni démonstration de force. 

La valeur de Memex n'est pas dans les briques utilisées, mais dans l'habile combinaison de briques existantes (open source et gratuites) qui a mené à faire un logiciel effectif.

Côté hardware, la seule chose qui demande un peu de puissance de calcul, c'est le traitement d'images et encore. Aucun besoin de serveurs ou de supercalculateurs !
C'est d'ailleurs [écrit dans leur description](http://www.darpa.mil/newsevents/releases/2014/02/09.aspx) : "The program plans to use **commodity hardware** and emphasize **creating and leveraging open source technology** and architecture." (emphase ajoutée)

Aussi, dans les grandes lignes, on va faire la même chose à l'occasion du projet My Web Intelligence et nous n'avons pas les moyens de se payer des dizaines de serveurs et encore moins des supercalculateurs. L'ordinateur portable sur lequel j'écris cet article est et restera largement suffisant pour faire tourner le projet.


Une des raisons pour lesquelles Memex et My Web Intelligence n'ont pas besoin de dizaines de serveurs et de supercalculateur, c'est que leur objectif n'est pas celui de Google. Google doit "tout" connaître pour pouvoir répondre de manière pertinente à la question poser. Ca demande beaucoup de traitement et d'espace de calcul de tout connaître en surface.
Memex et MyWI proposent l'exploration en profondeur d'un territoire très petit (lié à une thématique, à un besoin particulier). On pourrait aller chercher tout le web, mais c'est beaucoup de travail pour rien. Autant aller chercher une poignée de milliers de pages, bien les analyser, les montrer à l'utilisateur et à sa demande seulement aller explorer (en temps réel) plus en détail un certain recoin. Ce côté "à la demande" est ce qui permet de ne pas avoir besoin d'énormément de ressources matériel.


> De fait, un outil comme Memex ne sera pas exploitable dans le privé avant un certain temps, si tant est que cela arrive un jour.

My Web Intelligence, environ juin 2015 si tout se passe bien. Open source licence MIT. C'est déjà open source, mais pas dans un état utilisable.

My Web Intelligence se différencie de Memex dans le sens où il est plus générique (donc moins utile si le problème à résoudre est spécifiquement de trouver les traffics d'être humains, mais il est sûrement mieux adapté que Memex sur beaucoup d'autres problèmes).


## Conclusions

`robots.txt` est juste une indication pour les moteurs de recherche, mais toute personne qui n'écrit pas un moteur de recherche peut et va sûrement ignorer cette convention.

L'existence de Memex ne constitue pas une prouesse technologique ou technique. Il s'agit d'un assemblage intelligent de briques (la plupart sûrement open source) qui existent déjà. Il y a une innovation d'usage, mais pas technique.
Memex tourne sur du matériel normal. On peut sûrement l'installer sur un serveur qui coûte 9€/mois et en tirer toute la valeur.

Le projet My Web Intelligence a beaucoup en commun avec Memex et est open source et sera sûrement en béta cet été si tout se passe bien.






















