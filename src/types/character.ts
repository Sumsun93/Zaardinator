import {QUEST_ID} from "../constants/quest";
import {CHARACTER_ID, CHARACTER_TYPE} from "../constants/character";
import {ActiveQuest} from "./quest";
import {CharacterInventory} from "./inventory";
import {DealerItem} from "./item";

export interface Character {
    id: CHARACTER_ID;
    type: CHARACTER_TYPE;
    name: string;
    level: number;
    health: number;
    armor: number;
    inventory: CharacterInventory;
}

export interface Player extends Character {
    questsFinished: QUEST_ID[];
    activeQuests: ActiveQuest[];
}

export interface NPC extends Character {
    quests: QUEST_ID[];
    defaultDialog: string;
}

export interface NPCDealer extends NPC {
    reputation: number;
    items: DealerItem[];
}
