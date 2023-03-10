import {useDispatch} from "react-redux";
import Layout from "./Layout";
import backgroundImage from '../assets/tavern/ZZ_QUIZ_TAVERNE_NUIT.webp';
import QCM from "../components/QCM";
import {useNavigate} from "react-router-dom";
import {useCallback, useEffect, useRef, useState} from "react";
import {setSoundToPlay} from "../redux/features/game/gameSlice";
import {SOUNDS} from "../components/SoundEffect";
import usePlayRandomSoundEffect from "../hooks/usePlayRandomSoundEffect";
import {getRandomInterval} from "../utils/random";

// const socket = socketIoClient('https://zaardinator.onrender.com');
const Tavern = () => {
    const playRandomSoundEffectTimeout = useRef<null | number>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isStarted, setIsStarted] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    const {playRandomSoundEffect} = usePlayRandomSoundEffect([
        SOUNDS.FART_LONG_1,
        SOUNDS.FART_LONG_2,
        SOUNDS.FART_SMALL_1,
        SOUNDS.FART_SMALL_2,
        SOUNDS.FART_SMALL_3,
        SOUNDS.BURP_SMALL_1,
        SOUNDS.BURP_SMALL_2,
        SOUNDS.BURP_LONG_1,
        SOUNDS.MALE_GARGLING_1,
        SOUNDS.MALE_SNEEZE_1,
        SOUNDS.MALE_CLEAR_THROAT_1,
        SOUNDS.MALE_CLEAR_THROAT_2,
        SOUNDS.FEMALE_VOMIT_1,
        SOUNDS.MALE_VOMIT_1,
        SOUNDS.MALE_VOMIT_2,
        SOUNDS.MALE_YAWN_1,
        SOUNDS.MALE_YAWN_2,
    ]);

    const setPlayRandomSoundEffectTimeout = useCallback(() => {
        playRandomSoundEffectTimeout.current = setTimeout(() => {
            playRandomSoundEffect();
            setPlayRandomSoundEffectTimeout();
        }, getRandomInterval(5000, 10000));
    }, [playRandomSoundEffect]);

    useEffect(() => {
        dispatch(setSoundToPlay({
            sound: SOUNDS.TAVERN_ANBIENT,
            // decrease volume
            volumeModifier: 0.05,
        }));
    }, []);

    useEffect(() => {
        setPlayRandomSoundEffectTimeout();

        return () => {
            if (playRandomSoundEffectTimeout.current) {
                clearInterval(playRandomSoundEffectTimeout.current);
            }
        };
    }, []);

    const goExtTavern = () => {
        navigate('/');
    }

    return (
        <Layout
            bgImage={backgroundImage}
            items={(isStarted && !isFinished) ? undefined : [
                {
                    label: 'Sortir de la taverne',
                    onClick: goExtTavern,
                }
            ]}
            locationName={'Taverne'}
            isBgOpacity={isStarted}
        >
            <QCM
                isStarted={isStarted}
                isFinished={isFinished}
                setIsStarted={setIsStarted}
                setIsFinished={setIsFinished}
            />
        </Layout>
    )
}

export default Tavern
