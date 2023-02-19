import React, {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {updateMap} from "../redux/features/gameboard/gameboardSlice";

const useGameBoard = () => {
    const dispatch = useDispatch();
    const gameboard = useSelector((state: RootState) => state.gameboard);

    const moveToMap = useCallback((mapName: string) => {
        dispatch(updateMap(mapName));
    }, [dispatch]);

    return {
        gameboard,
        moveToMap,
    };
};

export default useGameBoard;
