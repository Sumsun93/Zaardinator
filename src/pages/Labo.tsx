import 'regenerator-runtime';
import {Button, Row} from "antd";
import styled, {css, keyframes} from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import Layout from "./Layout";
import backgroundImage from '../assets/labo/ZZ_QUIZ_LABORATOIRE.webp';
import table1 from '../assets/labo/ZZ_QUIZ_TABLE_1.svg';
import table2 from '../assets/labo/ZZ_QUIZ_TABLE_2.svg';
import table3 from '../assets/labo/ZZ_QUIZ_TABLE_3.svg';
import table4 from '../assets/labo/ZZ_QUIZ_TABLE_4.svg';
import neos from '../assets/labo/ZZ_QUIZ_NEOS.svg';
import {useNavigate} from "react-router-dom";
import {RootState} from "../redux/store";
import QUEST_STATES from "../constants/questStates";
import {
    setItemInventory,
    setQuestState,
    setShortEffect,
    setSoundToPlay,
    validQuestDrop
} from "../redux/features/game/gameSlice";
import DropContainer from "../components/DropContainer";
import ITEMS from "../constants/items";
import {useEffect, useMemo} from "react";
import {SOUNDS} from "../components/SoundEffect";
import useSpeechRecognition from "../hooks/useSpeechRecognition";


// const socket = socketIoClient('https://zaardinator.onrender.com');
const Labo = () => {
    const {questState} = useSelector((state: RootState) => state.game);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        transcript,
        startListening,
        stopListening,
    } = useSpeechRecognition();


    const goDonjon = () => {
        navigate('/castle-donjon');
    }

    useEffect(() => {
        dispatch(setSoundToPlay({
            sound: SOUNDS.LABO,
            volumeModifier: 0.05,
        }))
    }, []);

    useEffect(() => {
        if (questState === QUEST_STATES.STATE_4) {
            setTimeout(() => {
                dispatch(setQuestState(QUEST_STATES.STATE_5));
                startListening();
            }, 3000);
        }
    }, [questState]);

    useEffect(() => {
        if (transcript.toLowerCase().includes('abracadabra')) {
            stopListening();
            dispatch(setQuestState(QUEST_STATES.STATE_6));
            dispatch(setShortEffect({
                sound: SOUNDS.POTION_DONE,
                volumeModifier: 0.2,
            }))
        }
    }, [transcript]);

    const onDrop = ({
        neededState,
        neededItem,
        nextQuestState,
        nextItemInventory,
    }: {
        neededState: QUEST_STATES,
        neededItem: ITEMS,
        nextQuestState: QUEST_STATES,
        nextItemInventory: ITEMS,
    }) => (item: {
        name: ITEMS,
    }) => {
        if (neededItem !== item.name) {
            return;
        }
        dispatch(validQuestDrop({
            neededState,
            questState: nextQuestState,
            neededItem,
            itemInventory: nextItemInventory,
        }));
        dispatch(setShortEffect({
            sound: SOUNDS.POTION_DRAIN,
            volumeModifier: 0.2,
        }));
    }

    const table = useMemo(() => {
        switch (questState) {
            case QUEST_STATES.NOT_STARTED:
            case QUEST_STATES.STATE_1:
            case QUEST_STATES.STATE_2:
            case QUEST_STATES.STATE_3:
            case QUEST_STATES.STATE_7:
            case QUEST_STATES.DONE:
                return table1;
            case QUEST_STATES.STATE_4:
                return table2;
            case QUEST_STATES.STATE_5:
                return table3;
            case QUEST_STATES.STATE_6:
                return table4;
            default:
                return table1;
        }
    }, [questState]);

    return (
        <Layout
            bgImage={backgroundImage}
            items={[
                {
                    label: 'Retour',
                    onClick: goDonjon,
                }
            ]}
            locationName={'Laboratoire du Mage'}
        >
            <DropContainer onDrop={onDrop(
                {
                    neededState: QUEST_STATES.STATE_3,
                    neededItem: ITEMS.POTION_1,
                    nextQuestState: QUEST_STATES.STATE_4,
                    nextItemInventory: ITEMS.NONE,
                }
            )}>
                <Table
                    src={table}
                    alt={'Table'}
                    onClick={() => {
                        if (questState === QUEST_STATES.STATE_6) {
                            dispatch(setQuestState(QUEST_STATES.STATE_7));
                            dispatch(setItemInventory(ITEMS.POTION_2))
                            dispatch(setShortEffect({
                                sound: SOUNDS.POTION_GET,
                                volumeModifier: 0.2,
                            }))
                        }
                    }}
                    isBlinking={questState === QUEST_STATES.STATE_6}
                />
            </DropContainer>
            <Neos
                src={neos}
                alt={'Neos'}
            />
            <Row gutter={[24, 24]} justify={'space-between'} align={'bottom'} style={{
                marginTop: 30,
                width: '100%',
                height: '100%',
            }}>
                {questState === QUEST_STATES.STATE_1 && (
                    <Button
                        type={'primary'}
                        onClick={() => {
                            dispatch(setQuestState(QUEST_STATES.STATE_2));
                        }}
                    >
                        Aller chercher la fiole
                    </Button>
                )}
                {questState === QUEST_STATES.STATE_5 && (
                    <Button
                        type={'primary'}
                        onClick={() => {
                            dispatch(setQuestState(QUEST_STATES.STATE_6));
                            dispatch(setShortEffect({
                                sound: SOUNDS.POTION_DONE,
                                volumeModifier: 0.2,
                            }))
                        }}
                    >
                        ABRACADABRA
                    </Button>
                )}
            </Row>
        </Layout>
    )
}

export default Labo

// filter drop shadow blinking
const blinking = keyframes`
    0% {
        filter: drop-shadow(0 0 0.5rem #fff);
    }
    50% {
        filter: drop-shadow(0 0 0 #fff);
    }
    100% {
        filter: drop-shadow(0 0 0.5rem #fff);
    }
`;

const Table = styled.img`
    position: absolute;
    z-index: 5;
    cursor: pointer;
    ${({isBlinking}: { isBlinking: boolean }) => isBlinking && css`
        animation: ${blinking} 1s linear infinite;
    `};
  
    @media (max-height: 2160px) {
        bottom: 8vh;
        right: 13vw;
        height: 55vh;
    }

    @media (max-height: 1440px) {
        bottom: 8vh;
        right: 13vw;
        height: 55vh;
    }

    @media (max-height: 1366px) {
        bottom: 4vh;
        right: 13vw;
        height: 60vh;
    }

    @media (max-height: 1200px) {
        bottom: 0;
        right: 13vw;
        height: 65vh;
    }
  
    @media (max-height: 1080px) {
        bottom: 8vh;
        right: 13vw;
        height: 602px;
    }
  
    
`;

const Neos = styled.img`
    position: absolute;
  
    @media (max-height: 2160px) {
        bottom: 3vh;
        left: 16vw;
        height: 40vh;
    }
  
    @media (max-height: 1440px) {
        bottom: 5vh;
        left: 20vw;
        height: 35vh;
    }
  
    @media (max-height: 1366px) {
        bottom: 2vh;
        left: 20vw;
        height: 35vh;
    }
  
    @media (max-height: 1200px) {
        bottom: -1vh;
        left: 20vw;
        height: 38vh;
    }
  
    @media (max-height: 1080px) {
        bottom: 5vh;
        left: 19vw;
        height: 35vh;
    }
`;
