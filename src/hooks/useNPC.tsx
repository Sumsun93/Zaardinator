import React, {useMemo} from 'react';
import {CHARACTER_ID} from "../constants/character";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";

const useNPC = (characterId: CHARACTER_ID) => {
    const dispatch = useDispatch();
    const npcs = useSelector((state: RootState) => state.npcs);

    const npc = useMemo(() => {
        return npcs.NPCs.find(npc => npc.id === characterId);
    }, [characterId, npcs]);

    return {
        npc,
    };
};

export default useNPC;
