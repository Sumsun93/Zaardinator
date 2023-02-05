import React, {useCallback, useMemo} from 'react';
import {CHARACTER_ID} from "../constants/character";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {createNPC} from "../redux/features/npcs/npcsSlice";
import {NPC} from "../types/character";
import {DEFAULT_NPC_DIALOG} from "../constants/defaultDialog";

const useNPC = (characterId: CHARACTER_ID) => {
    const dispatch = useDispatch();
    const npcs = useSelector((state: RootState) => state.npcs);

    const npc = useMemo(() => {
        const npc = npcs.NPCs.find(npc => npc.id === characterId);

        return {
            ...npc,
            // @ts-ignore
            defaultDialog: DEFAULT_NPC_DIALOG?.[characterId],
        }
    }, [characterId, npcs]);

    const create = useCallback((npc: NPC) => {
        dispatch(createNPC(npc));
    }, []);

    return {
        npc,
        create,
    };
};

export default useNPC;
