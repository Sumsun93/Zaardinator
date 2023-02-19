import React, {useMemo} from 'react';
import usePlayer from "./usePlayer";
import {getQuestsByActiveQuests} from "../utils/quest";

const useQuests = () => {
    const {player} = usePlayer();

    const activeQuests = useMemo(() => {
        return getQuestsByActiveQuests(player.activeQuests);
    }, [player.activeQuests]);

    return {
        activeQuests,
        hasActiveQuests: !!activeQuests.length,
    };
};

export default useQuests;
