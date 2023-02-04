import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {useEffect, useState} from "react";
import {setShortEffect} from "../redux/features/game/gameSlice";
import forest from '../assets/sounds/forest.mp3';
import tavernAmbient from '../assets/sounds/tavernAmbient.mp3';
import tavernGood from '../assets/sounds/tavernGood.mp3';
import tavernBad from '../assets/sounds/tavernBad.mp3';
import mainCastle from '../assets/sounds/mainCastle.mp3';
import donjon from '../assets/sounds/donjon.mp3';
import labo from '../assets/sounds/labo.mp3';
import bedroomGood from '../assets/sounds/bedroomGood.mp3';
import potionDrain from '../assets/sounds/potionDrain.mp3';
import potionDone from '../assets/sounds/potionDone.mp3';
import potionGet from '../assets/sounds/potionGet.mp3';
import princessDone from '../assets/sounds/princessDone.mp3';
import princessSad from '../assets/sounds/princessSad.mp3';
import bye_colby from '../assets/sounds/bye_colby.mp3';
import miam from '../assets/sounds/miam.mp3';
import burpLong1 from '../assets/sounds/effect/burp/long/burp-long-1.mp3';
import burpSmall1 from '../assets/sounds/effect/burp/small/burp-small-1.mp3';
import burpSmall2 from '../assets/sounds/effect/burp/small/burp-small-2.mp3';
import femaleCough1 from '../assets/sounds/effect/cough/female/female-cough-1.mp3';
import maleCough1 from '../assets/sounds/effect/cough/male/male-cough-1.mp3';
import fartLong1 from '../assets/sounds/effect/fart/long/fart-long-1.mp3';
import fartLong2 from '../assets/sounds/effect/fart/long/fart-long-2.mp3';
import fartSmall1 from '../assets/sounds/effect/fart/small/fart-small-1.mp3';
import fartSmall2 from '../assets/sounds/effect/fart/small/fart-small-2.mp3';
import fartSmall3 from '../assets/sounds/effect/fart/small/fart-small-3.mp3';
import maleGargling1 from '../assets/sounds/effect/gargling/male/male-gargling-1.mp3';
import maleSneeze1 from '../assets/sounds/effect/sneeze/male/male-sneeze-1.mp3';
import maleClearThroat1 from '../assets/sounds/effect/clear-throat/male/male-clear-throat-1.mp3';
import maleClearThroat2 from '../assets/sounds/effect/clear-throat/male/male-clear-throat-2.mp3';
import femaleVomit1 from '../assets/sounds/effect/vomit/female/female-vomit-1.mp3';
import maleVomit1 from '../assets/sounds/effect/vomit/male/male-vomit-1.mp3';
import maleVomit2 from '../assets/sounds/effect/vomit/male/male-vomit-2.mp3';
import maleYawn1 from '../assets/sounds/effect/yawn/male/male-yawn-1.mp3';
import maleYawn2 from '../assets/sounds/effect/yawn/male/male-yawn-2.mp3';


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
    BYE_COLBY = 'bye_colby',
    MIAM = 'miam',
    BURP_LONG_1 = 'burpLong1',
    BURP_SMALL_1 = 'burpSmall1',
    BURP_SMALL_2 = 'burpSmall2',
    FEMALE_COUGH_1 = 'femaleCough1',
    MALE_COUGH_1 = 'maleCough1',
    FART_LONG_1 = 'fartLong1',
    FART_LONG_2 = 'fartLong2',
    FART_SMALL_1 = 'fartSmall1',
    FART_SMALL_2 = 'fartSmall2',
    FART_SMALL_3 = 'fartSmall3',
    MALE_GARGLING_1 = 'maleGargling1',
    MALE_SNEEZE_1 = 'maleSneeze1',
    MALE_CLEAR_THROAT_1 = 'maleClearThroat1',
    MALE_CLEAR_THROAT_2 = 'maleClearThroat2',
    FEMALE_VOMIT_1 = 'femaleVomit1',
    MALE_VOMIT_1 = 'maleVomit1',
    MALE_VOMIT_2 = 'maleVomit2',
    MALE_YAWN_1 = 'maleYawn1',
    MALE_YAWN_2 = 'maleYawn2',
}

const SoundEffect = () => {
    const {
        soundToPlay,
        settings: { volume },
        soundVolumeModifier,
        shortEffect,
        shortEffectVolumeModifier,
    } = useSelector((state: RootState) => state.game);
    const dispatch = useDispatch();
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
        bye_colby,
        miam,
        burpLong1,
        burpSmall1,
        burpSmall2,
        femaleCough1,
        maleCough1,
        fartLong1,
        fartLong2,
        fartSmall1,
        fartSmall2,
        fartSmall3,
        maleGargling1,
        maleSneeze1,
        maleClearThroat1,
        maleClearThroat2,
        femaleVomit1,
        maleVomit1,
        maleVomit2,
        maleYawn1,
        maleYawn2,
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
            dispatch(setShortEffect({
                sound: SOUNDS.NONE
            }))
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
