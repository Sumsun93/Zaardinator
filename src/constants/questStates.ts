enum QUEST_STATES {
    NOT_STARTED = 'NOT_STARTED', // pas démarré
    STATE_1 = 'STATE_1', // apres avoir parlé a la princesse fantome
    STATE_2 = 'STATE_2', // Apres avoir parlé au mage
    STATE_3 = 'STATE_3', // Apres avoir recupéré la fiole et avoir parlé au mage
    STATE_4 = 'STATE_4', // Apres avoir mis la fiole dans l'alambic
    STATE_5 = 'STATE_5', // Apres la decantation
    STATE_6 = 'STATE_6', // Apres avoir dit le mot magique
    STATE_7 = 'STATE_7', // Apres avoir recupéré la potion
    DONE = 'DONE', // Apres avoir donné la potion a la princesse
}

export default QUEST_STATES;
