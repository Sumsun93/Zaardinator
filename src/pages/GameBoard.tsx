import React, {useEffect} from 'react';
import Map from "../components/Map/Map";
import useGameBoard from "../hooks/useGameBoard";
import usePlayer from "../hooks/usePlayer";
import {saveGame} from "../utils/save";

export interface GameBoardProps {}

const GameBoard: React.FC<GameBoardProps> = ({}) => {
    const {gameboard} = useGameBoard();
    const {player} = usePlayer();
    
    useEffect(() => {
        saveGame(player, gameboard);
    }, [gameboard, player]);

    return <Map />;
};

export default GameBoard;
