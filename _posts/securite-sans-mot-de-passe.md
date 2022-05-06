# Sécurité sans mot de passe

## Problème

### Une histoire grossière des mots de passe

L'informatique commence par des gros ordinateurs détenus par une seule entité (gouvernement, armée, université, etc.) qui a plusieurs utilisateurs. Ces utilisateur.rice.s ne partagent pas forcément assez de confiance pour partager toutes leurs données respectives. Alors, chaque personne se connecte sur son propre "espace" dédié sur l'ordinateur via un nom d'utilisateur.rice et un mot de passe choisi par l'utilisateur.rice

Et cette manière de faire fonctionne très bien quand on a un seul ordinateur au travail, utilisé au plus quelques heures par jour. Chaque utilisateur.rice a un seul mot de passe à se souvenir, tout va bien.\
Aussi, le risque est assez faible, car les personnes qui pourraient essayer de hacker sont sûrement des collègues, donc peu de personnes et des personnes qui ont rarement un intérêt à s'attaquer entre elles

Et puis, on arrive en 2020 et toute personne qui utilise internet a sûrement des dizaines de comptes sur des dizaines de site web différents. La qualité désirable d'un mot de passe est qu'il ne soit **pas devinable rapidement**. C'est-à-dire que la sécurité de l'accès au compte utilisateur.rice est dépendante de si une personne autre que la personne concernée n'est pas capable de deviner le mot de passe.\
La quantité de personnes essayant de deviner votre mot de passe est n'importe quel hacker sur Terre, donc des milliers de personnes

Et là commencent les problèmes


### Le cerveau humain contre les mots de passe

Si j'utilise un mot de passe trop court, il est possible à une personne qui essaye de deviner mon mot de passe de le deviner rapidement. Tous les mots de passe à 4 caractères (lettres minucules, majuscules et chiffres) peuvent être énumérés en moins d'une journée pour tenter de se connecter à un site web, par exemple. **C'est facile de deviner rapidement un mot de passe court**

**Le cerveau humain n'a pas du tout été prévu pour se souvenir de multiples mots de passes compliqués**, alors quand on doit créer plusieurs mots de passe, **on se met à réutiliser le même mot de passe** pour plusieurs sites web. Et donc, si une attaqueur découvre le mot de passe qu'on a utilisé à un endroit, il peut essayer le même mot de passe sur un autre site web. un **mot de passe qu'on réutilise est plus facile à deviner**

[Il existe des **mots de passe connus publiquement pour être utilisés fréquemment**](https://nordpass.com/most-common-passwords-list/). **De tels mots de passe sont facilement devinables**

Parfois, on met les mots de passe sur un **post-it sur l'écran de l'ordinateur**... ce qui le rend **grossièrement devinable par n'importe qui passe par là** et voit le post-it

Ptèt un carnet pour noter les mots de passe. Mais si on se fait voler le carnet ? Ou si on le perd, est-ce qu'on perd tous les accès ? etc.

Y'avait aussi la technique de changer les mots de passe régulièrement, genre tous les mois. Parce que (cynisme) c'est pas assez dur pour le cerveau de se souvenir de choses pour lesquelles il n'a pas été prévu, il faut aussi que ces choses changent régulièrement


## Débuts de solutions : éloigner le cerveau des mots de passe

Clairement, le cerveau est inadapté à se souvenir de mots de passe d'une manière qui permet que ça aie lieu de manière sécurisé

De là, on peut déplacer/simplifier le problème. Par exemple, on peut demander à son navigateur web de [générer](https://support.mozilla.org/en-US/kb/how-generate-secure-password-firefox) et [se souvenir](https://support.mozilla.org/en-US/kb/manage-your-logins-firefox-password-manager) des mots de passe (ou demander à un *password manager* de faire ce travail). Les mots de passe ne sont plus devinables en eux-mêmes. Le plus souvent, on ne les même connait pas ; tant mieux, on ne les réutilisera pas... mais on n'a fait que déplacer le problème. En effet, si les mots de passe ne sont plus dans la tête de la personne, ils sont stockés sur l'ordinateur de la personne. Selon la configuration, ces mots de passe ne sont protégés par aucun mot de passe sur l'ordinateur (donc quiconque avec un accès physique à la machine y a accès) ou alors ils sont protégés par le mot de passe du compte utilisateur sur la machine. Donc on a déplacé la sécurité de tous les mots de passe en se basant sur un seul mot de passe devenu très important et qui nécessite souvent (parfois ?) un accès physique à la machine.

Je suis un peu partagé par ce déplacement.\
D'un côté, en théorie, si ce mot de passe n'est pas facilement devinable et si la personne est prudente sur qui a un accès physique à sa machine, ça devrait bien se passer niveau sécurité.\
La réalité, c'est plutôt que n'importe quel hacker avec un accès réseau à la machine et/ou un peu de *[social engineering](https://en.wikipedia.org/wiki/Social_engineering_(security))* va réussir à vous faire cliquer sur une page web malicieuse ou ouvrir un document en pièce jointe et via une combinaison de vulnérabilités navigateur et/ou du système d'exploitation et/ou d'un logiciel qui ouvre des fichiers .pdf ou .doc. Et vous allez donner votre mot de passe de compte utilisateur sur votre machine assez rapidement et donc donner malencontreusement accès à tous vos mots de passe stockés

L'idée d'un *[master password](https://fr.wikipedia.org/wiki/Master_Password_(algorithme))* (chaque mot de passe est généré à partir d'un mot de passe "fondation" et donc n'est pas stocké sur l'ordinateur) est aussi une bonne idée de déplacement du problème avec la même limite que les *password manager*

Un autre déplacement du problème, c'est toute solution qui consiste à stocker des mots de passe dans un fichier en ligne ou un brouillon d'email. La sécurité de ces mots de passe est dépendante de la sécurité du mot de passe qui protège l'endroit où on a stocké le fichier ou l'email. Ça rajoute une toute petite couche d'indirection qui ne va pas vraiment empêcher une personne un peu motivée

Encore un autre déplacement du problème, c'est les "mots de passe oublié". Cette fonctionnalité est géniale et vient de la reconnaissance que la plupart des personnes sont suffisamment saoulées par ces histoires de mot de passe qu'elles les oublient régulièrement. Mais tout d'un coup, la sécurité du mot de passe du site dépend aussi de la sécurité du mot de passe de compte d'email

Les *passphrases* ou "phrases de passe" sont une [tentative d'alléger le travail du cerveau](https://xkcd.com/936/), mais ça ne va pas très loin


## Solution - sans mot de passe

Je l'évoque pour la mention sans espoir que ça ne change grand chose, mais c'est une honte que cliquer sur un lien ou ouvrir un fichier .pdf mène au vol trivial du mot de passe du compte utilisateur\
Il serait temps que l'on constate les [racines du problème](https://www.youtube.com/watch?v=wW9-KuezPp8), [les chemins vers une solution](https://youtu.be/w9hHHvhZ_HY?t=892) et les [solutions qui ont déjà été prototypées par le passé](https://www.youtube.com/watch?v=UH66YrzT-_M) pour résoudre ça et que les *password manager* ou *mot de passe "fondation"* deviennent des solutions vraiment viables\
Les racines du problèmes sont notamment dans le design de la relation entre le système d'exploitation et les logiciels qui tournent. En gros, chaque logiciel lancé par l'utilisateur a tous les mêmes droits que l'utilisateur par défaut et c'est une erreur de design de sécurité. Le modèle des permissions sur les applications mobiles ou les [snap Ubuntu](https://doc.ubuntu-fr.org/snap) sont un pas dans la bonne direction, mais on est encore loin du compte

Mais en vrai, même un mot de passe fondation, c'est quand même super relou. Une ultra-minorité de personnes prennent vraiment plaisir à se souvenir ne serait-ce que d'un seul mot de passe. **Et si on essayait la sécurité sans mot de passe** ?

Les *password managers* ont apporté une nouveauté qui est intéressante (au point d'être intégrée directement dans les navigateurs web) : **le mot de passe est généré par une machine et pas par un humain**. C'est un peu pareil avec les gist secret. Dans [celui-ci, je parle de mes goûts secrets en terme de nourriture](https://gist.github.com/DavidBruant/12696a0aa86c2e87f704c3a8aa4161fc). Le morceau `12696a0aa86c2e87f704c3a8aa4161fc` de l'URL a été choisi par Github et pas par moi. Et il a le bon goût d'être unique parmi ~10<sup>38</sup> possibilités, donc de ne pas être devinable en tentant de lister toutes les options ou en me connaissant.\
(En passant, un "mot de passe" généré par la machine et qui fait partie de l'URL, on appelle ça une [capability url](https://www.w3.org/TR/capability-urls/))\
J'ai créé un gist avec mes goûts musicaux. Je laisse en exercice de trouver l'url de cet autre gist ;-)

Et si, on délégait systèmatiquement la génération des trucs non-devinables à des machines plutôt que de le laisser à des humains qui vont soit les rendre devinables à d'autres, soit les oublier ?


### Systèmes sans mot de passe existants

#### Authentication multi-facteurs

Les authentification multi-facteurs apportent une idée intéressante. Quand un système a un doute sur l'identité de la personne, il demande une "preuve supplémentaire", ptèt c'est un code à 4 ou 6 chiffres envoyé par SMS, ptèt c'est une app qui s'ouvre et demande confirmation qu'on est bien la bonne personne en train de se connecter. Ou ça peut être un email de confirmation. Ou [un objet physique dédié](https://fr.wikipedia.org/wiki/YubiKey) à ce sujet.

#### HTTPS


#### Signal





Suis-je seul.e à me soucier de ma sécurité ?\
Est-ce que mes proches doivent se débrouiller seul.e.s pour leur sécurité ?
