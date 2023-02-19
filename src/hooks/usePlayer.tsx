import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {
    startNewQuest as reduxStartNewQuest,
    nextQuestStep as reduxNextQuestStep,
    nextQuestStepDialog as reduxNextQuestStepDialog,
    validateQuest as reduxValidateQuest,
} from "../redux/features/player/playerSlice";
import {QUEST_ID} from "../constants/quest";
import {getQuestStep, hasNextStep} from "../utils/quest";
import {hasNextDialog} from "../utils/dialog";

const usePlayer = () => {
    const dispatch = useDispatch();
    const player = useSelector((state: RootState) => state.player);

    const startNewQuest = useCallback((questId: QUEST_ID) => {
        dispatch(reduxStartNewQuest(questId));
    }, []);

    const getActivePlayerQuest = useCallback((questId: QUEST_ID) => {
        return player.activeQuests.find((quest) => quest.questId === questId);
    }, [player.activeQuests]);

    const validateQuest = useCallback((questId: QUEST_ID) => {
        const activePlayerQuest = getActivePlayerQuest(questId);

        if (!activePlayerQuest) {
            return;
        }

        const questStep = getQuestStep(activePlayerQuest.questId, activePlayerQuest.currentStepIndex);

        if (
            !questStep ||
            hasNextStep(questId, activePlayerQuest.currentStepIndex) ||
            hasNextDialog(questStep, activePlayerQuest.currentDialogIndex)
        ) {
            return;
        }

        dispatch(reduxValidateQuest(questId));
    }, [getActivePlayerQuest, dispatch]);

    const nextQuestStep = useCallback((questId: QUEST_ID) => {
        const activePlayerQuest = getActivePlayerQuest(questId);

        if (!activePlayerQuest) {
            return;
        }

        const questStep = getQuestStep(activePlayerQuest.questId, activePlayerQuest.currentStepIndex);

        if (!questStep || hasNextDialog(questStep, activePlayerQuest.currentDialogIndex)) {
            return;
        }

        if (hasNextStep(questId, activePlayerQuest.currentStepIndex)) {
            dispatch(reduxNextQuestStep(questId));
            return;
        }

        validateQuest(questId);
    }, [getActivePlayerQuest, validateQuest, dispatch]);

    const nextQuestStepDialog = useCallback((questId: QUEST_ID) => {
        const activePlayerQuest = getActivePlayerQuest(questId);

        if (!activePlayerQuest) {
            return;
        }

        const questStep = getQuestStep(activePlayerQuest.questId, activePlayerQuest.currentStepIndex);

        if (!questStep) {
            return;
        }

        if (hasNextDialog(questStep, activePlayerQuest.currentDialogIndex)) {
            dispatch(reduxNextQuestStepDialog(questId));
            return;
        }

        nextQuestStep(questId);
    }, [getActivePlayerQuest, nextQuestStep, dispatch]);

    return {
        player,
        startNewQuest,
        nextQuestStep,
        nextQuestStepDialog,
    };
};

export default usePlayer;
