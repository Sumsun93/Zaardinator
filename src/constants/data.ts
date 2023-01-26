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
        title: 'Portes-tu un pyjama troué actuellement ?',
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
    }
]
