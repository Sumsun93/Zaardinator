import {Item} from "./item";

export interface Inventory {
    slots: number;
    items: Item[];
}

export interface CharacterInventory extends Inventory {
    money: number | null; // Si null alors l'argent est infini
    fastAccess?: {
        slot1: Item | null;
        slot2: Item | null;
        slot3: Item | null;
        slot4: Item | null;
        slot5: Item | null;
    };
    equipments?: {
        head: Item | null;
        chest: Item | null;
        legs: Item | null;
        feet: Item | null;
        leftWeapon: Item | null;
        rightWeapon: Item | null;
    }
}
