import './styles.css'

interface Props {
    onChange: (value: number) => void
    value: number
    max?: number
}

export const Range = ({ onChange, value, max }: Props) => {
    return <div className="container-range">
        <input type="range" onChange={(event) => onChange(+event.target.value)} value={value} max={max ? max : 100} min={1} />
    </div>
}