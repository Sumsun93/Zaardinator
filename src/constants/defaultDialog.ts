import {CHARACTER_ID} from "./character";
import {emitEvent, getCloseDialogEventName} from "../utils/events";
import {EVENT} from "./events";

export const DEFAULT_NPC_DIALOG = {
    [CHARACTER_ID.CHOUMCHOUM]: {
        id: 'default',
        characterId: CHARACTER_ID.CHOUMCHOUM,
        autoPlay: true,
        text: [
            'B\'soir, bienvenue à la taverne des Trois Chaînes, Choumchoum pour t\'servir !',
            'T\'es prêt à répondre à mes questions ?',
        ],
        options: [
            {
                text: 'Oui',
                onClick: () => {
                    emitEvent<boolean>(getCloseDialogEventName(CHARACTER_ID.CHOUMCHOUM), false);
                    emitEvent(EVENT.CHOUMCHOUM.START_QCM);

                }
            },
            {
                text: 'Au revoir',
                onClick: () => {
                    emitEvent<boolean>(getCloseDialogEventName(CHARACTER_ID.CHOUMCHOUM), false);
                },
            },
        ],
    }
};
