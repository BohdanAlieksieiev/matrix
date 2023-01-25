import { useContext } from "react";
import { MatrixContext } from "../../../context/matrixContext";

interface Props {
  column: number;
}

export const CellAverage = ({ column }: Props) => {
  const { matrix } = useContext(MatrixContext);

  const averageCell = (
    matrix.reduce((acc, value) => acc + value[column].amount, 0) / matrix.length
  ).toFixed(2);

  return <td>{averageCell}</td>;
};
