import {Row} from "antd";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import Layout from "./Layout";
import backgroundImage1 from '../assets/donjon/ZZ_QUIZ_DONJON_1.webp';
import backgroundImage2 from '../assets/donjon/ZZ_QUIZ_DONJON_2.webp';
import nko from '../assets/donjon/ZZ_QUIZ_NKO.svg';
import {useNavigate} from "react-router-dom";
import {RootState} from "../redux/store";
import {useEffect, useMemo} from "react";
import QUEST_STATES from "../constants/questStates";
import {setSoundToPlay} from "../redux/features/game/gameSlice";
import {SOUNDS} from "../components/SoundEffect";
import ComicsBubble from "../components/ComicsBubble";
import useGameBoard from "../hooks/useGameBoard";
import {MAP} from "../constants/map";

// const socket = socketIoClient('https://zaardinator.onrender.com');
const Donjon = () => {
    const {questState} = useSelector((state: RootState) => state.game);
    const dispatch = useDispatch();
    const {moveToMap} = useGameBoard();

    useEffect(() => {
        dispatch(setSoundToPlay({
            sound: SOUNDS.DONJON,
            volumeModifier: 0.5,
        }))
    }, []);

    const goCastle = () => {
        moveToMap(MAP.CASTLE.HALL);
    }

    const goLabo = () => {
        moveToMap(MAP.CASTLE.LABO);
    }

    const isVisitingLabo = useMemo(() => questState !== QUEST_STATES.NOT_STARTED, [questState]);

    const items = useMemo(() => {
        const allItems = [
            {
                label: 'Retour',
                onClick: goCastle,
            }
        ];

        if (isVisitingLabo) {
            allItems.push({
                label: 'Laboratoire',
                onClick: goLabo,
            })
        }

        return allItems;
    }, [questState]);

    return (
        <Layout
            bgImage={isVisitingLabo ? backgroundImage2 : backgroundImage1}
            items={items}
            locationName={'Donjon'}
        >
            {questState === QUEST_STATES.NOT_STARTED && (
                <NkoContainer leftSide={isVisitingLabo}>
                    <ComicsBubble
                        content={[
                            'Sors de là malotru ! Ou la haine chaos s’en prendra à toi !'
                        ]}
                        right
                        onEnd={goCastle}
                        style={{
                            left: '-35vw',
                        }}
                    />
                    <Nko
                        src={nko}
                        alt={'Nko'}
                        leftSide={isVisitingLabo}
                    />
                </NkoContainer>
            )}
            {questState === QUEST_STATES.STATE_1 && (
                <NkoContainer leftSide={isVisitingLabo}>
                    <ComicsBubble
                        content={[
                            'Je vois que tu as rencontré notre princesse, je ressens encore sa présence sur toi. Je m\'appelle Nko et je suis le gardien de ces lieux. Si elle t’a accepté alors moi aussi.',
                            'Elle t’a envoyé ici c’est pour que tu lui vienne en aide. En as-tu vraiment envie ? Bon, saches que nombreux sont les fous qui ont essayé et aucun, n’en est jamais revenu...',
                            'Très bien tu peux passer. Ou pas d’ailleurs, attends il faut que je te mette en garde sur ce qui t’attends, malheureux ! Tu voudrais pas mourir trop vite quand même ?',
                            'Au delà de cette porte tu vas rencontrer le terrible et magnificent “Grand Mage” ! Il n’a pas la réputation de tolérer les mauvaises manières. Hors ta dégaine et ta petite taille vont sûrement poser problème. J’ai une idée !',
                            'Enfile ce pantalon, il a meilleure allure que ton vieux pyjama. Ah et prends aussi ce crâne en guise de présent pour le Grand Mage, je viens juste de le nettoyer.',
                            'N’oublies pas de bien réfléchir à ce que tu vas lui dire et d’être extrêmement poli, la moindre erreur te sera fatale. Es-tu prêt ?',
                        ]}
                        style={{
                            left: '25vw',
                            width: 500,
                        }}
                        onEnd={goLabo}
                    />
                    <Nko
                        src={nko}
                        alt={'Nko'}
                        leftSide={isVisitingLabo}
                    />
                </NkoContainer>
            )}
            {questState !== QUEST_STATES.NOT_STARTED && questState !== QUEST_STATES.STATE_1 && (
                <NkoContainer leftSide={isVisitingLabo}>
                    <Nko
                        src={nko}
                        alt={'Nko'}
                        leftSide={isVisitingLabo}
                    />
                </NkoContainer>
            )}
            <Row gutter={[24, 24]} justify={'space-between'} align={'bottom'} style={{
                marginTop: 30,
                width: '100%',
                height: '100%',
            }}>

            </Row>
        </Layout>
    )
}

export default Donjon

const NkoContainer = styled.div`
    position: absolute;
    bottom: 2vh;
    ${({leftSide}: { leftSide: boolean }) => leftSide && `
        transform: rotateY(0deg);
        left: 10vw;
        right: unset;
    `}
    height: 60vh;
    z-index: 5;
`;

const Nko = styled.img`
    position: absolute;
    bottom: 2vh;
    right: 20vw;
    height: 60vh;
    z-index: 5;
    transform: rotateY(180deg);
  
    ${({leftSide}: { leftSide: boolean }) => leftSide && `
        transform: rotateY(0deg);
        left: 10vw;
        right: unset;
    `}
`;
