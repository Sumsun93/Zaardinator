import {GameBoard} from "../../../types/game";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MAP_NAME} from "../../../constants/map";
import {getSavedGame} from "../../../utils/save";

const gameSave = getSavedGame();

const initialState: GameBoard = {
    currentMap: gameSave?.gameboard.currentMap || MAP_NAME.FOREST.TAVERNE,
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
