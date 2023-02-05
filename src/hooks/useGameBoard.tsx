import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";

const useGameBoard = () => {
    const dispatch = useDispatch();
    const gameboard = useSelector((state: RootState) => state.gameboard);

    return {
        gameboard,
    };
};

export default useGameBoard;
