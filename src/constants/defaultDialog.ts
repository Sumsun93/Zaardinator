import {CHARACTER_ID} from "./character";
import {emitEvent, getCloseDialogEventName} from "../utils/events";
import {EVENT} from "./events";

export const DEFAULT_NPC_DIALOG = {
    [CHARACTER_ID.CHOUMCHOUM]: {
        id: 'default',
        characterId: CHARACTER_ID.CHOUMCHOUM,
        autoPlay: false, // TODO need to be true in prod
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
    },
    [CHARACTER_ID.BENJAM]: {
        id: 'default',
        characterId: CHARACTER_ID.BENJAM,
        autoPlay: false,
        text: [
            'Hep’s toi là ! Tu cherches un truc à faire ?',
            'Il y a une légende qui circule depuis des lustres dans les parages. T’as l’air vaillant, ça t’intéresse ?',
            'Assieds toi et prends une bière au comptoir Choumchoum se fera un plaisir de te la lustrer.',
            'Un château hanté surplombe la colline plus loin, personne n’ose s’y approcher. On y entend toutes sortes de bruits, d’explosions, de cris et de pleurs. Paraîtrait même qu’un fou y a élu domicile.',
            'Oh éh bois pas trop vite malheureux ! Bon sang mais c’est précieux enfin dis ! Tiens que j’va m’en prendre une aussi.',
            'Tu trouveras le château plus loin sur la droite de la taverne, débrouilles toi tout seul car personne ne t’aidera à partir de là. Oh et puis si on s’est jamais vu d’accord ?'
        ],
        options: [
            {
                text: 'D\'accord',
                onClick: () => {
                    emitEvent<boolean>(getCloseDialogEventName(CHARACTER_ID.BENJAM), false);
                }
            },
        ],
    }
};
