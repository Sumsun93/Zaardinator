import Tavern from "../pages/Tavern";
import ExtCastle from "../pages/ExtCastle";
import Home from "../pages/Home";
import Castle from "../pages/Castle";
import Bedroom from "../pages/Bedroom";
import Donjon from "../pages/Donjon";
import Labo from "../pages/Labo";

export const MAP = {
    TAVERNE: {
        BAR: {
            name: 'taverne-bar',
            View: Tavern,
        },
    },
    FOREST: {
        CASTLE: {
            name: 'forest-castle',
            View: ExtCastle,
        },
        TAVERNE: {
            name: 'forest-taverne',
            View: Home,
        },
    },
    CASTLE: {
        HALL: {
            name: 'castle-hall',
            View: Castle,
        },
        BEDROOM: {
            name: 'castle-bedroom',
            View: Bedroom,
        },
        DONJON: {
            name: 'castle-donjon',
            View: Donjon,
        },
        LABO: {
            name: 'castle-labo',
            View: Labo,
        },
    }
}
