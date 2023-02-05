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
import {useEffect, useMemo, useState} from "react";
import {SOUNDS} from "../components/SoundEffect";
import useSpeechRecognition from "../hooks/useSpeechRecognition";
import Neos from "../components/Characters/Neos/Neos";
import ComicsBubble from "../components/ComicsBubble";
import useGameBoard from "../hooks/useGameBoard";
import {MAP} from "../constants/map";

// const socket = socketIoClient('https://zaardinator.onrender.com');
const Labo = () => {
    const {questState, itemInventory} = useSelector((state: RootState) => state.game);
    const dispatch = useDispatch();
    const {moveToMap} = useGameBoard();
    const {
        transcript,
        startListening,
        stopListening,
    } = useSpeechRecognition();

    const [isBlackScreen, setIsBackScreen] = useState(true);

    const goDonjon = () => {
        moveToMap(MAP.CASTLE.DONJON);
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
            {questState === QUEST_STATES.STATE_1 && isBlackScreen && (
                <>
                    <BlackScreen />
                    <ComicsBubble
                        style={{
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-100%, -100%)',
                            width: '50%',
                            zIndex: 100,
                        }}
                        isNarrator
                        content={[
                            'Tu pénètres alors l’antre du Grand Mage, la gorge serrée et le ventre noué. Tu as longuement réfléchi à comment tu allais te présenter. Il va de soi qu’il faudra également complimenter et approuver tout ce que ce terrible Mage allait dire et faire.'
                        ]}
                        onEnd={() => {
                            setIsBackScreen(false);
                        }}
                    />
                </>
            )}
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

            {questState === QUEST_STATES.STATE_1 && !isBlackScreen && (
                <ComicsBubble
                    style={{
                        position: 'absolute',
                        left: '70vh',
                        bottom: '30vh',
                        zIndex: 15,
                        width: 400,
                    }}
                    content={[
                        'Hey’ salut ! Wouha mais qu’est ce que tu fais ici d’abord ? Oh et puis c’est le crâne de tante Marge que t’as dans les mains t’es un voleur c’est ça ?! J’vais appeler mon popa, tu vas passer un sal quart d’heure mec !',
                        '"La peur s’empare de toi et tout le courage que tu avais jusqu’à lors à disparu. Confus et paniqué tu te mets à déblaterer toute l’histoire au gamin, priant pour qu’il te croit"',
                        'Ah ah ah comment j’t’ai bien eu, oh là là tu verrais ta tronche mec !',
                        'J’reconnais c’est Nko qui t’a joué un mauvais tour, j’avais tout de suite compris rassures toi, tu peux poser le crâne avec mes jouets, j’avais cassé le dernier ça tombe bien ! Merci',
                        'Je m’appelle Neos et mon popa l’est parti acheter des clopes qu’il m’a dit. Mais t’en fais pas j’vais t’aider moi ! J’sais faire hein, pour de vrai quoi. T’façon ça tombe bien avant de partir popa a fait une base d’élixir, mais il nous manque un truc.',
                        'Tu vas devoir parcourir les contrées les plus lointaines, traverser les mères et affronter l’armée des Cépanous, pour enfin demander audience auprès du gou…Attends tu m’écoutes là ?',
                        'Bon ça va j’aurai essayé hein… En fait je sais pas du tout où ça se trouve mais tu vas devoir trouver du “sang de dragon albinos”. T’as plus qu’a chercher par toi même ! Moi j’suis trop petit pour partir avec des inconnus. Reviens me voir quand tu l’auras !',
                    ]}
                    onEnd={() => {
                        dispatch(setQuestState(QUEST_STATES.STATE_2));
                    }}
                />
            )}
            {questState === QUEST_STATES.STATE_3 && (
                <ComicsBubble
                    style={{
                        position: 'absolute',
                        left: '70vh',
                        bottom: '30vh',
                        zIndex: 15,
                        width: 400,
                    }}
                    content={[
                        'Salut mec ! Alors t’as trouvé ? Wouha trop cool ! Par contre ça pue de ouf cet élixir, oh quoi que non en fait. T’as laché une caisse ou quoi ?!',
                        'Vas-y verse tout dans l\'alambic et ça devrait fonctionner. Ou alors tu vas peut etre exploser, wouha ce sera drôle et dis ? Comment ça “non c’est pas drôle” ?',
                    ]}
                />
            )}
            {questState === QUEST_STATES.STATE_4 && (
                <ComicsBubble
                    style={{
                        position: 'absolute',
                        left: '70vh',
                        bottom: '30vh',
                        zIndex: 15,
                        width: 400,
                    }}
                    content={[
                        'Il reste une dernière chose à dire à voix haute, c’est une formule magique connue, mais popa y m’a pas dit c’est laquelle.',
                    ]}
                />
            )}

            {questState === QUEST_STATES.STATE_6 && (
                <ComicsBubble
                    style={{
                        position: 'absolute',
                        left: '70vh',
                        bottom: '30vh',
                        zIndex: 15,
                        width: 400,
                    }}
                    content={[
                        'Bravo ! Quand mon popa il va savoir que j’ai tout fais tout seul il va pas en rev.. ouais ouais bon ça va tu peux y aller, mec.',
                    ]}
                />
            )}
            <NeosContainer>
                <Neos />
            </NeosContainer>

            {/*<Button
                onClick={() => {
                    dispatch(setQuestState(QUEST_STATES.STATE_6));
                    dispatch(setShortEffect({
                        sound: SOUNDS.POTION_DONE,
                        volumeModifier: 0.2,
                    }))
                }}
            >
                test
            </Button>*/}
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

const NeosContainer = styled.div`
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
    bottom: 0;
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

const BlackScreen = styled.div`
    position: absolute;
    z-index: 16;
    width: 100vw;
    height: 105vh;
    background-color: black;
    opacity: 1;
`;
