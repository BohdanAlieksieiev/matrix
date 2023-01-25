interface Props {
    children: React.ReactNode
}

export const RowMatrix = ({ children } : Props) => {
    return <tr>{children}</tr>
}