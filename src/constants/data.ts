import {EFFECT_TYPES, QUESTION_TYPES} from "./questionTypes";

export const DATA = [
    {
        title: 'Combien d\'heure as-tu dormis ? (sans compter la sieste)',
        type: QUESTION_TYPES.SLIDER,
        min: 4,
        max: 12,
        default: 7,
        unit: 'h',
        validate: (value: number) => {
            if (value < 4) {
                return 0;
            }
            if (value < 6) {
                return 4;
            }
            if (value < 8) {
                return 6;
            }
            if (value < 10) {
                return 9;
            }
            if (value < 12) {
                return 10;
            }
        },
    },
    {
        title: 'As-tu fait une sieste aujourd\'hui ?',
        type: QUESTION_TYPES.SWITCH,
        default: false,
        validate: (value: boolean) => {
            if (value) {
                return 10;
            }
            return 0;
        }
    },
    {
        title: 'Combien de fois as-tu bu de l\'eau aujourd\'hui ?',
        type: QUESTION_TYPES.SLIDER,
        min: 0,
        max: 10,
        default: 3,
        unit: 'verre(s)',
        validate: (value: number) => {
            if (value < 2) {
                return -2;
            }
            if (value < 4) {
                return 0;
            }
            if (value < 6) {
                return 5;
            }
            if (value < 8) {
                return 7;
            }
            if (value < 10) {
                return 10;
            }
        }
    },
    {
        title: 'As-tu fait du sport aujourd\'hui ?',
        type: QUESTION_TYPES.SWITCH,
        default: false,
        validate: (value: boolean) => {
            if (value) {
                return 10;
            }
            return 5;
        }
    },
    {
        title: 'As-tu été chez le barbier/coiffeur récemment ? (dans les 3 derniers jours)',
        type: QUESTION_TYPES.SWITCH,
        default: false,
        validate: (value: boolean) => {
            if (value) {
                return 10;
            }
            return 5;
        }
    },
    {
        title: 'Quelqu\'un de ton entourage est-il malade ?',
        type: QUESTION_TYPES.MULTIPLE_CHOICE,
        options: [
            'Toi',
            'MmeZaardoz',
            'BabyZaardoz',
        ],
        default: [],
        validate: (value: string[]) => {
            if (value.length === 0) {
                return 10;
            }
            if (value.length === 1) {
                return -1;
            }
            return -2;
        }
    },
    {
        title: 'As-tu renversé ton café aujourd\'hui ?',
        type: QUESTION_TYPES.SWITCH,
        default: false,
        validate: (value: boolean) => {
            if (value) {
                return 0;
            }
            return 10;
        }
    },
    {
        title: 'As-tu acheté une chaise cimetière récemment ?',
        type: QUESTION_TYPES.SWITCH,
        default: false,
        effect: EFFECT_TYPES.SHOW_SUMSUN,
        validate: (value: boolean) => {
            if (value) {
                return 10;
            }
            return 5;
        }

    },
    {
        title: 'As-tu fait des travaux aujourd\'hui ?',
        type: QUESTION_TYPES.SWITCH,
        default: false,
        validate: (value: boolean) => {
            if (value) {
                return 5;
            }
            return 10;
        }
    },
    {
        title: 'As-tu vu un ou des pote(s) aujourd\'hui ?',
        type: QUESTION_TYPES.SWITCH,
        default: false,
        validate: (value: boolean) => {
            if (value) {
                return 10;
            }
            return 3;
        }
    },
    {
        title: 'Combien de verre d\'alcool as-tu bu aujourd\'hui ?',
        type: QUESTION_TYPES.SLIDER,
        min: 0,
        max: 50,
        unit: 'verre(s)',
        labelState: [
            'Je ne suis pas bourré monsieur !',
            'J\'suis pas bourré monsieur !',
            'J\'suis pas bourré m\'sieur !',
            'J\'suis pas bourré j\'ai dit !',
            'Chui pas bourréééééééééé !',
            'Ch\'crois chui bourré !',
            'OUEEE CHUI BOURRAI !!!',
        ],
        effect: EFFECT_TYPES.BLUR,
        default: 0,
        validate: (value: number) => {
            if (value < 3) {
                return 10;
            }
            return 0;
        }
    },
    {
        title: 'As-tu mangé des fruits aujourd\'hui ?',
        type: QUESTION_TYPES.SWITCH,
        default: false,
        validate: (value: boolean) => {
            if (value) {
                return 10;
            }
            return 5;
        }
    },
    {
        title: 'As-tu mangé des légumes aujourd\'hui ?',
        type: QUESTION_TYPES.SWITCH,
        default: false,
        validate: (value: boolean) => {
            if (value) {
                return 10;
            }
            return 5;
        }
    },
    {
        title: 'Faisait-il beau aujourd\'hui ?',
        type: QUESTION_TYPES.SWITCH,
        default: false,
        validate: (value: boolean) => {
            if (value) {
                return 10;
            }
            return 5;
        }
    },
    {
        title: 'Te sens-tu confiant aujourd\'hui ?',
        type: QUESTION_TYPES.SWITCH,
        default: false,
        validate: (value: boolean) => {
            if (value) {
                return 15;
            }
            return 5;
        }
    },
    {
        title: 'Est ce qu\'il y a eu du bruit pendant ta nuit ?',
        type: QUESTION_TYPES.MULTIPLE_CHOICE,
        options: [
            'Voisins',
            'Chasseurs',
            'Rallye',
        ],
        default: [],
        validate: (value: string[]) => {
            if (value.length === 0) {
                return 10;
            }
            if (value.length === 1) {
                return -1;
            }
            return -2;
        }
    },
    {
        title: 'Est ce que BabyZaardoz a bien dormis ?',
        type: QUESTION_TYPES.SWITCH,
        validate: (value: boolean) => {
            if (value) {
                return 10;
            }
            return 5;
        }
    },
    {
        title: 'BabyZaardoz s\'est elle transformée en démon ?',
        type: QUESTION_TYPES.SWITCH,
        validate: (value: boolean) => {
            if (value) {
                return -10;
            }
            return 5;
        }
    },
    {
        title: 'As tu gagné à un jeux d\'argent ?',
        type: QUESTION_TYPES.SWITCH,
        validate: (value: boolean) => {
            if (value) {
                return 10;
            }
            return 5;
        }
    },
    {
        title: 'Quelle(s) boisson(s) chaude(s) as-tu bu aujourd\'hui ?',
        type: QUESTION_TYPES.MULTIPLE_CHOICE,
        options: [
            'Thé',
            'Café',
            'Chocolat',
        ],
        default: [],
        validate: (value: string[]) => {
            if (value.length === 0) {
                return 0;
            }
            if (value.length === 1) {
                return 5;
            }
            return 10;
        }
    },
    {
        title: 'Portes tu le caleçon préféré de MmeZaardoz ?',
        type: QUESTION_TYPES.SWITCH,
        validate: (value: boolean) => {
            if (value) {
                return 10;
            }
            return 5;
        }
    },
    {
        title: 'Portes tu ton caleçon porte bonheur ?',
        type: QUESTION_TYPES.SWITCH,
        validate: (value: boolean) => {
            if (value) {
                return 10;
            }
            return 5;
        }
    },
    {
        title: 'Combien de trou as-tu aux chaussettes ?',
        type: QUESTION_TYPES.SLIDER,
        min: 0,
        max: 10,
        unit: 'trou(s)',
        default: 0,
        validate: (value: number) => {
            if (value === 0) {
                return 10;
            }
            if (value < 3) {
                return 5;
            }
            return 0;
        }
    },
    {
        title: 'Es-tu en pyjama ?',
        type: QUESTION_TYPES.SWITCH,
        validate: (value: boolean) => {
            if (value) {
                return 10;
            }
            return 5;
        }
    },
    {
        title: 'As-tu lancé le stream a l\'heure ?',
        type: QUESTION_TYPES.SWITCH,
        validate: (value: boolean) => {
            if (value) {
                return 10;
            }
            return 5;
        }
    },
    {
        title: 'Es-tu arrivé après le décompte du début de stream ?',
        type: QUESTION_TYPES.SWITCH,
        validate: (value: boolean) => {
            if (value) {
                return 0;
            }
            return 10;
        }
    },
    {
        title: 'Est-ce que Mushy va bien ?',
        type: QUESTION_TYPES.SWITCH,
        validate: (value: boolean) => {
            if (value) {
                return 10;
            }
            return 0;
        }
    },
    {
        title: 'Est-ce que le chat va bien ?',
        type: QUESTION_TYPES.SWITCH,
        validate: (value: boolean) => {
            if (value) {
                return 10;
            }
            return 0;
        }
    },
    {
        title: 'Est-ce que tu nous cache un secret en RP ?',
        type: QUESTION_TYPES.SWITCH,
        validate: (value: boolean) => {
            if (value) {
                return 10;
            }
            return 10;
        }
    },
    {
        title: 'Est-ce que ton AIM a progressé ?',
        type: QUESTION_TYPES.SWITCH,
        validate: (value: boolean) => {
            if (value) {
                return 10;
            }
            return 5;
        }
    },
    {
        title: 'As-tu fais de la moto aujourd\'hui ?',
        type: QUESTION_TYPES.SWITCH,
        validate: (value: boolean) => {
            if (value) {
                return 10;
            }
            return 5;
        }
    },
    {
        title: 'As-tu encore laissé MmeZaardoz s\'occuper des courses ?',
        type: QUESTION_TYPES.SWITCH,
        validate: (value: boolean) => {
            if (value) {
                return -10;
            }
            return 5;
        }
    },
    {
        title: 'Sais tu ce que tu vas manger ce soir ?',
        type: QUESTION_TYPES.SWITCH,
        validate: (value: boolean) => {
            if (value) {
                return 10;
            }
            return 0;
        }
    },
    {
        title: 'Te souviens tu de ce que tu as mangé hier ? (Dis le à haute voix !)',
        type: QUESTION_TYPES.SWITCH,
        validate: (value: boolean) => {
            if (value) {
                return 10;
            }
            return 0;
        }
    },
    {
        title: 'Es-tu heureux ?',
        type: QUESTION_TYPES.SWITCH,
        validate: (value: boolean) => {
            if (value) {
                return 10;
            }
            return 5;
        }
    },
    {
        title: 'As-tu offert un cadeau a MmeZaardoz ?',
        type: QUESTION_TYPES.SWITCH,
        validate: (value: boolean) => {
            if (value) {
                return 10;
            }
            return 0;
        }
    },
    {
        title: 'Le copain chien de Mushy va bien ?',
        type: QUESTION_TYPES.SWITCH,
        validate: (value: boolean) => {
            if (value) {
                return 10;
            }
            return 0;
        }
    },
    {
        title: 'Où en est la cheminée ?',
        type: QUESTION_TYPES.MULTIPLE_CHOICE,
        options: [
            'Pas commencé',
            'En cours',
            'Terminé',
        ],
        default: [],
        validate: (value: string[]) => {
            if (value.length === 0) {
                return 0;
            }
            if (value.length === 1) {
                return 5;
            }
            return 10;
        }
    },
    {
        title: 'Quand sort OptionRP (go vous WL bande fous) ?',
        type: QUESTION_TYPES.SLIDER,
        min: 0,
        max: 36,
        unit: 'mois',
        default: 0,
        validate: (value: number) => {
            return 10;
        }
    },
    {
        title: 'Bravo, aujourd\'hui tu as eu un bonus !<br/>Pas besoin de répondre à la question, tu as gagné des points !',
        type: QUESTION_TYPES.NONE,
        validate: (value: any) => {
            return 10;
        }
    },
    {
        title: 'Oups, pas de chance cette fois !<br/>Pas besoin de répondre à la question, tu as perdu des points...',
        type: QUESTION_TYPES.NONE,
        validate: (value: any) => {
            return 0;
        }
    },
    {
        title: 'Vas tu jouer a un jeu qui te hype a fond ce soir ?',
        type: QUESTION_TYPES.SWITCH,
        validate: (value: boolean) => {
            if (value) {
                return 10;
            }
            return 0;
        }
    },
    {
        title: 'Combien payes tu tes modérateurs ?',
        type: QUESTION_TYPES.UNIQUE_CHOICE,
        options: [
            'Ce sont des esclaves',
            'Ne se prononce pas',
            'Quand ils travailleront vraiment'
        ],
        default: '',
        validate: (value: string) => {
            return 10;
        }
    },
    {
        title: 'Quand vas tu enfin envoyer le cadeau pour Nko ?',
        type: QUESTION_TYPES.SLIDER,
        min: 0,
        max: 365,
        unit: 'jour(s)',
        default: 0,
        validate: (value: number) => {
            return 10;
        }
    },
    {
        title: 'As-tu grandis cette nuit ?',
        type: QUESTION_TYPES.SWITCH,
        validate: (value: boolean) => {
            if (value) {
                return 10;
            }
            return 5;
        }
    }
]
