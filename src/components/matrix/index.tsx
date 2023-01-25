import { useContext } from "react";
import { MatrixContext } from "../../context/matrixContext";
import { CellHeader } from "./cellHeader/cellHeader";
import { CellBody } from "./cellBody/cellBody";
import { RowMatrix } from "./rowMatrix/rowMatrix";
import { CellSum } from "./cellSum/cellSum";
import "./styles.css";

export const Matrix = () => {
  const { matrix } = useContext(MatrixContext);

  const averageCell = (index: number) => {
    let sumCell = 0;
    let lengthRow = 0;
    matrix.forEach((row) => {
      sumCell += row[index].amount;
      ++lengthRow;
    });
    return (sumCell / lengthRow).toFixed(2);
  };

  const averageMatrix = () => {
    if (matrix.length) {
      return matrix.map((row) =>
        row.map((_, indexCell, arr) => {
          return averageCell(indexCell);
        })
      )[0];
    }
    return [];
  };

  return (
    <table className="styled-table">
      <thead>
        <RowMatrix>
          <CellHeader />
          {matrix.length &&
            matrix[0].length &&
            matrix[0].map((cell, indexCell) => {
              return (
                <CellHeader
                  key={cell.id + indexCell + 1}
                  text={`Cell value N = ${indexCell + 1}`}
                />
              );
            })}
          <CellHeader text={"Sum value"} />
        </RowMatrix>
      </thead>
      <tbody>
        {matrix.map((row, indexRow) => {
          return (
            <RowMatrix key={indexRow}>
              <CellBody text={`Cell Value M = ${indexRow + 1}`} row={indexRow} column={0} id={0} />
              {row.map((cell, indexCell) => {
                return <CellBody key={cell.id} text={`${cell.amount}`} row={indexRow} value={cell.amount} column={indexCell} id={cell.id} />;
              })}
              <CellSum
                row={indexRow}
                sum={row.reduce(
                  (acc, curentValue) => acc + curentValue.amount,
                  0
                )}
              />
            </RowMatrix>
          );
        })}
        <RowMatrix>
          <CellBody text={"Average values"} row={matrix.length} column={0} id={0} />
          {averageMatrix().map((value, index) => {
            return (
              <CellBody key={`${Date.now()}-${index}-${value}`} text={value}  row={matrix.length} column={index} id={0}  />
            );
          })}
          <CellBody  row={matrix.length} column={0} id={0} />
        </RowMatrix>
      </tbody>
    </table>
  );
};
