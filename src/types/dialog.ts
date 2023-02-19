import {CHARACTER_ID} from "../constants/character";
import {Item} from "./item";
import {QUEST_ID} from "../constants/quest";

export interface DialogOption {
    text: string;
    nextDialogId?: string;
    onClick?: (nextDialogId?: string) => void;
    requirements?: {
        items?: Item[];
    };
}

export interface Dialog {
    id: string;
    characterId: CHARACTER_ID;
    narratorMap?: string;
    autoPlay?: boolean;
    text: string[];
    options: DialogOption[];
    disabledByQuests?: QUEST_ID[];
}
