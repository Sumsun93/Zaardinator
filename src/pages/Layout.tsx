import {Layout, Typography} from "antd";
import styled from "styled-components";
import {useSelector} from "react-redux";
import MoveBar from "../components/MoveBar";
import bgLocation from '../assets/ZZ_Overlay_Lieu.svg';
import Inventory from "../components/Inventory";
import QUEST_STATES from "../constants/questStates";
import EscapeMenu from "../components/EscapeMenu";

const CustomLayout = ({
    children,
    bgImage,
    items,
    locationName,
    isBgOpacity = false,
}: {
    children?: React.ReactNode,
    bgImage?: string,
    items?: {
        label: string,
        onClick: () => void,
        onMouseEnter?: () => void,
        onMouseLeave?: () => void,
    }[],
    locationName?: string,
    isBgOpacity?: boolean,
}) => {
    const {bgPosition, questState} = useSelector((state: any) => state.game);

    return (
        <Layout
            style={{
                position: 'relative',
                width: '100vw',
                height: '100vh',
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: `${bgPosition}%`,
                backgroundRepeat: 'no-repeat',
                overflow: 'hidden',
            }}
        >
            {isBgOpacity && (
                <BgColor />
            )}
            <Layout.Header style={{
                width: '100%',
                height: 0,
                backgroundColor: 'transparent',
                boxShadow: 'none',
                padding: 0,
            }}>
                <EscapeMenu />

                {locationName && (
                    <Typography.Title
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            textAlign: 'center',
                            margin: '12px 0 0 0',
                            padding: '7px',
                        }}
                    >
                        <span
                            style={{
                                position: 'relative',
                                padding: '20px',
                                zIndex: 15,
                            }}
                        >
                            {locationName}
                        </span>
                        <BgLocation
                            src={bgLocation}
                            alt="bgLocation"
                        />
                    </Typography.Title>
                )}
            </Layout.Header>

            {/*<MessagesContainer socket={socket} />*/}

            <Layout.Content style={{
                padding: '20px 20px',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                {children}
            </Layout.Content>

            <Layout.Footer style={{
                width: '100%',
                backgroundColor: 'transparent',
                boxShadow: 'none',
                padding: 0,
                zIndex: 15,
            }}>
                {items && <MoveBar items={items} />}
                {questState !== QUEST_STATES.NOT_STARTED && questState !== QUEST_STATES.DONE && <Inventory />}
            </Layout.Footer>
        </Layout>
    )
}

export default CustomLayout

const BgColor = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: #000000;
    opacity: 0.7;
    z-index: 10;
`;

const BgLocation = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 15;
`;
