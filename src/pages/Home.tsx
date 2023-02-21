import {Button, Col, Row, Typography} from "antd";
import styled from "styled-components";
// import barman from "../assets/ZZ_QUIZ_Barman.svg";
import {useDispatch, useSelector} from "react-redux";
import {setInit, setShortEffect, setSoundToPlay} from "../redux/features/game/gameSlice";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import Layout from "./Layout";
import backgroundImage from '../assets/extTavern/ZZ_QUIZ_TAVERNE_EXTERIEUR.webp'
// import aly from '../assets/extTavern/ZZ_QUIZ_ALLY.svg';
import tombe from '../assets/extTavern/ZZ_QUIZ_Tombe.svg';
import {RootState} from "../redux/store";
import {SOUNDS} from "../components/SoundEffect";
import useGameBoard from "../hooks/useGameBoard";
import {MAP, MAP_NAME} from "../constants/map";
import {getSavedGame} from "../utils/save";

const Home = () => {
    const {gameboard, startGame} = useGameBoard();
    const {isInit} = useSelector((state: RootState) => state.game);
    const dispatch = useDispatch();
    const {moveToMap} = useGameBoard();

    useEffect(() => {
        if (isInit) {
            dispatch(setSoundToPlay({sound: SOUNDS.FOREST}));
        }
    }, []);

    const goTavern = () => {
        moveToMap(MAP_NAME.TAVERNE.BAR);
    }

    const goExtCastle = () => {
        moveToMap(MAP_NAME.FOREST.CASTLE);
    }

    const handleStart = () => {
        // navigator.mediaDevices.getUserMedia({audio: true, video: false}) firefox
        /*const permissions = navigator.mediaDevices.getUserMedia({audio: true, video: false})
        permissions.then((stream) => {

        })
        .catch((err) => {
            console.log(`${err.name} : ${err.message}`)
        });*/
        startGame();
        dispatch(setInit(true))
        dispatch(setSoundToPlay({sound: SOUNDS.FOREST}));
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
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        zIndex: 1000,
                    }}
                >
                    <Button
                        onClick={handleStart}
                        size={'large'}
                        style={{
                            width: 200,
                            height: 50,
                            fontSize: 20,
                        }}
                    >
                        Jouer
                    </Button>
                    <Typography.Paragraph
                        style={{
                            marginTop: 20,
                            textAlign: 'center',
                        }}
                    >
                        En cliquant sur "Jouer", vous acceptez l'utilisation du microphone pour la reconnaissance vocale.
                        <br />
                        Votre microphone ne sera pas utilisé pour autre chose que la reconnaissance vocale (seulement quand elle sera nécessaire) et ne sera pas enregistré.
                        <br/>
                        En cas de refus, vous ne pourrez pas jouer.
                    </Typography.Paragraph>
                </div>
            )}
            <Tombe
                src={tombe}
                alt="tombe"
                onClick={() => {
                    dispatch(setShortEffect({
                        sound: SOUNDS.BYE_COLBY
                    }))
                }}
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

const Tombe = styled.img`
    position: absolute;
    bottom: 5vh;
    left: 15vw;
    height: 20vh;
    z-index: 5;
`;



