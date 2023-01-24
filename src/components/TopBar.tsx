import {Button, Col, Row} from "antd";
import zz from '../assets/zz.png'
import styled from "styled-components";

const TopBar = () => {
    // TopBar with Ant Design components with top and bot logo align verticaly on the left in small size
    return (
        <Row justify={'space-between'} align={'middle'} style={
            {
                height: '100%',
                width: '100%',
            }
        }>
            <Col span={4} style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                height: '100%',
            }}>
                <Button type={'link'} href={'https://twitch.tv/zaardoz'} target="_blank" style={{
                    height: '100%',
                    padding: 0,
                    border: 'none',
                    outline: 'none',
                }}>
                    <Image src={zz} alt="Logo de Zaardoz"/>
                </Button>
            </Col>
        </Row>
    );
};

export default TopBar;

const Image = styled.img`
    height: 100%;
  
    :hover {
      filter: drop-shadow(0 0 2rem #a34b40);
    }
`;
