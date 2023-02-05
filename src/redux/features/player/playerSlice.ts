import {CHARACTER_ID, CHARACTER_TYPE} from "../../../constants/character";
import {createSlice} from "@reduxjs/toolkit";
import {Player} from "../../../types/character";

const initialState: Player = {
    id: CHARACTER_ID.PLAYER,
    type: CHARACTER_TYPE.PLAYER,
    name: 'Benjam',
    level: 1,
    health: 42,
    armor: 0,
    inventory: {
        slots: 1,
        items: [],
        money: null,
        fastAccess: {
            slot1: null,
            slot2: null,
            slot3: null,
            slot4: null,
            slot5: null,
        },
        equipments: {
            head: null,
            chest: null,
            legs: null,
            feet: null,
            leftWeapon: null,
            rightWeapon: null,
        }
    },
    questsFinished: [],
    activeQuests: [],
}

export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        updatePlayer: (state, action) => {},
    },
});

export const {updatePlayer} = playerSlice.actions;

export default playerSlice.reducer;
