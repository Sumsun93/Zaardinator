import {CHARACTER_ID, CHARACTER_TYPE} from "./character";
import {NPC} from "../types/character";

export const DEFAULT_NPC_PROPERTIES: {[key: string]: NPC} = {
    [CHARACTER_ID.CHOUMCHOUM]: {
        id: CHARACTER_ID.CHOUMCHOUM,
        type: CHARACTER_TYPE.NPC,
        name: 'ChoumChoum',
        level: 1,
        health: Number.POSITIVE_INFINITY,
        armor: Number.POSITIVE_INFINITY,
        experience: 0,
        inventory: {
            slots: 1,
            items: [],
            money: null,
        },
        quests: [],
    },
    [CHARACTER_ID.BENJAM]: {
        id: CHARACTER_ID.BENJAM,
        type: CHARACTER_TYPE.NPC,
        name: 'Benjam',
        level: 1,
        health: Number.POSITIVE_INFINITY,
        armor: Number.POSITIVE_INFINITY,
        experience: 0,
        inventory: {
            slots: 1,
            items: [],
            money: null,
        },
        quests: [],
    },
    [CHARACTER_ID.GHOST_PRINCESS]: {
        id: CHARACTER_ID.GHOST_PRINCESS,
        type: CHARACTER_TYPE.NPC,
        name: 'Ghost Princess',
        level: 1,
        health: Number.POSITIVE_INFINITY,
        armor: Number.POSITIVE_INFINITY,
        experience: 0,
        inventory: {
            slots: 1,
            items: [],
            money: null,
        },
        quests: [],
    },
    [CHARACTER_ID.PRINCESS]: {
        id: CHARACTER_ID.PRINCESS,
        type: CHARACTER_TYPE.NPC,
        name: 'Princess',
        level: 1,
        health: Number.POSITIVE_INFINITY,
        armor: Number.POSITIVE_INFINITY,
        experience: 0,
        inventory: {
            slots: 1,
            items: [],
            money: null,
        },
        quests: [],
    },
}