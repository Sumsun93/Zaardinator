import React, {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {updateMap} from "../redux/features/gameboard/gameboardSlice";
import {Map} from "../types/map";

const useGameBoard = () => {
    const dispatch = useDispatch();
    const gameboard = useSelector((state: RootState) => state.gameboard);

    const moveToMap = useCallback((mapName: Map) => {
        dispatch(updateMap(mapName));
    }, [dispatch]);

    return {
        ...gameboard,
        moveToMap,
    };
};

export default useGameBoard;
