import {Button, Col, Row, Typography} from "antd";
import {useCallback, useEffect, useMemo, useState} from "react";
import {DATA} from '../constants/data';
import Question from "./Question";
import styled, {css, keyframes} from "styled-components";
import comptoir from '../assets/tavern/ZZ_QUIZ_comptoir.svg';
import sumsunCage from '../assets/ZZ_QUIZ_Sumsunn.svg';
import pancarte from "../assets/tavern/ZZ_QUIZ_Pancarte.svg";
import {EFFECT_TYPES} from "../constants/questionTypes";
import MessagesContainer from "./MessagesContainer";
import questItem from '../assets/ZZ_Overlay_Potion_QUETE.svg';
import chop from '../assets/tavern/ZZ_QUIZ_Chope.svg';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import QUEST_STATES from "../constants/questStates";
import {setItemInventory, setQuestState, setShortEffect} from "../redux/features/game/gameSlice";
import ITEMS from "../constants/items";
import {SOUNDS} from "./SoundEffect";
import NPC from "./NPCs/NPC";
import {SlideFromRight} from "./transitions/transitions";
import {CHARACTER_ID} from "../constants/character";
import {EVENT} from "../constants/events";
import useEvent from "../hooks/useEvent";

const getRandomQuestionsData = () => {
    const randomQuestions: any[] = [];
    while (randomQuestions.length < 15) {
        const randomIndex = Math.floor(Math.random() * DATA.length);
        const randomQuestion = DATA[randomIndex];
        if (!randomQuestions.includes(randomQuestion)) {
            randomQuestions.push(randomQuestion);
        }
    }
    return randomQuestions;
}

const QCM = ({
    isStarted,
    isFinished,
    setIsStarted,
    setIsFinished,
}: {
    isStarted: boolean;
    isFinished: boolean;
    setIsStarted: (value: boolean) => void;
    setIsFinished: (value: boolean) => void;
}) => {
    const {questState} = useSelector((state: RootState) => state.game);
    const dispatch = useDispatch();
    const [randomQuestions, setRandomQuestions] = useState(getRandomQuestionsData());
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [values, setValues] = useState<any>([]);
    const [score, setScore] = useState(0);
    const [drunkTalk, setDrunkTalk] = useState(false);
    const [startTalk, setStartTalk] = useState(true);

    useEffect(() => {
        setValues(randomQuestions.map((data) => data.default))
    }, [randomQuestions]);

    const handleNext = () => {
        if (currentQuestion < randomQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setIsFinished(true);

            if (score > 5) {
                dispatch(setShortEffect({
                    sound: SOUNDS.TAVERN_GOOD,
                    volumeModifier: 0.05,
                }))
            } else {
                dispatch(setShortEffect({
                    sound: SOUNDS.TAVERN_BAD,
                    volumeModifier: 0.05,
                }))
            }
        }
    }

    const handleSetValues = (value: any) => {
        const newValues = [...values];
        newValues[currentQuestion] = value;
        setValues(newValues);
        setScore(getScore(newValues));
    }

    const getScore = (newValues: any) => {
        const score = newValues.map((value: any, index: number) => {
            const question = randomQuestions[index];
            // @ts-ignore
            return question.validate(value);
        });

        return score.reduce((acc: any, value: any) => acc + value, 0) / randomQuestions.length
    }

    const isSumsunVisible = useMemo(() => {
        const allIndex = randomQuestions.reduce((acc, data, index) => {
                if (data.effect === EFFECT_TYPES.SHOW_SUMSUN) {
                    acc.push(index);
                }
                return acc;
            }
            , [] as number[]);

        return allIndex.some((index: any) => values[index]);
    }, [values]);

    const handleOnChoumChoumStartQcmEvent = useCallback((e: Event) => {
        if (!isStarted) {
            setIsStarted(true);
        }
    }, [isStarted]);

    useEvent(EVENT.CHOUMCHOUM.START_QCM, handleOnChoumChoumStartQcmEvent);

    return (
        <Row
            gutter={[24, 24]} justify={'space-between'} align={'middle'} style={{
            marginTop: 30,
        }}
        >
            <MessagesContainer />

            {questState === QUEST_STATES.STATE_2 && (
                <QuestItem
                    src={questItem}
                    alt="Item de quête"
                />
            )}

            <ChopContainer
                onClick={() => {
                    if (questState === QUEST_STATES.STATE_2) {
                        dispatch(setQuestState(QUEST_STATES.STATE_3));
                        dispatch(setItemInventory(ITEMS.POTION_1));
                        dispatch(setShortEffect({
                            sound: SOUNDS.POTION_GET,
                            volumeModifier: 0.2,
                        }));
                    }
                }}
                needMove={questState === QUEST_STATES.STATE_2}
            >
                <Chop
                    src={chop}
                    alt="Chope de bière"
                />
            </ChopContainer>

            <Comptoir
                src={comptoir}
                alt="comptoir"
            />

            <Pancarte
                src={pancarte}
                alt="pancarte"
                onClick={() => {
                    dispatch(setShortEffect({
                        sound: SOUNDS.MIAM,
                    }))
                }}
            />

            <BarmanContainer>
                <SlideFromRight>
                    <NPC characterId={CHARACTER_ID.CHOUMCHOUM} />
                </SlideFromRight>
            </BarmanContainer>

            <AlcooliqueContainer>
                <NPC characterId={CHARACTER_ID.BENJAM} />
            </AlcooliqueContainer>

            {isSumsunVisible && (
                <SumsunContainer>
                    <SumsunCage
                        src={sumsunCage}
                        alt="sumsunCage"
                    />
                </SumsunContainer>
            )}

            {!isFinished && isStarted && (
                <Col span={24} style={{display: 'flex', justifyContent: 'center', zIndex: 15}}>
                    <Content>
                        {/* @ts-ignore */}
                        <Question
                            data={randomQuestions[currentQuestion]} value={values[currentQuestion]}
                            setValue={handleSetValues}
                        />
                        <Button
                            size="large"
                            type="text"
                            style={{
                                outline: 'none',
                                border: 'none',
                                marginTop: 30,
                                fontSize: '2.5em',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textTransform: 'uppercase',
                                padding: '30px',
                            }}
                            onClick={handleNext}
                        >
                            Suivant
                        </Button>
                    </Content>
                </Col>
            )}
            {isFinished && (
                <Col span={24} style={{display: 'flex', justifyContent: 'center', zIndex: 15}}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                        }}
                    >
                        <Typography.Title
                            level={1} style={{
                            textAlign: 'center',
                            fontWeight: '900',
                        }}
                        >
                            Merci pour tes réponses !
                        </Typography.Title>
                        {score >= 5 ? (
                            <>
                                <Typography.Title
                                    level={1} style={{
                                    textAlign: 'center',
                                    fontWeight: '900',
                                    width: '100%',
                                }}
                                >
                                  <span
                                      style={{
                                          color: '#FFD700',
                                          fontSize: '2em',
                                      }}
                                  >
                                      Tu es en forme aujourd'hui !
                                    </span>
                                    <br />
                                    Je recommanderais a mes clients de te faire confiance.
                                </Typography.Title>
                            </>
                        ) : (
                            <>
                                <Typography.Title
                                    level={1} style={{
                                    textAlign: 'center',
                                    fontWeight: '900',
                                    width: '100%',
                                }}
                                >
                                      <span
                                          style={{
                                              color: '#FFD700',
                                              fontSize: '2em',
                                          }}
                                      >
                                        Tu n'es pas en forme aujourd'hui !
                                    </span>
                                    <br />
                                    Moi en tout cas, je ne te ferais pas confiance.
                                </Typography.Title>
                            </>
                        )}
                        <Typography.Title
                            level={1} style={{
                            textAlign: 'center',
                            fontWeight: '900',
                            width: '100%',
                        }}
                        >
                            Une petite bière pour la route ?
                        </Typography.Title>
                    </div>
                </Col>
            )}
        </Row>
    );
};

export default QCM;

const slideFromTop = keyframes`
  0% {
    transform: translateY(-150%);
  }
  100% {
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 0 20px;
  opacity: 0;
  animation: ${fadeIn} 1s ease-in-out;
  animation-fill-mode: forwards;
`;

const slideFromRight = keyframes`
  0% {
    transform: translateX(150%) skewX(20deg);
  }
  100% {
    transform: translateX(0);
  }
`;

const slideFromLeft = keyframes`
  0% {
    transform: translateX(-150%) skewX(-20deg);
  }
  100% {
    transform: translateX(0);
  }
`;

const QuestItem = styled.img`
  position: absolute;
  bottom: 35vh;
  right: 47vh;
  height: 14vh;
  z-index: 10;
  opacity: 0;
  animation: ${fadeIn} 1s ease-in-out 2s;
  animation-fill-mode: forwards;
  cursor: pointer;
`;

const Chop = styled.img`
  height: 11vh;
  transition: .5s;
  transition-delay: .3s;
`;

const ChopContainer = styled.div`
  position: absolute;
  bottom: 37.1vh;
  right: 47vh;
  z-index: 11;
  opacity: 0;
  animation: ${fadeIn} 1s ease-in-out 1.5s;
  animation-fill-mode: forwards;

  ${({needMove}: { needMove: boolean }) => needMove && css`
    &:hover {
      ${Chop} {
        transform: translateX(70%);
      }
    }
  `}
`;

const Comptoir = styled.img`
  position: absolute;
  bottom: 0;
  right: -70vh;
  height: 52vh;
  z-index: 11;
  animation: ${slideFromRight} 1s ease-in-out;
  pointer-events: none;
`;

const Pancarte = styled.img`
  position: absolute;
  bottom: 5vh;
  right: 7vh;
  height: 20vh;
  z-index: 11;
  transform: translateX(200%);
  animation: ${slideFromRight} 1s ease-in-out 0.5s;
  animation-fill-mode: forwards;
  cursor: pointer;
`;

const BarmanContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 77vh;
  z-index: 10;
`;

const BubbleContainer = styled.div`
  position: relative;
  z-index: 100;

  ${({doFade}: { doFade?: boolean }) => doFade && css`
    opacity: 0;
    animation: ${fadeIn} 1s ease-in-out 2.5s;
    animation-fill-mode: forwards;
  `}
`;

const Barman = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 75vh;
  z-index: 10;
  transform: translateX(100%);
  animation: ${slideFromRight} 1s ease-in-out 1.5s;
  animation-fill-mode: forwards;
  transition: .2s;
`;

const AlcooliqueContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 50vh;
  z-index: 0;
`;

const Alcoolique = styled.img`
  position: absolute;
  bottom: 0;
  left: -10vw;
  height: 50vh;
  z-index: 0;
  transform: translateX(-100%);
  animation: ${slideFromLeft} 1s ease-in-out 1s;
  animation-fill-mode: forwards;
`;

const cageBalancing = keyframes`
  0% {
    transform: rotate(5deg) translateX(-10%);
  }
  50% {
    transform: rotate(-5deg) translateX(10%);
  }
  100% {
    transform: rotate(5deg) translateX(-10%);
  }
`;

const SumsunContainer = styled.div`
  position: absolute;
  top: 0;
  right: 5vw;
  z-index: 0;
  transform: translateY(-100%);
  animation: ${slideFromTop} 1s ease-in-out;
  animation-fill-mode: forwards;
`;

const SumsunCage = styled.img`
  height: 40vh;
  animation-name: ${cageBalancing};
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
`;





