import {RootState} from "../redux/store";
import {useDispatch, useSelector} from "react-redux";
import {Button, Slider, Typography} from "antd";
import {setQuestState, setSettings} from "../redux/features/game/gameSlice";
import QUEST_STATES from "../constants/questStates";
import {AiOutlineSetting, FiVolume2, FiVolumeX, ImCross} from "react-icons/all";
import zaardoz from "../assets/zz.png";
import styled from "styled-components";

const EscapeMenu = () => {
    const dispatch = useDispatch();
    const {openEscapeMenu, volume} = useSelector((state: RootState) => state.game.settings);

    const handleOpenEscapeMenu = () => {
        dispatch(setSettings({
            openEscapeMenu: true,
        }));
    }

    const handleResetGame = () => {
        dispatch(setQuestState(QUEST_STATES.NOT_STARTED));
        localStorage.removeItem('questPrincess');
    }

    const handleCloseMenu = () => {
        dispatch(setSettings({
            openEscapeMenu: false,
        }));
    }

    return (
        <>
            {!openEscapeMenu ? (
                <Button
                    type="primary"
                    shape="circle"
                    size="large"
                    style={{
                        position: 'absolute',
                        top: 10,
                        left: 10,
                        zIndex: 10,
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: 'none',
                        fontSize: '2em',
                    }}
                    onClick={handleOpenEscapeMenu}
                    icon={<AiOutlineSetting />}
                />
                ) : (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        zIndex: 100,
                    }}
                    onClick={handleCloseMenu}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            padding: '30px 30px 30px 30px',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 20,
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <Button
                            type="primary"
                            style={{
                                position: 'absolute',
                                top: 10,
                                right: 10,
                                zIndex: 10,
                                backgroundColor: 'transparent',
                                border: 'none',
                                outline: 'none',
                                boxShadow: 'none',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            onClick={handleCloseMenu}
                            icon={<ImCross />}
                        />
                        <Button
                            type="link"
                            href="https://twitch.tv/zaardoz"
                            target="_blank"
                            style={{
                                height: '10vh',
                            }}
                        >
                            <Zaardoz src={zaardoz} alt="zaardoz" />
                        </Button>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                margin: '30px 0',
                                fontSize: '2em',
                            }}
                        >
                            <FiVolumeX />
                            <Slider
                                style={{
                                    width: '80%',
                                    margin: '0 auto',
                                }}
                                defaultValue={volume}
                                min={0}
                                max={1}
                                step={0.01}
                                tooltip={{
                                    formatter: (value) => {
                                        return value ? `${(value * 100).toFixed()}%` : '0%';
                                    }
                                }}
                                onChange={(value) => {
                                    dispatch(setSettings({
                                        volume: value,
                                    }));
                                }}
                            />
                            <FiVolume2 />
                        </div>
                        <Button
                            size="large"
                            type="text"
                            style={{
                                outline: 'none',
                                border: 'none',
                                marginTop: 30,
                                fontSize: '2em',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textTransform: 'uppercase',
                                padding: '30px',
                            }}
                            onClick={handleResetGame}
                        >
                            Réinitialiser les quêtes
                        </Button>

                        <Typography.Title level={5} style={{
                            textAlign: 'center',
                            fontWeight: '900',
                            width: '100%',
                        }}>
                            Développé par <span style={{ color: '#FFD700' }}>Sumsun</span>, design par <span style={{ color: '#FFD700' }}>NeosRanger</span>
                            <br />
                            merci à <span style={{ color: '#FFD700' }}>Nko</span> pour les textes
                        </Typography.Title>
                    </div>
                </div>
            )}
        </>
    )
}

export default EscapeMenu

const Zaardoz = styled.img`
    height: 100%;
    z-index: 5;
  
    &:hover {
      filter: drop-shadow(0 0 0.75rem #FFD700);
    }
`;
