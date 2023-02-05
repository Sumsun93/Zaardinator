import React from 'react';
import useGameBoard from "../../hooks/useGameBoard";

export interface MapProps {}

const Map: React.FC<MapProps> = ({}) => {
    const {currentMap} = useGameBoard();
    const {View} = currentMap;

    return <View />;
};

export default Map;
