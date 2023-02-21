import React, {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {updateMap, startGame as startGameRedux} from "../redux/features/gameboard/gameboardSlice";

const useGameBoard = () => {
    const dispatch = useDispatch();
    const gameboard = useSelector((state: RootState) => state.gameboard);

    const moveToMap = useCallback((mapName: string) => {
        dispatch(updateMap(mapName));
    }, [dispatch]);

    const startGame = useCallback(() => {
        dispatch(startGameRedux());
    }, [dispatch]);

    return {
        gameboard,
        moveToMap,
        startGame,
    };
};

export default useGameBoard;
