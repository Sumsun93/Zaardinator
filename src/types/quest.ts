import {QUEST_ID} from "../constants/quest";
import {Dialog} from "./dialog";
import {Item} from "./item";

export interface QuestStepRequirements {
    items?: Item[];
}

export interface QuestStep {
    id: string;
    name: string;
    dialogs?: Dialog[];
    requirements?: QuestStepRequirements;
    currentDialogIndex: number;
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
    currentStepIndex: number;
}

export interface ActivePlayerQuest extends Quest, Pick<ActiveQuest, 'currentStepIndex'> {}
