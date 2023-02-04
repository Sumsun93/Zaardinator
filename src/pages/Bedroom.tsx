import {Button, Col, Row} from "antd";
import styled, {keyframes} from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import Layout from "./Layout";
import backgroundImage from '../assets/bedroom/ZZ_QUIZ_CHAMBRE.webp'
import princess1 from '../assets/bedroom/ZZ_QUIZ_Phantome_B.svg'
import princess2 from '../assets/bedroom/ZZ_QUIZ_Phantome_Transformation.svg'
import chandelier from '../assets/bedroom/ZZ_QUIZ_LUSTRE.svg'
import {useNavigate} from "react-router-dom";
import {RootState} from "../redux/store";
import QUEST_STATES from "../constants/questStates";
import {setQuestState, setShortEffect, setSoundToPlay, validQuestDrop} from "../redux/features/game/gameSlice";
import ITEMS from "../constants/items";
import DropContainer from "../components/DropContainer";
import {useEffect} from "react";
import {SOUNDS} from "../components/SoundEffect";

// const socket = socketIoClient('https://zaardinator.onrender.com');
const Bedroom = () => {
    const {questState} = useSelector((state: RootState) => state.game);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const goCastle = () => {
        navigate('/castle');
    }

    useEffect(() => {
        if (questState === QUEST_STATES.DONE) {
            dispatch(setSoundToPlay({
                sound: SOUNDS.BEDROOM_GOOD,
                volumeModifier: 0.02,
            }))
        } else {
            dispatch(setSoundToPlay({
                sound: SOUNDS.PRINCESS_SAD,
                volumeModifier: 0.05,
            }))
        }
    }, [questState]);

    useEffect(() => {
        // if quest done store in local storage
        if (questState === QUEST_STATES.DONE) {
            localStorage.setItem('questPrincess', QUEST_STATES.DONE);
        }
    }, [questState]);

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
            sound: SOUNDS.PRINCESS_DONE,
            volumeModifier: 0.2,
        }))
    };

    return (
        <Layout
            bgImage={backgroundImage}
            items={[
                {
                    label: 'Retour',
                    onClick: goCastle,
                }
            ]}
            locationName={'Chambre de la princesse'}
        >
            <Chandelier
                src={chandelier}
                alt={'Chandelier'}
            />
            <DropContainer
                onDrop={onDrop({
                    neededState: QUEST_STATES.STATE_7,
                    neededItem: ITEMS.POTION_2,
                    nextQuestState: QUEST_STATES.DONE,
                    nextItemInventory: ITEMS.NONE,
                })}
                style={{
                    position: 'absolute',
                    bottom: '-3vh',
                    left: '4vw',
                    zIndex: 5,
                }}
            >
                <Princess
                    src={questState === QUEST_STATES.DONE ? princess2 : princess1}
                    alt={'Princesse'}
                />
            </DropContainer>
            <Row gutter={[24, 24]} justify={'space-between'} align={'bottom'} style={{
                marginTop: 30,
                width: '100%',
                height: '100%',
            }}>
                {questState === QUEST_STATES.NOT_STARTED && (
                    <Col span={24}>
                        <Button
                            type={'primary'}
                            size={'large'}
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                            onClick={() => {
                                dispatch(setQuestState(QUEST_STATES.STATE_1));
                            }}
                        >
                            Commencer la quête
                        </Button>
                    </Col>
                )}
            </Row>
        </Layout>
    )
}

export default Bedroom

const Princess = styled.img`
    height: 60vh;
`;

const balancing = keyframes`
  0% {
    transform: rotate(3deg) translateX(-3%);
  }
  50% {
    transform: rotate(-3deg) translateX(3%);
  }
  100% {
    transform: rotate(3deg) translateX(-3%);
  }
`;

const Chandelier = styled.img`
    position: absolute;
    top: 0;
    left: calc(50% - 10vw);
    height: 30vh;
    animation-name: ${balancing};
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
`;
