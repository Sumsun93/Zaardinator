import {Row} from "antd";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import Layout from "./Layout";
import backgroundImage1 from '../assets/donjon/ZZ_QUIZ_DONJON_1.webp';
import backgroundImage2 from '../assets/donjon/ZZ_QUIZ_DONJON_2.webp';
import {RootState} from "../redux/store";
import {useEffect, useMemo} from "react";
import {setSoundToPlay} from "../redux/features/game/gameSlice";
import {SOUNDS} from "../components/SoundEffect";
import useGameBoard from "../hooks/useGameBoard";
import {MAP_NAME} from "../constants/map";
import {isActiveQuestIsAfter, isQuestCompleted} from "../utils/quest";
import {QUEST_ID} from "../constants/quest";
import usePlayer from "../hooks/usePlayer";
import NPC from "../components/NPCs/NPC";
import {CHARACTER_ID} from "../constants/character";

// const socket = socketIoClient('https://zaardinator.onrender.com');
const Donjon = () => {
    const {questState} = useSelector((state: RootState) => state.game);
    const dispatch = useDispatch();
    const {moveToMap} = useGameBoard();
    const {player} = usePlayer();

    useEffect(() => {
        dispatch(setSoundToPlay({
            sound: SOUNDS.DONJON,
            volumeModifier: 0.5,
        }))
    }, []);

    const goCastle = () => {
        moveToMap(MAP_NAME.CASTLE.HALL);
    }

    const goLabo = () => {
        moveToMap(MAP_NAME.CASTLE.LABO);
    }

    const isVisitingLabo = isQuestCompleted(player.questsFinished, QUEST_ID.SAVE_THE_PRINCESS) ||
        isActiveQuestIsAfter(player.activeQuests, QUEST_ID.SAVE_THE_PRINCESS, 0)

    const items = useMemo(() => {
        const allItems = [
            {
                label: 'Retour',
                onClick: goCastle,
            }
        ];

        const canAccessLab = isQuestCompleted(player.questsFinished, QUEST_ID.SAVE_THE_PRINCESS) ||
            isActiveQuestIsAfter(player.activeQuests, QUEST_ID.SAVE_THE_PRINCESS, 0, 1)

        if (isVisitingLabo && canAccessLab) {
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
            <NkoContainer leftSide={isVisitingLabo}>
                <NPC
                    characterId={CHARACTER_ID.NKO}
                    bubblePosition={isVisitingLabo ? 'left' : 'right'}
                    npcStyle={{
                        height: '60vh',
                        transform: isVisitingLabo ? 'rotateY(0deg)' : 'rotateY(180deg)',
                    }}
                />
            </NkoContainer>

            <Row
                gutter={[24, 24]}
                justify={'space-between'}
                align={'bottom'}
                style={{
                    marginTop: 30,
                    width: '100%',
                    height: '100%',
                }}
            >

            </Row>
        </Layout>
    )
}

export default Donjon

const NkoContainer = styled.div`
  position: absolute;
  bottom: 2vh;
  z-index: 5;
  right: 20vw;

  ${({leftSide}: { leftSide: boolean }) => leftSide && `
        left: 10vw;
        right: unset;
    `}
`;
