import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import QUEST_STATES from "../../../constants/questStates";
import ITEMS from "../../../constants/items";
import {SOUNDS} from "../../../components/SoundEffect";

export interface GameState {
    isInit: boolean
    bgPosition: number
    questState: QUEST_STATES
    itemInventory: ITEMS,
    settings: {
        openEscapeMenu: boolean
        volume: number
    }
    soundToPlay: SOUNDS
    soundVolumeModifier: number
    shortEffect: SOUNDS
    shortEffectVolumeModifier: number
}

const initialState: GameState = {
    isInit: false,
    bgPosition: 0,
    questState: localStorage.getItem('questPrincess') ? localStorage.getItem('questPrincess') as QUEST_STATES : QUEST_STATES.NOT_STARTED,
    itemInventory: localStorage.getItem('itemInventory') ? localStorage.getItem('itemInventory') as ITEMS : ITEMS.NONE,
    settings: {
        openEscapeMenu: false,
        volume: localStorage.getItem('volume') ? parseFloat(localStorage.getItem('volume') as string) : 0.5,
    },
    soundToPlay: SOUNDS.NONE,
    soundVolumeModifier: 1,
    shortEffect: SOUNDS.NONE,
    shortEffectVolumeModifier: 1,
}

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setInit: (state, action: PayloadAction<boolean>) => {
            state.isInit = action.payload
        },
        addBgPositionValue: (state, action: PayloadAction<number>) => {
            if (state.bgPosition + action.payload > 100) {
                state.bgPosition = 100
                return
            }
            else if (state.bgPosition + action.payload < 0) {
                state.bgPosition = 0
                return
            }
            state.bgPosition = state.bgPosition + action.payload
        },
        setQuestState: (state, action: PayloadAction<QUEST_STATES>) => {
            state.questState = action.payload
            localStorage.setItem('questPrincess', action.payload)
        },
        validQuestDrop: (state, action: PayloadAction<{
            neededState: QUEST_STATES,
            questState: QUEST_STATES,
            neededItem: ITEMS,
            itemInventory: ITEMS
        }>) => {
            if (state.questState !== action.payload.neededState || state.itemInventory !== action.payload.neededItem) {
                return
            }

            state.questState = action.payload.questState
            state.itemInventory = action.payload.itemInventory
            localStorage.setItem('questPrincess', action.payload.questState)
            localStorage.setItem('itemInventory', action.payload.itemInventory)
        },
        setItemInventory: (state, action: PayloadAction<ITEMS>) => {
            state.itemInventory = action.payload
            localStorage.setItem('itemInventory', action.payload)
        },
        setSettings: (state, action: PayloadAction<{
            openEscapeMenu?: boolean,
            volume?: number
        }>) => {
            if (action.payload.openEscapeMenu !== undefined) {
                state.settings.openEscapeMenu = action.payload.openEscapeMenu
            }
            if (action.payload.volume !== undefined) {
                state.settings.volume = action.payload.volume
                localStorage.setItem('volume', action.payload.volume.toString())
            }
        },
        setSoundToPlay: (state, action: PayloadAction<{
            sound: SOUNDS,
            volumeModifier?: number
        }>) => {
            state.soundToPlay = action.payload.sound
            state.soundVolumeModifier = action.payload.volumeModifier || 1
        },
        setShortEffect: (state, action: PayloadAction<{
            sound: SOUNDS,
            volumeModifier?: number
        }>) => {
            state.shortEffect = action.payload.sound
            state.shortEffectVolumeModifier = action.payload.volumeModifier || 1
        }
    },
})

export const {
    setInit,
    addBgPositionValue,
    validQuestDrop,
    setQuestState,
    setItemInventory,
    setSettings,
    setSoundToPlay,
    setShortEffect,
} = gameSlice.actions

export default gameSlice.reducer
