import {useDispatch} from "react-redux";
import Layout from "./Layout";
import backgroundImage from '../assets/tavern/ZZ_QUIZ_TAVERNE_NUIT.webp';
import QCM from "../components/QCM";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {setSoundToPlay} from "../redux/features/game/gameSlice";
import {SOUNDS} from "../components/SoundEffect";
import usePlayRandomSoundEffect from "../hooks/usePlayRandomSoundEffect";

// const socket = socketIoClient('https://zaardinator.onrender.com');
const Tavern = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    useEffect(() => {
        dispatch(setSoundToPlay({
            sound: SOUNDS.TAVERN_ANBIENT,
            // decrease volume
            volumeModifier: 0.05,
        }));
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            playRandomSoundEffect();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const goExtTavern = () => {
        navigate('/');
    }

    return (
        <Layout
            bgImage={backgroundImage}
            items={[
                {
                    label: 'Sortir de la taverne',
                    onClick: goExtTavern,
                }
            ]}
            locationName={'Taverne'}
            isBgOpacity
        >
            <QCM />
        </Layout>
    )
}

export default Tavern
