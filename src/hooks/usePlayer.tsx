import React, {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {
    startNewQuest as reduxStartNewQuest,
    validateQuestStep as reduxValidateQuestStep,
} from "../redux/features/player/playerSlice";
import {QUEST_ID} from "../constants/quest";

const usePlayer = () => {
    const dispatch = useDispatch();
    const player = useSelector((state: RootState) => state.player);

    const startNewQuest = useCallback((questId: QUEST_ID) => {
        dispatch(reduxStartNewQuest(questId));
    }, []);

    const validateQuestStep = useCallback((questId: QUEST_ID) => {
        dispatch(reduxValidateQuestStep(questId));
    }, []);

    return {
        player,
        startNewQuest,
        validateQuestStep,
    };
};

export default usePlayer;
