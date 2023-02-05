import {EVENT} from "../constants/events";

export const emitEvent = <T>(eventName: string, data?: T) => {
    const event = new CustomEvent<T>(eventName, {
        detail: data,
    });

    window.dispatchEvent(event);
}

export const getCloseDialogEventName = (characterId: string) => {
    return `${characterId}_${EVENT.CLOSE_DIALOG}`;
};
