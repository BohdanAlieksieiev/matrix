interface Props {
  text: string;
}

export const CellSide = ({ text }: Props) => {
  return <td>{text}</td>;
};
