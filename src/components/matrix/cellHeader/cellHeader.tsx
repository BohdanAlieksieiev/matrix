interface Props {
    text?: string
}

export const CellHeader = ({ text } : Props) => {
    return <th>{text}</th>
}