import {CHARACTER_ID} from "../constants/character";
import {DIALOG_ID} from "../constants/dialog";
import {Item} from "./item";

export interface DialogOption {
    text: string;
    nextDialogId: DIALOG_ID;
    onClick?: (nextDialogId: DIALOG_ID) => void;
    requirements?: {
        items?: Item[];
    };
}

export interface Dialog {
    id: DIALOG_ID;
    characterId: CHARACTER_ID;
    text: string;
    options: DialogOption[];
}
