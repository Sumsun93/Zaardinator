import {useDispatch} from "react-redux";
import Layout from "./Layout";
import backgroundImage from '../assets/tavern/ZZ_QUIZ_TAVERNE_NUIT.webp';
import QCM from "../components/QCM";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {setSoundToPlay} from "../redux/features/game/gameSlice";
import {SOUNDS} from "../components/SoundEffect";

// const socket = socketIoClient('https://zaardinator.onrender.com');
const Tavern = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setSoundToPlay({
            sound: SOUNDS.TAVERN_ANBIENT,
            // decrease volume
            volumeModifier: 0.05,
        }));
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
        >
            <QCM />
        </Layout>
    )
}

export default Tavern
