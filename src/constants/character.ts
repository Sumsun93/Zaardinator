import barman from "../assets/tavern/ZZ_QUIZ_Barman.svg";
import alcoolique from "../assets/tavern/ZZ_QUIZ_alcoolique.svg";

export enum CHARACTER_ID {
    PLAYER = 'character_player',
    PRINCESS = 'character_princess',
    MAGICIAN = 'character_magician',
    DUNGEON_KEEPER = 'character_dungeon_keeper',
    NARRATOR = 'character_narrator',
    BENJAM = 'character_benjam',
    CHOUMCHOUM = 'character_choumchoum',
}

export enum CHARACTER_TYPE {
    PLAYER = 'character_player',
    NPC = 'character_npc',
}

export const CHARACTER_ASSETS = {
    [CHARACTER_ID.PLAYER]: undefined,
    [CHARACTER_ID.PRINCESS]: undefined,
    [CHARACTER_ID.MAGICIAN]: undefined,
    [CHARACTER_ID.DUNGEON_KEEPER]: undefined,
    [CHARACTER_ID.NARRATOR]: undefined,
    [CHARACTER_ID.BENJAM]: alcoolique,
    [CHARACTER_ID.CHOUMCHOUM]: barman,
}
