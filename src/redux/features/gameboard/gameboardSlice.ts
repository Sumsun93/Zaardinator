import {GameBoard} from "../../../types/game";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MAP} from "../../../constants/map";
import {QUESTS} from "../../../constants/quest";
import {Map} from "../../../types/map";

const initialState: GameBoard = {
    quests: QUESTS,
    currentMap: MAP.FOREST.TAVERNE,
}

export const gameboardSlice = createSlice({
    name: 'gameboard',
    initialState,
    reducers: {
        updateMap: (state, action: PayloadAction<Map>) => {
            state.currentMap = action.payload;
        },
    },
});

export const {updateMap} = gameboardSlice.actions;

export default gameboardSlice.reducer;
