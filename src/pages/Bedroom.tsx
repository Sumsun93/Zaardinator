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
import ComicsBubble from "../components/ComicsBubble";
import useGameBoard from "../hooks/useGameBoard";
import {MAP} from "../constants/map";

// const socket = socketIoClient('https://zaardinator.onrender.com');
const Bedroom = () => {
    const {questState} = useSelector((state: RootState) => state.game);
    const dispatch = useDispatch();
    const {moveToMap} = useGameBoard();

    const goCastle = () => {
        moveToMap(MAP.CASTLE.HALL);
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
                {questState === QUEST_STATES.DONE && (
                    <ComicsBubble
                        style={{
                            position: 'absolute',
                            bottom: '55vh',
                            right: '-8vw',
                            width: '30%',
                        }}
                        content={[
                            '“ Une lumière intense jaillit alors dans la pièce, tu es éblouis et confus mais tu te sens bien. Une chaleur douce s’empare de ton corps, tu es comme bercé d’une sérénité sans pareil. C’est à ce moment là qu’une main vient se poser sur la tienne.”',
                            'Je ne comprends pas, on m’a jeté un sort avant que je puisse le chanter en public…',
                        ]}
                        onEnd={() => {
                            window.open('https://www.youtube.com/watch?v=_T2cU0TA9hE', '_blank');
                        }}
                    />
                )}
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
                    <NarratorContainer>
                        <ComicsBubble
                            style={{
                                width: '30%',
                            }}
                            isNarrator
                            content={[
                                'Après l’exploration du château en ayant fais le plus attention possible pour ne pas faire de bruit, malgré tes genoux qui claquent, te voilà enfin dans la chambre royale.',
                                'Tu aperçois le fantôme d’une femme, tu ne sais pas bien comment réagir mais très vite tu te sens épris de tristesse pour elle, pourquoi est elle ici dans cet état ? Que lui est-il arrivé ?',
                                'Finalement elle se rapproche de toi, en tendant la main gracieusement, elle t’implore de l’aider.',
                                'Tu comprends avec ces mimes délicats qu’elle t’invite à descendre au plus profond du château, peut être y trouvera tu une solution à son problème ?',
                                'Le courage et une force inexplicable s\'emparent alors de toi, tu n’as qu’une idée en tête désormais, sauver cette gente dame. Tu adresse alors un sourire maladroit au fantôme et pars pour les profondeurs glaciales du château.'
                            ]}
                            onEnd={() => {
                                dispatch(setQuestState(QUEST_STATES.STATE_1));
                            }}
                        />
                    </NarratorContainer>
                )}
                {questState === QUEST_STATES.STATE_7 && (
                    <NarratorContainer>
                        <ComicsBubble
                            style={{
                                width: '30%',
                            }}
                            isNarrator
                            content={[
                                'Nerveux, tu regardes le fantôme virevoltant au-dessus de son lit. tu inspires profondément, débouches la fiole et la tend au fantôme.',
                            ]}
                        />
                    </NarratorContainer>
                )}
            </Row>
        </Layout>
    )
}

export default Bedroom

const PrincessContainer = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
`;

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

const NarratorContainer = styled.div`
    position: absolute;
    margin-bottom: 5vh;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    z-index: 10;
`;
