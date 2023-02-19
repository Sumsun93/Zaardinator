import {ActivePlayerQuest, ActiveQuest, Quest} from "../types/quest";
import {QUEST_ID, QUESTS} from "../constants/quest";

export const isActiveQuest = (playerActiveQuest: ActiveQuest[], questId: QUEST_ID) => {
    return playerActiveQuest.some((activeQuest) => activeQuest.questId === questId);
}

export const isActiveQuestIsBeforeStep = (playerActiveQuest: ActiveQuest[], questId: QUEST_ID, stepIndex: number | null) => {
    if (stepIndex === null) {
        return false;
    }

    return playerActiveQuest.some((activeQuest) => (
        activeQuest.questId === questId && activeQuest.currentStepIndex < stepIndex
    ));
}

export const isActiveQuestIsAfterStep = (playerActiveQuest: ActiveQuest[], questId: QUEST_ID, stepIndex: number | null) => {
    if (stepIndex === null) {
        return false;
    }

    return playerActiveQuest.some((activeQuest) => (
        activeQuest.questId === questId && activeQuest.currentStepIndex > stepIndex
    ));
}

export const isQuestCompleted = (playerCompletedQuest: QUEST_ID[], questId: QUEST_ID) => {
    return playerCompletedQuest.includes(questId);
}

export const getQuest = (questId: QUEST_ID) => {
    return QUESTS.find((quest) => quest.id === questId);
};

export const getQuestStepIndex = (quest: Quest | undefined, stepId: string) => {
    if (!quest) {
        return null;
    }

    return quest.steps.findIndex((step) => step.id === stepId);
};

export const getQuestsByActiveQuests = (activeQuests: ActiveQuest[]): ActivePlayerQuest[] => {
    const quests = QUESTS.map((quest) => {
        const activeQuest = activeQuests.find((activeQuest) => activeQuest.questId === quest.id);

        if (activeQuest) {
            return {
                ...quest,
                currentStepIndex: activeQuest.currentStepIndex,
                currentDialogIndex: activeQuest.currentDialogIndex,
            }
        }

        return null;
    });

    return quests.filter((quest) => !!quest) as ActivePlayerQuest[]
}

export const getCurrentQuestStep = (quest: ActivePlayerQuest) => {
    return quest.steps[quest.currentStepIndex];
};

export const getQuestStep = (questId: QUEST_ID, stepIndex: number) => {
    const quest = getQuest(questId);

    if (!quest) {
        return null;
    }

    return quest.steps[stepIndex];
};
