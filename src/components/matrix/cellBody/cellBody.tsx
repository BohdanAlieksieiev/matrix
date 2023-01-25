import { useContext } from "react";
import { MatrixContext } from "../../../context/matrixContext";

interface Props {
  text?: string;
  value: number;
  id: number;
  row: number;
  column: number;
}

export const CellBody = ({ text, value, row, column, id }: Props) => {
  const { hover, updateCell, setNearestAmount, nearests } = useContext(MatrixContext);

  const calcPercent = () => {
    if (value && hover) {
      return ((value * 100) / hover.sum).toFixed(1);
    }
    return 0;
  };

  const IS_CURRENT_ROW_HOVER = value && hover ? row === hover.row : false;
  const IS_NEAREST_AMOUNT = nearests.find(nearest => nearest?.id === id)

  const styleBackgroundColor = () => {
    if (IS_CURRENT_ROW_HOVER) {
      return `linear-gradient(180deg, rgba(255,255,255,0.7626400902157738) ${
        100 - +calcPercent()
      }%, rgba(141,191,236,0.5887605042016807) 100%)`
    } else if (IS_NEAREST_AMOUNT) {
      return '#00987961'
    } else {
      return `transparent`
    }
  }
  
  return (
    <td
      className={`${IS_CURRENT_ROW_HOVER && `active-row`}`}
      style={{
        background: styleBackgroundColor(),
        color: IS_NEAREST_AMOUNT ? `green` : 'black',
        fontWeight: IS_NEAREST_AMOUNT ? 'bold' : 'unset'
      }}
      onClick={() => updateCell(id, value + 1)}
      onMouseEnter={() => setNearestAmount(value)}
      onMouseLeave={() => setNearestAmount(undefined)}
    >
      {text}
      {IS_CURRENT_ROW_HOVER && `→ ${value && hover && calcPercent()}%`}
    </td>
  );
};
