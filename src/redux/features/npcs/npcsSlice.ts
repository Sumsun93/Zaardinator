import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {NPC} from "../../../types/character";

const initialState: {NPCs: NPC[]} = {
    NPCs: [],
}

export const npcsSlice = createSlice({
    name: 'npcs',
    initialState,
    reducers: {
        createNPC: (state, action: PayloadAction<NPC>) => {
            state.NPCs.push(action.payload);
        },
        updateNPC: (state, action) => {},
    },
});

export const {updateNPC, createNPC} = npcsSlice.actions;

export default npcsSlice.reducer;
