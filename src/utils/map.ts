import {emitEvent} from "./events";
import {EVENT} from "../constants/events";

export const changeMap = (mapName: string) => {
    emitEvent<string>(EVENT.MAP.UPDATE, mapName);
};
