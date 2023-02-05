import {CHARACTER_ID, CHARACTER_TYPE} from "./character";

export const DEFAULT_NPC_PROPERTIES = {
    [CHARACTER_ID.CHOUMCHOUM]: {
        id: CHARACTER_ID.CHOUMCHOUM,
        type: CHARACTER_TYPE.NPC,
        name: 'ChoumChoum',
        level: 1,
        health: Number.POSITIVE_INFINITY,
        armor: Number.POSITIVE_INFINITY,
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
        inventory: {
            slots: 1,
            items: [],
            money: null,
        },
        quests: [],
    },
}
