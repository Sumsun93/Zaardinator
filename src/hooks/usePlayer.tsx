import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";

const usePlayer = () => {
    const dispatch = useDispatch();
    const player = useSelector((state: RootState) => state.player);

    return {
        player,
    };
};

export default usePlayer;
