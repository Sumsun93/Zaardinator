import {QUEST_ID} from "../constants/quest";
import {Dialog} from "./dialog";
import {DIALOG_ID} from "../constants/dialog";

export interface QuestStep {
    dialogs: Dialog[];
    currentDialogId: DIALOG_ID;
}

export interface Quest {
    id: QUEST_ID;
    name: string;
    steps: QuestStep[];
    requirements?: {
        level?: number;
        quests?: QUEST_ID[];
    }
}

export interface ActiveQuest {
    questId: QUEST_ID;
    currentStep: {
        stepIndex: number;
        dialogId: DIALOG_ID;
    };
}
