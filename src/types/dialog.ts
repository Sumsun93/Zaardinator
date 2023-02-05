import {CHARACTER_ID} from "../constants/character";
import {DIALOG_ID} from "../constants/dialog";
import {Item} from "./item";

export interface DialogOption {
    text: string;
    nextDialogId?: string;
    onClick?: (nextDialogId: string) => void;
    requirements?: {
        items?: Item[];
    };
}

export interface Dialog {
    id: string;
    characterId: CHARACTER_ID;
    isNarrator?: boolean;
    autoPlay?: boolean;
    text: string[];
    options: DialogOption[];
}
