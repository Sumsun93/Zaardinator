import React from 'react';
import useGameBoard from "../../hooks/useGameBoard";
import {MAP} from "../../constants/map";

export interface MapProps {}

const Map: React.FC<MapProps> = ({}) => {
    const {currentMap} = useGameBoard();

    const View = MAP[currentMap];

    return <View />;
};

export default Map;
