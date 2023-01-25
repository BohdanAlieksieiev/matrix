import './styles.css'

interface Props {
    onChange: (value: number) => void
    value: number
}

export const Range = ({ onChange, value }: Props) => {
    return <div className="container-range">
        <input type="range" onChange={(event) => onChange(+event.target.value)} value={value} max={100} min={1} />
    </div>
}