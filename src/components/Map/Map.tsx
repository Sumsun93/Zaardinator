import React from 'react';
import useGameBoard from "../../hooks/useGameBoard";
import {MAP} from "../../constants/map";

export interface MapProps {}

const Map: React.FC<MapProps> = ({}) => {
    const {gameboard} = useGameBoard();

    const View = MAP[gameboard.currentMap];

    return <View />;
};

export default Map;
