import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {
    startNewQuest as reduxStartNewQuest,
    nextQuestStep as reduxNextQuestStep,
    nextQuestStepDialog as reduxNextQuestStepDialog,
} from "../redux/features/player/playerSlice";
import {QUEST_ID} from "../constants/quest";
import {getCurrentQuestStep, getQuestStep} from "../utils/quest";
import {hasNextDialog} from "../utils/dialog";

const usePlayer = () => {
    const dispatch = useDispatch();
    const player = useSelector((state: RootState) => state.player);

    const startNewQuest = useCallback((questId: QUEST_ID) => {
        dispatch(reduxStartNewQuest(questId));
    }, []);

    const nextQuestStep = useCallback((questId: QUEST_ID) => {
        // dispatch(reduxNextQuestStep(questId));
        console.log('nextQuestStep')
    }, []);

    const nextQuestStepDialog = useCallback((questId: QUEST_ID) => {
        const activePlayerQuest = player.activeQuests.find((quest) => quest.questId === questId);

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
    }, [player.activeQuests, nextQuestStep]);

    return {
        player,
        startNewQuest,
        nextQuestStep,
        nextQuestStepDialog,
    };
};

export default usePlayer;
