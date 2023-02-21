import barman from "../assets/tavern/ZZ_QUIZ_Barman.svg";
import alcoolique from "../assets/tavern/ZZ_QUIZ_alcoolique.svg";
import princess1 from "../assets/bedroom/ZZ_QUIZ_Phantome_B.svg";
import princess2 from "../assets/bedroom/ZZ_QUIZ_Phantome_Transformation.svg";
import nko from '../assets/donjon/ZZ_QUIZ_NKO.svg';
import Neos from "../components/Characters/Neos/Neos";

export enum CHARACTER_ID {
    PLAYER = 'character_player',
    PRINCESS = 'character_princess',
    GHOST_PRINCESS = 'character_ghost_princess',
    NEOS = 'character_neos',
    NKO = 'character_nko',
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
    [CHARACTER_ID.PRINCESS]: princess2,
    [CHARACTER_ID.GHOST_PRINCESS]: princess1,
    [CHARACTER_ID.NEOS]: <Neos />,
    [CHARACTER_ID.NKO]: nko,
    [CHARACTER_ID.NARRATOR]: undefined,
    [CHARACTER_ID.BENJAM]: alcoolique,
    [CHARACTER_ID.CHOUMCHOUM]: barman,
}
