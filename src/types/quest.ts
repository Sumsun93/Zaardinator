import {QUEST_ID} from "../constants/quest";
import {Dialog} from "./dialog";
import {DIALOG_ID} from "../constants/dialog";
import {Item} from "./item";

export interface QuestStepRequirements {
    items?: Item[];
}

export interface QuestStep {
    name: string;
    dialogs?: Dialog[];
    requirements?: QuestStepRequirements;
    currentDialogId: string;
}

export interface QuestRequirement {
    level?: number;
    quests?: QUEST_ID[];
}

export interface Quest {
    id: QUEST_ID;
    name: string;
    steps: QuestStep[];
    requirements?: QuestRequirement;
}

export interface ActiveQuest {
    questId: QUEST_ID;
    currentStep: {
        stepIndex: number;
        dialogId: string;
    };
}
