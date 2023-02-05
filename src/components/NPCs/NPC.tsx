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

export interface NPCProps {
    characterId: CHARACTER_ID;
}

const NPC: React.FC<NPCProps> = ({characterId}) => {
    const {npc, create} = useNPC(characterId);

    const [showDialog, setShowDialog] = useState(false);

    const handleOnClick = useCallback(() => {
        if (!showDialog) {
            setShowDialog(true);
        }
    }, [showDialog]);

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
        if (!npc?.defaultDialog.autoPlay) {
            return;
        }

        const timeout = setTimeout(() => {
            if (npc?.defaultDialog.autoPlay) {
                setShowDialog(true);
            }
        }, 2500);

        return () => {
            clearTimeout(timeout);
        }
    }, [npc?.defaultDialog.autoPlay]);

    useEvent<boolean>(getCloseDialogEventName(characterId), setShowDialog);

    if (!npc || !CHARACTER_ASSETS?.[characterId]) {
        return null;
    }

    return (
        <div>
            {npc && npc.defaultDialog && showDialog && (
                <BubbleContainer style={getCharacterBubblePosition(characterId)}>
                    <FadeIn>
                        <ComicsBubble
                            right
                            firstLayer
                            style={{
                                width: '25vw',
                            }}
                            dialog={npc.defaultDialog}
                        />
                    </FadeIn>
                </BubbleContainer>
            )}

            <img
                onClick={handleOnClick}
                src={CHARACTER_ASSETS[characterId]}
                alt={characterId}
            />
        </div>
    );
};

export default NPC;

const BubbleContainer = styled.div`
  position: absolute;
  z-index: 100;
`;
