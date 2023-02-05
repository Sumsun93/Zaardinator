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
    }
};
