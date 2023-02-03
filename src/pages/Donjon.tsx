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

// const socket = socketIoClient('https://zaardinator.onrender.com');
const Donjon = () => {
    const {questState} = useSelector((state: RootState) => state.game);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setSoundToPlay({
            sound: SOUNDS.DONJON,
            volumeModifier: 0.5,
        }))
    }, []);

    const goCastle = () => {
        navigate('/castle');
    }

    const goLabo = () => {
        navigate('/castle-labo');
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
            <Nko
                src={nko}
                alt={'Nko'}
                leftSide={isVisitingLabo}
            />
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
