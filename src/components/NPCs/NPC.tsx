import React, {useCallback, useEffect, useState} from 'react';
import useNPC from "../../hooks/useNPC";
import {CHARACTER_ASSETS, CHARACTER_ID} from "../../constants/character";
import ComicsBubble from "../ComicsBubble";
import styled from "styled-components";
import {FadeIn} from "../transitions/transitions";
import {getCloseDialogEventName} from "../../utils/events";
import useEvent from "../../hooks/useEvent";
import {DEFAULT_NPC_PROPERTIES} from "../../constants/defaultNPC";
import {getCharacterBubblePosition} from "../../utils/bubble";
import {getCurrentDialog, isDialogDisabled, isThisDialogForThisNPC} from "../../utils/dialog";
import useQuests from "../../hooks/useQuests";
import {getCurrentQuestStep} from "../../utils/quest";
import {Dialog} from "../../types/dialog";
import {getSavedGame} from "../../utils/save";

export interface NPCProps {
    characterId: CHARACTER_ID;
    bubblePosition?: 'left' | 'right';
    npcStyle?: React.CSSProperties;
}

const NPC: React.FC<NPCProps> = ({characterId, bubblePosition = 'right', npcStyle}) => {
    const {npc, create} = useNPC(characterId);
    const {activeQuests} = useQuests();

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
        }, 2000);

        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
        }
    }, [dialog]);

    useEvent<boolean>(getCloseDialogEventName(characterId), setShowDialog);

    useEffect(() => {
        if (!activeQuests.length) {
            return;
        }

        const dialog = getCurrentDialog(activeQuests[0]);

        if (!dialog || !isThisDialogForThisNPC(dialog, characterId)) {
            setDialog(npc?.defaultDialog || null);
            return;
        }

        if (characterId === CHARACTER_ID.NARRATOR) {
            const gameSave = getSavedGame();

            if (gameSave?.gameboard.currentMap !== dialog.narratorMap) {
                return;
            }
        }

        setDialog(dialog);
    }, [activeQuests, npc?.defaultDialog, characterId]);

    if (!npc) {
        return null;
    }

    const isNarrator = characterId === CHARACTER_ID.NARRATOR;

    return (
        <div>
            {npc && dialog && showDialog && (
                <BubbleContainer style={getCharacterBubblePosition(characterId)}>
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

            {CHARACTER_ASSETS[characterId] && (
                <img
                    onClick={handleOnClick}
                    src={CHARACTER_ASSETS[characterId]}
                    alt={characterId}
                    style={npcStyle}
                />
            )}
        </div>
    );
};

export default NPC;

const BubbleContainer = styled.div`
  position: absolute;
  z-index: 100;
`;
