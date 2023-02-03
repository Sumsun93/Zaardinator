import {Button} from "antd";
import {useDispatch} from "react-redux";
import {addBgPositionValue, setSoundToPlay} from "../redux/features/game/gameSlice";
import {useEffect, useRef} from "react";
import Layout from "./Layout";
import backgroundImage from '../assets/castle/ZZ_QUIZ_CHATEAU_ENTREE_LARGE.jpg'
import {useNavigate} from "react-router-dom";
import {SOUNDS} from "../components/SoundEffect";

const Castle = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const intervalBg = useRef<number|null>(null);

    useEffect(() => {
        dispatch(setSoundToPlay({
            sound: SOUNDS.MAIN_CASTLE,
            volumeModifier: 0.1,
        }))
        return () => {
            if (intervalBg.current) {
                clearInterval(intervalBg.current);
            }
        }
    }, []);

    const goBedroom = () => {
        navigate('/castle-bedroom');
    }

    const goDonjon = () => {
        navigate('/castle-donjon');
    }

    const goExtCastle = () => {
        navigate('/ext-castle');
    }

    const onMouseEnter = (value: number) => () => {
        intervalBg.current = setInterval(() => {
            dispatch(addBgPositionValue(value));
        }, 10);
    }

    const onMouseLeave = () => {
        if (intervalBg.current) {
            clearInterval(intervalBg.current);
        }
    }

    return (
        <Layout
            bgImage={backgroundImage}
            items={[
                {
                    label: 'Retour',
                    onClick: goExtCastle,
                },
                {
                    label: 'Monter',
                    onClick: goBedroom,
                    onMouseEnter: onMouseEnter(-1),
                    onMouseLeave,
                },
                {
                    label: 'Passer la porte',
                    onClick: goDonjon,
                    onMouseEnter: onMouseEnter(1),
                    onMouseLeave,
                }
            ]}
            locationName={'Couloir du château'}
        >
            <Button
                size="large"
                style={{
                    position: 'absolute',
                    bottom: '50%',
                    left: '100px',
                    marginTop: 30,
                    fontSize: '2.5em',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '30px',
                    backgroundColor: 'transparent',
                }}
                onMouseEnter={onMouseEnter(-1)}
                onMouseLeave={onMouseLeave}
            >
                {"<"}
            </Button>
            <Button
                size="large"
                style={{
                    position: 'absolute',
                    bottom: '50%',
                    right: '100px',
                    marginTop: 30,
                    fontSize: '2.5em',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '30px',
                    backgroundColor: 'transparent',
                }}
                onMouseEnter={onMouseEnter(1)}
                onMouseLeave={onMouseLeave}
            >
                {">"}
            </Button>
        </Layout>
    )
}

export default Castle
