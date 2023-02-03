import {useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {useEffect, useState} from "react";
import forest from '../assets/sounds/forest.wav';
import tavernAmbient from '../assets/sounds/tavernAmbient.wav';
import tavernGood from '../assets/sounds/tavernGood.wav';
import tavernBad from '../assets/sounds/tavernBad.wav';
import mainCastle from '../assets/sounds/mainCastle.wav';
import donjon from '../assets/sounds/donjon.wav';
import labo from '../assets/sounds/labo.wav';
import bedroomGood from '../assets/sounds/bedroomGood.wav';
import potionDrain from '../assets/sounds/potionDrain.wav';
import potionDone from '../assets/sounds/potionDone.wav';
import potionGet from '../assets/sounds/potionGet.wav';
import princessDone from '../assets/sounds/princessDone.wav';
import princessSad from '../assets/sounds/princessSad.wav';

export enum SOUNDS {
    NONE = 'none',
    FOREST = 'forest',
    TAVERN_ANBIENT = 'tavernAmbient',
    TAVERN_GOOD = 'tavernGood',
    TAVERN_BAD = 'tavernBad',
    MAIN_CASTLE = 'mainCastle',
    DONJON = 'donjon',
    LABO = 'labo',
    BEDROOM_GOOD = 'bedroomGood',
    POTION_DRAIN = 'potionDrain',
    POTION_DONE = 'potionDone',
    POTION_GET = 'potionGet',
    PRINCESS_DONE = 'princessDone',
    PRINCESS_SAD = 'princessSad',
}

const SoundEffect = () => {
    const {
        soundToPlay,
        settings: { volume },
        soundVolumeModifier,
        shortEffect,
        shortEffectVolumeModifier,
    } = useSelector((state: RootState) => state.game);
    const [currentSound, setCurrentSound] = useState<HTMLAudioElement | null>(null);

    const sounds = {
        forest,
        tavernAmbient,
        tavernGood,
        tavernBad,
        mainCastle,
        donjon,
        labo,
        bedroomGood,
        potionDrain,
        potionDone,
        potionGet,
        princessDone,
        princessSad,
    }

    useEffect(() => {
        if (currentSound) {
            currentSound.pause();
            currentSound.currentTime = 0;
        }
        if (soundToPlay && soundToPlay !== SOUNDS.NONE) {
            const sound = new Audio(sounds[soundToPlay]);
            sound.volume = volume * (soundVolumeModifier || 1);
            sound.play();
            sound.loop = true;
            setCurrentSound(sound);
        }
    }, [soundToPlay]);

    useEffect(() => {
        if (shortEffect && shortEffect !== SOUNDS.NONE) {
            const sound = new Audio(sounds[shortEffect]);
            sound.volume = volume * (shortEffectVolumeModifier || 1);
            sound.play();
        }
    }, [shortEffect]);

    useEffect(() => {
        if (currentSound) {
            currentSound.volume = volume * (soundVolumeModifier || 1);
        }
    }, [volume]);

    useEffect(() => {
        if (currentSound) {
            currentSound.volume = volume * (soundVolumeModifier || 1);
        }
    }, [soundVolumeModifier]);

    return null;
};

export default SoundEffect;
