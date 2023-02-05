import {GameBoard} from "../../../types/game";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MAP_NAME} from "../../../constants/map";
import {QUESTS} from "../../../constants/quest";

const initialState: GameBoard = {
    quests: QUESTS,
    currentMap: MAP_NAME.FOREST.TAVERNE,
}

export const gameboardSlice = createSlice({
    name: 'gameboard',
    initialState,
    reducers: {
        updateMap: (state, action: PayloadAction<string>) => {
            state.currentMap = action.payload;
        },
    },
});

export const {updateMap} = gameboardSlice.actions;

export default gameboardSlice.reducer;
