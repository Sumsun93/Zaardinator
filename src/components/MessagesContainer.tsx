import {useCallback, useEffect, useState} from "react";
import {Socket} from "socket.io-client";
import styled, {keyframes} from "styled-components";

type MessagesContainerProps = {
    socket: Socket;
}

const MessagesContainer = ({
    socket
}: MessagesContainerProps) => {
    const [messages, setMessages] = useState<any>([]);

    const getRandomePositionInScreenView = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const x = Math.floor(Math.random() * width);
        const y = Math.floor(Math.random() * height);
        return {x, y};
    }

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('message', (data) => {
            // if message is too long, don't display it
            if (data.message.length > 100) {
                return;
            }

            setMessages((currentMessages: any) => {
                const newMessages = [...currentMessages, {
                    ...data,
                    ...getRandomePositionInScreenView()
                }];
                if (newMessages.length > 10) {
                    newMessages.shift();
                }
                return newMessages;
            });
        });
    }, []);

    const RenderMessage = ({ emotes, message }: any) => {
        if (!emotes) {
            return message;
        } else {
            // replace all usage of emotes with the image tag and return the message
            const emoteIds = Object.keys(emotes);
            let newMessage = message;
            emoteIds.forEach((emoteId) => {
                const emotePositions = emotes[emoteId];
                emotePositions.forEach((position: any) => {
                    const [start, end] = position.split('-');
                    const emote = message.substring(Number(start), Number(end) + 1);
                    newMessage = newMessage.replace(emote, `<Emote src="https://static-cdn.jtvnw.net/emoticons/v2/${emoteId}/default/dark/3.0" />`);
                });
            }
            );

            return (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                    }}
                >
                    {newMessage.split('<Emote').map((part: any, index: any) => {
                        if (index === 0) {
                            return part;
                        } else {
                            const src = part.split('"')[1];
                            return <Emote
                                key={index}
                                src={src}
                            />;
                        }
                    })}
                </div>
            );
        }
    };

    return (
        <Container>
            {messages.map(({message, x, y, tags}: any, index: number) => (
                <ComicsBubbleContainer
                    key={tags.id}
                    top={y}
                    left={x}
                >
                    <ComicsBubble>
                        <RenderMessage
                            emotes={tags.emotes}
                            message={message}
                        >
                            {message}
                        </RenderMessage>
                    </ComicsBubble>
                </ComicsBubbleContainer>
            ))}
        </Container>
    );
}
export default MessagesContainer;

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: .8;
    }
`

const fadeOut = keyframes`
    from {
        opacity: .8;
    }
    to {
        opacity: 0;
    }
`

const Container = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    z-index: 5;
`

const ComicsBubbleContainer = styled.div`
  position: absolute;
  ${({ top, left }: { top: number, left: number }) => (top && left ? `top: ${top}px; left: ${left}px;` : '')}
  animation: ${fadeIn} 0.5s ease-in-out;
  opacity: .8;
`;

const ComicsBubble = styled.div`
  display: inline-block;
  text-align: left;
  margin: 5px 9px 15px 6px;
  font-weight: 700;
  color: #000;
  padding: 5px 10px 5px 10px;
  border: 1px solid #999;
  border-radius: 10px;
  box-shadow: 3px 3px 15px #bbb;
  box-sizing: border-box;
  background-color: #d1d4ea;
  animation: ${fadeOut} 0.5s ease-in-out 3s forwards;
  
  &::before,
  &::after {
    content: '';
    display: block;
    position: absolute;
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
    box-sizing: border-box;
    left: 10px;
  }
  
  &::after {
    box-shadow: 3px 3px 15px #bbb;
    background: #d1d4ea;
    width: 15px;
    height: 10px;
    margin-left: 5px;
    border-left: 1px solid #999;
    border-bottom: 1px solid #999;
    border-top-right-radius: 10px;
    transform: rotate(-35deg) skew(-20deg);
  }
  
  &::before {
    width: 15px;
    height: 8px;
    bottom: -11px;
  }
`

const Emote = styled.img`
    height: 30px;
    margin: 0 2px;
`
