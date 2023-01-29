import {Layout, Typography} from "antd";
import QCM from "../components/QCM";
import styled from "styled-components";
import backgroundImage from '../assets/ZZ_QUIZ_BACKGROUND-100.jpg'
import socketIoClient from "socket.io-client";
import MessagesContainer from "../components/MessagesContainer";

const socket = socketIoClient('https://zaardinator.onrender.com');
const Home = () => (
    <Layout
        style={{
            position: 'relative',
            width: '100vw',
            minHeight: '100vh',
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            overflow: 'hidden',
        }}
    >
        <MessagesContainer socket={socket} />

        <BgColor />

        <Layout.Content style={{
            padding: '20px 20px',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <QCM />
        </Layout.Content>

        <Layout.Footer style={{
            width: '100%',
            backgroundColor: 'transparent',
            boxShadow: 'none',
            padding: 0,
        }}>
        </Layout.Footer>
    </Layout>
)

export default Home

const BgColor = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: #000000;
    opacity: 0.7;
    z-index: 5;
`;
