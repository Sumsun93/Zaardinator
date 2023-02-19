import {Dialog} from "../types/dialog";
import {getSavedGame} from "./save";
import {QuestStep} from "../types/quest";
import {emitEvent, getCloseDialogEventName} from "./events";
import {CHARACTER_ID} from "../constants/character";

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

export const getCurrentDialog = (questStep: QuestStep): Dialog | undefined => {
    return questStep.dialogs?.[questStep.currentDialogIndex];
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
