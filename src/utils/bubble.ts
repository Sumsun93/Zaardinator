import {CHARACTER_ID} from "../constants/character";

export const getCharacterBubblePosition = (characterId: string) => {
    switch (characterId) {
        case CHARACTER_ID.CHOUMCHOUM:
            return {
                top: '-11%',
                left: '-40%',
            };

        case CHARACTER_ID.BENJAM:
            return {
                top: '-30%',
                right: '17%',
            }
        case CHARACTER_ID.NARRATOR:
            return {
                bottom: '11vh',
                left: `calc(50vw - 12.5vw - 15px)`,
            };
        default:
            return {
                top: 0,
                left: 0,
            };
    }
};
