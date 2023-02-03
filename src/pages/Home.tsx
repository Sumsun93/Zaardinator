import {Button, Col, Row} from "antd";
import styled from "styled-components";
// import barman from "../assets/ZZ_QUIZ_Barman.svg";
import {useDispatch, useSelector} from "react-redux";
import {setInit, setSoundToPlay} from "../redux/features/game/gameSlice";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import Layout from "./Layout";
import backgroundImage from '../assets/extTavern/ZZ_QUIZ_TAVERNE_EXTERIEUR.jpg'
import aly from '../assets/extTavern/ZZ_QUIZ_ALLY.svg';
import {RootState} from "../redux/store";
import {SOUNDS} from "../components/SoundEffect";

const Home = () => {
    const {isInit} = useSelector((state: RootState) => state.game);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isInit) {
            dispatch(setSoundToPlay({sound: SOUNDS.FOREST}));
        }
    }, []);

    const goTavern = () => {
        navigate('/tavern')
    }

    const goExtCastle = () => {
        navigate('/ext-castle')
    }

    return (
        <Layout
            bgImage={backgroundImage}
            /*items={[
                {
                    label: 'Entrer dans la taverne',
                    onClick: goTavern,
                },
                {
                    label: 'Continuer le chemin',
                    onClick: goExtCastle,
                }
            ]}*/
            locationName={'Devant la taverne'}
        >
            {!isInit && (
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        zIndex: 1000,
                    }}
                >
                    <Button
                        onClick={() => {
                            dispatch(setInit(true))
                            dispatch(setSoundToPlay({sound: SOUNDS.FOREST}));
                        }}
                        size={'large'}
                        style={{
                            width: 200,
                            height: 50,
                            fontSize: 20,
                        }}
                    >
                        Jouer
                    </Button>
                </div>
            )}
            <Aly
                src={aly}
                alt="aly"
            />
            <Row gutter={[24, 24]} justify={'space-between'} align={'bottom'} style={{
                marginTop: 30,
                width: '100%',
                height: '100%',
            }}>
                <Col span={20} onClick={goTavern} style={{ height: '100%' }} />
                <Col span={4} onClick={goExtCastle} style={{ height: '20%' }}/>
            </Row>
        </Layout>
    )
}

export default Home

const Aly = styled.img`
    position: absolute;
    bottom: 5vh;
    left: 10vw;
    height: 32vh;
    z-index: 5;
`;



