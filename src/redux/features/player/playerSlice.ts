import {CHARACTER_ID, CHARACTER_TYPE} from "../../../constants/character";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Player} from "../../../types/character";
import {QUEST_ID} from "../../../constants/quest";
import {getSavedGame} from "../../../utils/save";
import {hasNextDialog} from "../../../utils/dialog";

const gameSave = getSavedGame();

const initialState: Player = {
    id: CHARACTER_ID.PLAYER,
    type: CHARACTER_TYPE.PLAYER,
    name: gameSave?.player.name || 'Benjam',
    level: gameSave?.player.level || 1,
    health: gameSave?.player.health || 42,
    armor: gameSave?.player.armor || 0,
    experience: gameSave?.player.experience || 0,
    inventory: gameSave?.player.inventory || {
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
    questsFinished: gameSave?.player.questsFinished || [],
    activeQuests: gameSave?.player.activeQuests || [],
}

export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        updatePlayer: (state, action) => {},
        startNewQuest: (state, action: PayloadAction<QUEST_ID>) => {
            state.activeQuests.push({
                questId: action.payload,
                currentStepIndex: 0,
                currentDialogIndex: 0,
            });
        },
        nextQuestStep: (state, action: PayloadAction<QUEST_ID>) => {
            state.activeQuests = state.activeQuests.map((activeQuest) => {
                if (activeQuest.questId === action.payload) {
                    return {
                        ...activeQuest,
                        currentStepIndex: activeQuest.currentStepIndex + 1,
                    };
                }

                return activeQuest;
            });
        },
        nextQuestStepDialog: (state, action: PayloadAction<QUEST_ID>) => {
            state.activeQuests = state.activeQuests.map((activeQuest) => {
                if (activeQuest.questId === action.payload) {
                    return {
                        ...activeQuest,
                        currentDialogIndex: activeQuest.currentDialogIndex + 1,
                    };
                }

                return activeQuest;
            });
        },
        validateQuest: (state, action: PayloadAction<QUEST_ID>) => {
            state.activeQuests = state.activeQuests.filter((activeQuest) => activeQuest.questId !== action.payload);
            state.questsFinished.push(action.payload);
        },
    },
});

export const {
    updatePlayer,
    startNewQuest,
    nextQuestStep,
    nextQuestStepDialog,
    validateQuest,
} = playerSlice.actions;

export default playerSlice.reducer;
