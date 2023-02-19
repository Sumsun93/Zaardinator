import {CHARACTER_ID} from "../constants/character";

export const getCharacterBubblePosition = (characterId: string, right: boolean) => {
    switch (characterId) {
        case CHARACTER_ID.CHOUMCHOUM:
            return {
                bottom: '96%',
                left: '-51%',
            };
        case CHARACTER_ID.BENJAM:
            return {
                bottom: '100%',
                right: '13%',
            }
        case CHARACTER_ID.NARRATOR:
            return {
                bottom: '11vh',
                left: `calc(50vw - 12.5vw - 15px)`,
            };
        case CHARACTER_ID.NKO:
            if (!right) {
                return {
                    bottom: '83%',
                    left: '50%',
                };
            }

            return {
                bottom: '83%',
                left: '-90%',
            };
        default:
            return {
                top: 0,
                left: 0,
            };
    }
};
