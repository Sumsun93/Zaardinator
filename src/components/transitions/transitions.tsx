import styled, {css, keyframes} from "styled-components";

const fadeIn = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

export const FadeIn = styled.div`
    position: relative;
    z-index: 100;
  
    ${({ doFade }: { doFade?: boolean }) => doFade && css`
        opacity: 0;
        animation: ${fadeIn} 1s ease-in-out 2.5s;
        animation-fill-mode: forwards;
    `}
`;

const slideFromRight = keyframes`
    0% {
        transform: translateX(150%) skewX(20deg);
    }
    100% {
        transform: translateX(0);
    }
`;

export const SlideFromRight = styled.div`
  transform: translateX(100vw);
  animation: ${slideFromRight} 1s ease-in-out 1.5s;
  animation-fill-mode: forwards;
  transition: .2s;
`;
