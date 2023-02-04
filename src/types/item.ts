import {ITEM_ID, ITEM_TYPE} from "../constants/item";

export interface Item {
    id: ITEM_ID;
    type: ITEM_TYPE;
    quantity: number;
    maxStack: number;
    image: string;
    price: number;
}

export interface DealerItem extends Item {
    maxQuantity: number;
}
