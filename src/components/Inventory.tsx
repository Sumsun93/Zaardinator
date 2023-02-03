import styled from "styled-components";
import {useSelector} from "react-redux";
import { useDrag } from 'react-dnd';
import {RootState} from "../redux/store";
import inventoryCase from '../assets/ZZ_Overlay_Pancarte_Vide.svg';
import potion1 from '../assets/ZZ_Overlay_Potion_QUETE.svg';
import potion2 from '../assets/ZZ_Overlay_Potion_QUETE_2.svg';
import ITEMS from "../constants/items";


const Inventory = ({}) => {
    const {itemInventory} = useSelector((state: RootState) => state.game);
    const [{}, drag] = useDrag(() => ({
        type: 'item',
        item: { name: itemInventory },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <>
            <Case
                src={inventoryCase}
                alt="case"
            />
            {itemInventory !== ITEMS.NONE && (
                <Potion
                    src={itemInventory === ITEMS.POTION_1 ? potion1 : potion2}
                    alt="potion"
                    ref={drag}
                />
            )}
        </>
    );
};

export default Inventory;

const Case = styled.img`
    position: absolute;
    bottom: 20px;
    right: 20px; 
    width: 20vh;
    height: 11vh;
    z-index: 10;
`;

const Potion = styled.img`
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 20vh;
    height: 11vh;
    z-index: 10;
`;


