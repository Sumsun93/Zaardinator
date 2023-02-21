import React, {useCallback, useEffect, useState} from 'react';
import useNPC from "../../hooks/useNPC";
import {CHARACTER_ASSETS, CHARACTER_ID} from "../../constants/character";
import ComicsBubble from "../ComicsBubble";
import styled from "styled-components";
import {FadeIn} from "../transitions/transitions";
import {getCloseDialogEventName} from "../../utils/events";
import useEvent from "../../hooks/useEvent";
import {DEFAULT_NPC_PROPERTIES} from "../../constants/defaultNPC";
import {getCurrentDialog, isDialogDisabled, isThisDialogForThisNPC} from "../../utils/dialog";
import useQuests from "../../hooks/useQuests";
import {Dialog} from "../../types/dialog";
import useGameBoard from "../../hooks/useGameBoard";

export interface NPCProps {
    characterId: CHARACTER_ID;
    bubblePosition?: 'left' | 'right';
    npcStyle?: React.CSSProperties;
}

const NPC: React.FC<NPCProps> = ({characterId, bubblePosition = 'right', npcStyle}) => {
    const {npc, create} = useNPC(characterId);
    const {activeQuests} = useQuests();
    const {gameboard} = useGameBoard();

    const [dialog, setDialog] = useState<Dialog | null>(null);
    const [showDialog, setShowDialog] = useState(false);

    const handleOnClick = useCallback(() => {
        if (!showDialog && dialog && !isDialogDisabled(dialog)) {
            setShowDialog(true);
        }
    }, [showDialog, dialog]);

    useEffect(() => {
        if (npc) {
            return;
        }

        // @ts-ignore
        if (DEFAULT_NPC_PROPERTIES[characterId]) {
            // @ts-ignore
            create(DEFAULT_NPC_PROPERTIES[characterId]);
        }
    }, [npc]);

    useEffect(() => {
        let timeout: number = -1;

        if (!dialog || isDialogDisabled(dialog) || !dialog.autoPlay) {
            return;
        }

        timeout = setTimeout(() => {
            setShowDialog(true);
        }, 1000);

        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
        }
    }, [dialog]);

    useEvent<boolean>(getCloseDialogEventName(characterId), setShowDialog);

    useEffect(() => {
        if (!activeQuests.length) {
            setDialog(npc?.defaultDialog || null);
            return;
        }

        const dialog = getCurrentDialog(activeQuests[0]);

        if (!dialog || !isThisDialogForThisNPC(dialog, characterId)) {
            setDialog(npc?.defaultDialog || null);
            return;
        }

        if (characterId === CHARACTER_ID.NARRATOR && gameboard.currentMap !== dialog.narratorMap) {
            return;
        }

        setDialog(dialog);
    }, [activeQuests, npc?.defaultDialog, characterId, gameboard]);

    if (!npc) {
        return null;
    }

    const isNarrator = characterId === CHARACTER_ID.NARRATOR;

    return (
        <Wrapper isNarrator={isNarrator}>
            {npc && dialog && showDialog && (
                <BubbleContainer
                    characterId={characterId}
                    right={bubblePosition === 'right'}
                >
                    <FadeIn>
                        <ComicsBubble
                            isNarrator={isNarrator}
                            right={bubblePosition === 'right'}
                            firstLayer
                            style={{
                                width: '25vw',
                            }}
                            dialog={dialog}
                        />
                    </FadeIn>
                </BubbleContainer>
            )}

            {CHARACTER_ASSETS[characterId] && typeof CHARACTER_ASSETS[characterId] === 'object' && (
                <div onClick={handleOnClick} style={npcStyle}>
                    {CHARACTER_ASSETS[characterId]}
                </div>
            )}

            {CHARACTER_ASSETS[characterId] && typeof CHARACTER_ASSETS[characterId] === 'string' && (
                <img
                    onClick={handleOnClick}
                    src={CHARACTER_ASSETS[characterId]}
                    alt={characterId}
                    style={npcStyle}
                />
            )}
        </Wrapper>
    );
};

export default NPC;

const Wrapper = styled.div<{isNarrator: boolean}>`
  position: relative;
  
  ${({isNarrator}) => {
    if (isNarrator) {
      return {
        width: '100%',
        height: '100%',
      };
    }

    return {};
  }}
`

const BubbleContainer = styled.div<{ characterId: CHARACTER_ID, right: boolean }>`
  position: absolute;
  z-index: 100;

  ${({characterId, right}) => {
    switch (characterId) {
      case CHARACTER_ID.CHOUMCHOUM:
        return {
          bottom: '96%',
          right: '50%',
        };
      case CHARACTER_ID.BENJAM:
        return {
          bottom: '100%',
          right: '11%',
        }
      case CHARACTER_ID.NARRATOR:
        return {
          bottom: '5vh',
          left: `calc(50% - 12.5vw - 15px)`,
        };
      case CHARACTER_ID.NKO:
        if (!right) {
          return {
            bottom: '83%',
            left: '55%',
          };
        }

        return {
          bottom: '83%',
          left: '-80%',
        };
      case CHARACTER_ID.NEOS:
        return {
          bottom: '85%',
          left: '-38%',
        };
      default:
        return {
          bottom: 0,
          left: 0,
        };
    }
  }};

  @media (min-width: 1921px) {
    ${({characterId, right}) => {
      switch (characterId) {
        case CHARACTER_ID.CHOUMCHOUM:
          return {
            bottom: '96%',
            left: '-70%',
          };
        case CHARACTER_ID.BENJAM:
          return {
            bottom: '100%',
            right: '7%',
          }
        case CHARACTER_ID.NARRATOR:
          return {
            bottom: '5vh',
            left: `calc(50% - 12.5vw - 15px)`,
          };
        case CHARACTER_ID.NKO:
          if (!right) {
            return {
              bottom: '83%',
              left: '55%',
            };
          }

          return {
            bottom: '83%',
            left: '-95%',
          };
        case CHARACTER_ID.NEOS:
          return {
            bottom: '85%',
            left: '-40%',
          };
        default:
          return {
            bottom: 0,
            left: 0,
          };
      }
    }}
  }
`;
