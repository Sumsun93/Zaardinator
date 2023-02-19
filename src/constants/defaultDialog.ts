import {CHARACTER_ID} from "./character";
import {emitEvent} from "../utils/events";
import {EVENT} from "./events";
import {Dialog} from "../types/dialog";
import {QUEST_ID} from "./quest";
import {closeNPCDialogBubble} from "../utils/dialog";

export const DEFAULT_NPC_DIALOG: {[key: string]: Dialog} = {
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
                    closeNPCDialogBubble(CHARACTER_ID.CHOUMCHOUM);
                    emitEvent(EVENT.CHOUMCHOUM.START_QCM);

                }
            },
            {
                text: 'Au revoir',
                onClick: () => {
                    closeNPCDialogBubble(CHARACTER_ID.CHOUMCHOUM);
                },
            },
        ],
    },
    [CHARACTER_ID.BENJAM]: {
        id: 'default',
        characterId: CHARACTER_ID.BENJAM,
        autoPlay: false,
        disabledByQuests: [QUEST_ID.SAVE_THE_PRINCESS],
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
                    closeNPCDialogBubble(CHARACTER_ID.BENJAM);
                }
            },
        ],
    }
};
