import {Player} from "../types/character";
import {GameBoard} from "../types/game";
import {LOCAL_STORAGE} from "../constants/localStorage";
import {GameSave} from "../types/save";

export const saveGame = (player: Player, gameboard: GameBoard) => {
    const save: GameSave = {
        player: {
            name: player.name,
            health: player.health,
            armor: player.armor,
            level: player.level,
            experience: player.experience,
            inventory: player.inventory,
            questsFinished: player.questsFinished,
            activeQuests: player.activeQuests,
        },
        gameboard: {
            currentMap: gameboard.currentMap,
        },
    };

    localStorage.setItem(LOCAL_STORAGE.GAME_SAVE, JSON.stringify(save));
};

export const getSavedGame = (): GameSave | null => {
    const save = localStorage.getItem(LOCAL_STORAGE.GAME_SAVE);

    if (save) {
        return JSON.parse(save);
    }

    return null;
}
