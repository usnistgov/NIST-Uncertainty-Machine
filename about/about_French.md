![NIST](https://nccoe.nist.gov/sites/all/themes/custom/nccoe2x/asset/img/NIST_logo.svg)
# NIST Uncertainty Machine

La NIST Uncertainty Machine (NUM) est une application Web conçue par le National Institute of Standards and Technology ([NIST](www.nist.gov)) pour évaluer l'incertitude de mesure, associée à une quantité sortie scalaire ou vectorielle. Cette quantité est fonction d'un ensemble de quantités d'entrées scalaires connues et explicites pour lesquelles des estimations et des évaluations de l'incertitude de mesure sont disponibles.

Elle applique la méthode approximative d'évaluation de l'incertitude, décrite dans le "Guide pour l'expression de l'incertitude de mesure" (GUM) et la méthode de Monte Carlo des suppléments GUM 1 et 2. Les quantités d'entrées et de sortie sont modélisées sous forme de variables aléatoires. Leurs distributions de probabilité sont utilisées pour caractériser l’incertitude de mesure. Pour les entrées qui sont corrélées, la NUM offre le moyen de spécifier les corrélations correspondantes et la manière dont elles seront prises en compte.

Les résultats de la NUM comprennent :

* Une estimation de la quantité de sortie (mesurande)
* Des évaluations des incertitudes standards et élargies associées
* Des intervalles de couverture pour la valeur réelle du mesurande
* Un budget d’incertitude, qui quantifie l’influence que les incertitudes des entrées ont sur l'incertitude de la sortie


Pour plus de détails sur la NUM et des exemples de son application, veuillez vous reporter à son manuel d'utilisation, disponible [ici] (./ NISTUncertaintyMachine-UserManual.pdf), ainsi qu'à T. Lafarge et A. Possolo (2015) "The NIST Uncertainty Machine ",  NCSLI Measure Journal of Measurement Science, volume 10, numéro 3 (septembre), pages 20-27.

Le NIST est l'institut national de métrologie des États-Unis d'Amérique. Rendez-nous visite à www.nist.gov. Fondé en 1901, le NIST est un organisme fédéral non réglementé, relevant du Département du commerce des États-Unis. La mission du NIST est de promouvoir l’innovation et la compétitivité industrielle aux États-Unis, en faisant progresser la science de la mesure, les normes et la technologie, de manière à renforcer la sécurité économique et à améliorer notre qualité de vie.

Les rapports de bugs et les suggestions d'amélioration sont les bienvenus: merci de les envoyer à antonio.possolo@nist.gov et à thomas.lafarge@nist.gov.


## Instructions

* Sélectionnez le nombre de grandeurs d'entrée.
* Changez les noms des grandeurs, si nécessaire.
* Pour chaque grandeur d'entrée, choisissez sa distribution et ses paramètres.
* Choisissez et spécifiez les corrélations, si nécessaire.
* Choisissez le nombre de réalisations.
* Exprimez la définition du mesurande à l'aide d'une expression R valide.
* Lancez le calcul.


## Code de Validation & Vérification R

`FullScriptNUM.R` est un script R destiné à être exécuté localement, lorsque l'utilisateur ressent le besoin de valider, de vérifier ou de reproduire les résultats obtenus par la "NIST Uncertainty Machine" (NUM).
Des informations plus détaillées sont disponibles dans le [Manuel de l'utilisateur, chapitre 6]("./NISTUncertaintyMachine-UserManual.pdf#page=17").

Passer un fichier de configuration, produit par NUM en argument à `FullScriptNUM.R`, produit les mêmes résultats que lorsque le même fichier de configuration est chargé dans l'application Web et y est exécuté.

Supposons que le fichier de configuration s'appelle `NUMConfigExample.um`, le script peut être exécuté avec la commande suivante:

`$ Rscript FullScriptNUM.R NUMConfigExample.um`


Le script générera 3 fichiers avec le même préfixe que le fichier de configuration. Dans le cas de l'exemple ci-dessus, les fichiers de sortie seraient:


* `NUMConfigExample-result.txt`: un fichier texte avec les mêmes résultats et la même présentation que les résultats numériques affichés sur la page Web de sortie du NUM;
* `NUMConfigExample-density.jpg`: un fichier JPEG avec le même graphique que celui affiché sur la page Web de sortie du NUM.
* `NUMConfigExample-value.Rd`: un fichier de données binaires R avec les réplications des quantités en entrée et les valeurs correspondantes de la quantité en sortie, correspondant à la méthode de Monte Carlo du supplément 1 du GUM. Dans R, la commande `load('NUMConfigExample-values.Rd')` créera autant de vecteurs qu'il y a de quantités d'entrée, avec leurs noms spécifiés dans le fichier de configuration, et un vecteur nommé "y" avec les valeurs de la quantité de sortie.

Le script installera tous les packages R nécessaires qui n'avaient peut-être pas été installés auparavant dans la version locale du système R. Le script commence par écrire son numéro de version dans la fenêtre du terminal, qui doit correspondre au numéro de la version du NUM affiché en haut de la page de l’application Web.


### Télécharger
  *   [NIST Validation & Verification Script Version 1.4](https://uncertainty.nist.gov/FullScriptNUM/FullScriptNUM_1.4.R)
  *   [NIST Validation & Verification Script Version 1.3.6](https://uncertainty.nist.gov/FullScriptNUM/FullScriptNUM_1.3.6.R)
  *   [NIST Validation & Verification Script Version 1.3.5](https://uncertainty.nist.gov/FullScriptNUM/FullScriptNUM_1.3.5.R)
  *   [NIST Validation & Verification Script Version 1.3.4](https://uncertainty.nist.gov/FullScriptNUM/FullScriptNUM_1.3.4.R)
