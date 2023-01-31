interface Props {
  max?: number;
  value?: number;
  onChange: (value: number) => void;
}

export const Number = ({ max, value, onChange }: Props) => {
  return (
    <input
      className="input-number"
      type="number"
      min={1}
      max={max ? max : 100}
      value={value}
      onChange={(e) => onChange(+e.target.value)}
    />
  );
};
