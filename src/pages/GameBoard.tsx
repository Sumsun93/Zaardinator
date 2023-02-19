import React, {useEffect} from 'react';
import Map from "../components/Map/Map";
import useGameBoard from "../hooks/useGameBoard";
import usePlayer from "../hooks/usePlayer";
import {saveGame} from "../utils/save";
import useEvent from "../hooks/useEvent";
import {QUEST_ID} from "../constants/quest";
import {EVENT} from "../constants/events";

export interface GameBoardProps {}

const GameBoard: React.FC<GameBoardProps> = ({}) => {
    const {gameboard} = useGameBoard();
    const {player, nextQuestStepDialog} = usePlayer();

    useEvent<QUEST_ID>(EVENT.QUEST.NEXT, nextQuestStepDialog);

    useEffect(() => {
        saveGame(player, gameboard);
    }, [gameboard, player]);

    return <Map />;
};

export default GameBoard;
