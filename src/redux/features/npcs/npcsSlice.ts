import {createSlice} from "@reduxjs/toolkit";
import {NPC} from "../../../types/character";

const initialState: {NPCs: NPC[]} = {
    NPCs: [],
}

export const npcsSlice = createSlice({
    name: 'npcs',
    initialState,
    reducers: {
        updateNPC: (state, action) => {},
    },
});

export const {updateNPC} = npcsSlice.actions;

export default npcsSlice.reducer;
