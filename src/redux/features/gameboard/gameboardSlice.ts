import {GameBoard} from "../../../types/game";
import {CHARACTER_ID, CHARACTER_TYPE} from "../../../constants/character";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MAP} from "../../../constants/map";
import {QUESTS} from "../../../constants/quest";
import {Player} from "../../../types/character";

const initialState: GameBoard = {
    quests: QUESTS,
    // player: {
    //     id: CHARACTER_ID.PLAYER,
    //     type: CHARACTER_TYPE.PLAYER,
    //     name: 'Benjam',
    //     level: 1,
    //     health: 42,
    //     armor: 0,
    //     inventory: {
    //         slots: 1,
    //         items: [],
    //         money: null,
    //         fastAccess: {
    //             slot1: null,
    //             slot2: null,
    //             slot3: null,
    //             slot4: null,
    //             slot5: null,
    //         },
    //         equipments: {
    //             head: null,
    //             chest: null,
    //             legs: null,
    //             feet: null,
    //             leftWeapon: null,
    //             rightWeapon: null,
    //         }
    //     },
    //     questsFinished: [],
    //     activeQuests: [],
    // },
    // NPCs: [],
    currentMap: MAP.TAVERNE,
}

export const gameboardSlice = createSlice({
    name: 'gameboard',
    initialState,
    reducers: {
        updatePlayer: (state, action) => {
        },
    },
});

export const {updatePlayer} = gameboardSlice.actions;

export default gameboardSlice.reducer;
