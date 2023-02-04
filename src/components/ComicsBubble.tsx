import React from "react";
import styled, {css, keyframes} from "styled-components";
import Typewriter from 'typewriter-effect';

const ComicsBubble = ({ firstLayer, fadeOut, style, right, startDelay, content, onEnd, isNarrator }: {
    firstLayer?: boolean;
    fadeOut?: boolean;
    style?: React.CSSProperties;
    right?: boolean;
    startDelay?: number;
    content: string[];
    onEnd?: () => void;
    isNarrator?: boolean;
}) => {
    const typewriterRef = React.useRef<any>(null);
    const [currentContent, setCurrentContent] = React.useState<number>(0);

    const onClick = () => {
        if (typewriterRef.current) {
            typewriterRef.current
                .deleteAll(0.001)
                .callFunction(() => {
                    if (currentContent < content.length - 1) {
                        setCurrentContent(currentContent + 1);
                    }
                    else if (onEnd) {
                        onEnd();
                    }
                })
                .start();

        }
    }

    React.useEffect(() => {
        if (typewriterRef.current) {
            typewriterRef.current
                .typeString(content[currentContent])
                .start();
        }
    }, [currentContent]);

    return (
        <Bubble
            firstLayer={firstLayer}
            fadeOut={fadeOut}
            style={style}
            right={right}
            isNarrator={isNarrator}
        >
            <Typewriter
                onInit={(typewriter) => {
                    typewriterRef.current = typewriter;

                    typewriter
                        .pauseFor(startDelay || 0)
                        .changeDelay(10)
                        .typeString(content[currentContent])
                        .start();
                }}
            />
            <span
                style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'center',
                    marginTop: 10,
                    padding: '0 10',
                    cursor: 'pointer',
                    color: '#000',
                    fontWeight: 700,
                    opacity: 0.5,
                    fontSize: 14,
                    fontStyle: 'italic',
                }}
                onClick={onClick}>
                cliquer pour continuer
            </span>
        </Bubble>
    );
}

export default ComicsBubble;

const fadeOutAnim = keyframes`
    from {
        opacity: .8;
    }
    to {
        opacity: 0;
    }
`

const Bubble = styled.div`
  position: relative;
  display: inline-block;
  text-align: left;
  margin: 5px 9px 15px 6px;
  font-weight: 700;
  font-size: 1.2em;
  color: #000;
  padding: 5px 10px 5px 10px;
  border: 1px solid #999;
  border-radius: 10px;
  box-shadow: 3px 3px 15px #f5e2c7;
  box-sizing: border-box;
  background-color: #f5e2c7;
  // #d1d4ea
  
    ${({ firstLayer, fadeOut, right, isNarrator }: { firstLayer?: boolean, fadeOut?: boolean, right?: boolean, isNarrator?: boolean }) => {
        return css`
            z-index: ${firstLayer ? 100 : "unset"};
            ${fadeOut && css`
                animation: ${fadeOutAnim} 0.5s ease-in-out 5s forwards;
            `}

            ${!isNarrator && `
                &::before,
                &::after {
                    content: '';
                    display: block;
                    position: absolute;
                    -webkit-transition: all 0.3s ease;
                    transition: all 0.3s ease;
                    box-sizing: border-box;
                    ${right ? 'right' : 'left'}: 10px;
                }
    
                &::after {
                    box-shadow: 3px 3px 15px #f5e2c7;
                    background: #f5e2c7;
                    width: 15px;
                    height: 10px;
                    margin-left: 5px;
                    border-${right ? 'right' : 'left'}: 1px solid #999;
                    border-bottom: 1px solid #999;
                    border-top-${right ? 'left' : 'right'}-radius: 10px;
                    transform: ${right ? 'rotate(35deg) skew(20deg)' : 'rotate(-35deg) skew(-20deg)'};
                }
            `}
        `
    }}
  
  &::before {
    width: 15px;
    height: 8px;
    bottom: -11px;
  }
`
