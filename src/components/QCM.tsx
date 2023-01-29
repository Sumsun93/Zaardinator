import {Button, Col, Row, Typography} from "antd";
import {useMemo, useState} from "react";
import {DATA} from '../constants/data';
import Question from "./Question";
import styled, {keyframes} from "styled-components";
import comptoir from '../assets/ZZ_QUIZ_comptoir.svg';
import barman from '../assets/ZZ_QUIZ_Barman.svg';
import alcoolique from '../assets/ZZ_QUIZ_alcoolique.svg';
import sumsunCage from '../assets/ZZ_QUIZ_Sumsunn.svg';
import pancarte from "../assets/ZZ_QUIZ_Pancarte.svg";
import zaardoz from "../assets/zz.png";
import {EFFECT_TYPES} from "../constants/questionTypes";
import miam from '../assets/miam.mp3';

const QCM = () => {
    const [isStarted, setIsStarted] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [values, setValues] = useState<any>(DATA.map((data) => data.default));
    const [score, setScore] = useState(0);

    const sound = new Audio(miam);

    const handleNext = () => {
        if (currentQuestion < DATA.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setIsFinished(true);
        }
    }

    const handleSetValues = (value: any) => {
        const newValues = [...values];
        newValues[currentQuestion] = value;
        setValues(newValues);
        setScore(getScore(newValues));
    }

    const getScore = (newValues: any) => {
        const score = newValues.map((value: any, index : number) => {
            const question = DATA[index];
            // @ts-ignore
            return question.validate(value);
        });

        const totalScore = score.reduce((acc: any, value: any) => acc + value, 0) / DATA.length

        // get score/10 by number of questions
        return totalScore;
    }

    const isSumsunVisible = useMemo(() => {
        const allIndex = DATA.reduce((acc, data, index) => {
            if (data.effect === EFFECT_TYPES.SHOW_SUMSUN) {
                acc.push(index);
            }
            return acc;
        }
        , [] as number[]);

        return allIndex.some((index) => values[index]);
    }, [values]);

    return (
        <Row gutter={[24, 24]} justify={'space-between'} align={'middle'} style={{
            marginTop: 30,
        }}>
            <Button
                type="link"
                href="https://twitch.tv/zaardoz"
                target="_blank"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 10,
                }}
            >
                <Zaardoz src={zaardoz} alt="zaardoz" />
            </Button>
            {!isStarted && (
                <BarmanFirst
                    src={barman}
                    alt="barman"
                />
            )}
            {isStarted && (
                <>
                    <Comptoir
                        src={comptoir}
                        alt="comptoir"
                    />
                    <Pancarte
                        src={pancarte}
                        alt="pancarte"
                        onClick={() => {
                            sound.play();
                        }}
                    />
                    <Barman
                        src={barman}
                        alt="barman"
                    />
                    <Alcoolique
                        src={alcoolique}
                        alt="alcoolique"
                    />
                    {isSumsunVisible && (
                        <SumsunContainer>
                            <SumsunCage
                                src={sumsunCage}
                                alt="sumsunCage"
                            />
                        </SumsunContainer>
                    )}
                </>
            )}
            {!isFinished && (
                <Col span={24} style={{ display: 'flex', justifyContent: 'center', zIndex: 10 }}>
                    {!isStarted ? (
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                            }}
                        >
                            <Typography.Title level={1} style={{
                                textAlign: 'center',
                                fontWeight: '900',
                            }}>
                                Bienvenue à la taverne <span style={{ color: '#FFD700' }}>Des Trois Chaînes</span> !
                            </Typography.Title>
                            <Typography.Title level={3} style={{
                                textAlign: 'center',
                                fontWeight: '900',
                                width: '100%',
                            }}>
                                Je me présente,
                                <br />
                                <span style={{ color: '#FFD700' }}>Choumchoum</span>, le barman de la taverne.
                            </Typography.Title>
                            <Typography.Title level={3} style={{
                                textAlign: 'center',
                                fontWeight: '900',
                                width: '100%',
                            }}>
                                J'ai ouï dire que tu étais un joueur hors pair d'un certain jeu de géolocalisation !
                                <br />
                                Ce sont mes amis <span style={{ color: '#FFD700' }}>Neos</span> et <span style={{ color: '#FFD700' }}>Nko</span> qui m'ont aidé à bâtir cette taverne.
                                <br />
                                Et ils m'ont vivement conseillé de miser sur toi !
                            </Typography.Title>
                            <Typography.Title level={3} style={{
                                textAlign: 'center',
                                fontWeight: '900',
                                width: '100%',
                            }}>
                                Mais avant ça, papotons un peu ! Histoire de savoir si tu vaut le coup !
                            </Typography.Title>
                            <Button
                                size="large"
                                style={{
                                    marginTop: 30,
                                    fontSize: '2.5em',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: '30px',
                                    backgroundColor: 'transparent',
                                }}
                                onClick={() => setIsStarted(true)}
                            >
                                Démarrer
                            </Button>
                        </div>
                    ) : (
                        <Content>
                            {/* @ts-ignore */}
                            <Question data={DATA[currentQuestion]} value={values[currentQuestion]} setValue={handleSetValues} />
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
                    )}
                </Col>
            )}
            {isFinished && (
                <Col span={24} style={{ display: 'flex', justifyContent: 'center', zIndex: 10 }}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                        }}
                    >
                        <Typography.Title level={1} style={{
                            textAlign: 'center',
                            fontWeight: '900',
                        }}>
                            Merci pour tes réponses !
                        </Typography.Title>
                        {score >= 5 ? (
                            <>
                                <Typography.Title level={1} style={{
                                    textAlign: 'center',
                                    fontWeight: '900',
                                    width: '100%',
                                }}>
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
                                <Typography.Title level={1} style={{
                                    textAlign: 'center',
                                    fontWeight: '900',
                                    width: '100%',
                                }}>
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
                        <Typography.Title level={1} style={{
                            textAlign: 'center',
                            fontWeight: '900',
                            width: '100%',
                        }}>
                            Une petite bière pour la route ?
                        </Typography.Title>

                        <Typography.Title level={5} style={{
                            textAlign: 'center',
                            fontWeight: '900',
                            width: '100%',
                            position: 'fixed',
                            bottom: 0,
                        }}>
                            Développé par <span style={{ color: '#FFD700' }}>Sumsun</span>, design par <span style={{ color: '#FFD700' }}>NeosRanger</span>
                            <br />
                            merci à <span style={{ color: '#FFD700' }}>Nko</span> pour les idées
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
    animation: ${fadeIn} 1s ease-in-out 2s;
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

const Zaardoz = styled.img`
    position: absolute;
    top: 40px;
    left: 40px;
    height: 10vh;
    z-index: 5;
  
    &:hover {
      filter: drop-shadow(0 0 0.75rem #FFD700);
    }
`;

const Comptoir = styled.img`
    position: absolute;
    bottom: 0;
    right: 0;
    height: 43vh;
    z-index: 10;
    animation: ${slideFromRight} 1s ease-in-out;
`;

const Pancarte = styled.img`
    position: absolute;
    bottom: 5vh;
    right: 7vh;
    height: 20vh;
    z-index: 10;
    transform: translateX(200%);
    animation: ${slideFromRight} 1s ease-in-out 0.5s;
    animation-fill-mode: forwards;
`;

const Barman = styled.img`
    position: absolute;
    bottom: 0;
    right: 0;
    height: 75vh;
    z-index: 9;
    transform: translateX(100%);
    animation: ${slideFromRight} 1s ease-in-out 1.5s;
    animation-fill-mode: forwards;
`;

// animation slide from left and grayscale
const slideFromLeftWithGrey = keyframes`
    0% {
        transform: translateX(-150%) scaleX(-1);
    }
    100% {
        transform: translateX(0) scaleX(-1);
    }
`;

const BarmanFirst = styled.img`
    position: absolute;
    bottom: 0;
    left: 0;
    height: 75vh;
    z-index: 9;
    transform: scaleX(-1);
    animation: ${slideFromLeftWithGrey} 1s ease-in-out;
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





