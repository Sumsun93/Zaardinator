import Tavern from "../pages/Tavern";
import ExtCastle from "../pages/ExtCastle";
import Home from "../pages/Home";
import Castle from "../pages/Castle";
import Bedroom from "../pages/Bedroom";
import Donjon from "../pages/Donjon";
import Labo from "../pages/Labo";

export const MAP_NAME = {
    TAVERNE: {
        BAR: 'taverne-bar',
    },
    FOREST: {
        CASTLE: 'forest-castle',
        TAVERNE: 'forest-taverne',
    },
    CASTLE: {
        HALL: 'castle-hall',
        BEDROOM: 'castle-bedroom',
        DONJON: 'castle-donjon',
        LABO: 'castle-labo',
    }
}

export const MAP = {
    [MAP_NAME.TAVERNE.BAR]: Tavern,
    [MAP_NAME.FOREST.CASTLE]: ExtCastle,
    [MAP_NAME.FOREST.TAVERNE]: Home,
    [MAP_NAME.CASTLE.HALL]: Castle,
    [MAP_NAME.CASTLE.BEDROOM]: Bedroom,
    [MAP_NAME.CASTLE.DONJON]: Donjon,
    [MAP_NAME.CASTLE.LABO]: Labo,
};
