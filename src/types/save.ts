import {GameBoard} from "./game";
import {Player} from "./character";

export interface GameSave {
    player: Omit<Player, 'id' | 'type'>
    gameboard: Pick<GameBoard, 'currentMap'>;
}
