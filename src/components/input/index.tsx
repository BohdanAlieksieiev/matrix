interface Props {
    value?: string;
    onChange: (value: string) => void;
  }

export const Input = ({ value, onChange }: Props) => {
    return (
        <input
          className="input-number"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      );
}