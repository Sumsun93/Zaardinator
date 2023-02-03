import styled from "styled-components";
import {Col, Row, Typography} from "antd";
import bar from '../assets/ZZ_Overlay_Barre.svg';


const MoveBar = ({
    items,
}: {
    items: {
        label: string;
        onClick: () => void;
        onMouseEnter?: () => void;
        onMouseLeave?: () => void;
    }[];
}) => {
    return (
        <Container>
            <Row
                gutter={[24, 24]}
                justify={'space-between'}
                align={'bottom'}
                style={{
                    position: 'relative',
                    width: '90em',
                    paddingBottom: 10,
                }}
            >
                <Bar
                    src={bar}
                    alt={'Barre de déplacement'}
                />
                {items.map((item, index) => (
                    <Col
                        key={index}
                        span={24 / items.length}
                    >
                        <Button>
                            <Typography.Title
                                onClick={item.onClick}
                                style={{
                                    cursor: 'pointer',
                                    zIndex: 10,
                                    margin: 0,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                onMouseEnter={item.onMouseEnter}
                                onMouseLeave={item.onMouseLeave}
                            >
                                {item.label}
                            </Typography.Title>
                        </Button>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default MoveBar;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const Button = styled.div`
    opacity: 0.7;
  
    &:hover {
        opacity: 1;
    }
`;

const Bar = styled.img`
    position: absolute;
    bottom: 45px;
    width: 100%;
    height: 100%;
`;
