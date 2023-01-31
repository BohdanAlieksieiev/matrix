interface Props {
    text: string
    onClick?: () => void
}

export const Button = ( { text, onClick } : Props) => {
    return <button className="button" onClick={onClick}>{text}</button>
}