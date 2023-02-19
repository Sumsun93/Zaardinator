export interface GameBoard {
    currentMap: string;
}

/**
 *
 * Si pas de quêtes disponibles pour un personnage il y a un simple dialogue par défaut, sinon on affiche le dialogue
 *
 * Quand le joueur clique sur un personnage, on regarde s'il y a une quête disponible pour lui avec un dialog et on affiche en fonction
 *
 * Si pas d'étape suivante alors la quête se valide
 *
 * Si pas de dialog suivant alors prochaine étape
 *
 * À chaque modification du plateau de jeux il faut faire un backup en local storage pour le sauvegarder
 *
 **/
