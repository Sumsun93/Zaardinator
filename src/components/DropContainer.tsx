import { useDrop } from 'react-dnd'

const DropContainer = ({
    style,
    children,
    onDrop,
}: {
    style?: React.CSSProperties
    children?: React.ReactNode
    onDrop: (item: any) => void
}) => {
    const [{}, drop] = useDrop(() => ({
        accept: 'item',
        drop: (item) => onDrop(item),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }))

    return (
        <div ref={drop} style={style}>
            {children}
        </div>
    )
}

export default DropContainer
