import {Dialog} from "../types/dialog";
import {getSavedGame} from "./save";
import {ActivePlayerQuest, ActiveQuest, Quest, QuestStep} from "../types/quest";
import {emitEvent, getCloseDialogEventName} from "./events";
import {CHARACTER_ID} from "../constants/character";
import {getCurrentQuestStep} from "./quest";
import {QUEST_ID} from "../constants/quest";
import {EVENT} from "../constants/events";

export const isDialogDisabled = (dialog: Dialog): boolean => {
    const gameSave = getSavedGame();

    if (!dialog.disabledByQuests?.length) {
        return false;
    }

    return dialog.disabledByQuests.some((questId) => {
        return (
            gameSave?.player.questsFinished.includes(questId) ||
            gameSave?.player.activeQuests.some((activeQuest) => activeQuest.questId === questId)
        );
    })
};

export const getCurrentDialog = (activePlayerQuest: ActivePlayerQuest): Dialog | undefined => {
    const currentStep = getCurrentQuestStep(activePlayerQuest);
    return currentStep.dialogs?.[activePlayerQuest.currentDialogIndex];
};

export const isThisDialogForThisNPC = (dialog: Dialog, characterId: string): boolean => {
    return dialog.characterId === characterId;
};

export const closeNPCDialogBubble = (characterId: string): void => {
    emitEvent<boolean>(getCloseDialogEventName(characterId), false);
};

export const openNPCDialogBubble = (characterId: string): void => {
    emitEvent<boolean>(getCloseDialogEventName(characterId), true);
};

export const nextNPCDialog = (questId: QUEST_ID) => {
    emitEvent<QUEST_ID>(EVENT.QUEST.NEXT_DIALOG ,questId);
};

export const hasNextDialog = (questStep: QuestStep, currentDialogIndex: number): boolean => {
    return !!questStep.dialogs?.[currentDialogIndex + 1];
};
