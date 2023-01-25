import { useContext } from "react";
import { MatrixContext } from "../../context/matrixContext";
import { CellHeader } from "./cellHeader/cellHeader";
import { CellBody } from "./cellBody/cellBody";
import { RowMatrix } from "./rowMatrix/rowMatrix";
import { CellSum } from "./cellSum/cellSum";
import { CellAverage } from "./cellAverage/cellAverage";
import { CellSide } from "./cellSide/cellSide";
import "./styles.css";

export const Matrix = () => {
  const { matrix } = useContext(MatrixContext);

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
              <CellSide text={`Cell Value M = ${indexRow + 1}`} />
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
          <CellSide text={"Average values"} />
          {matrix[0].map((value, index) => {
            return (
              <CellAverage key={`${Date.now()}-${index}-${value.id}`}  column={index}  />
            );
          })}
          <CellSide  text={""} />
        </RowMatrix>
      </tbody>
    </table>
  );
};
