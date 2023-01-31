import { useContext } from "react";
import { MatrixContext } from "../context/matrixContext";
import { Range, Matrix, Number, Button, Input } from "../components";

const Index = () => {
  const {
    rows,
    columns,
    setColumns,
    setRows,
    MAX_COLUMNS,
    MAX_ROWS,
    onAddRow,
    onRemoveRow,
    onAddColumn,
    onRemoveColumn,
    X,
    setX,
  } = useContext(MatrixContext);
  return (
    <section className="flex flex-col items-center index-page-container">
      <div className="flex-gap-index">
        <div className="range-text">
          <div className="range-text-flex">
            <span> columns: </span>
            <div>
              <Number max={MAX_COLUMNS} value={columns} onChange={setColumns} />
              <Button text="+" onClick={onAddColumn} />
              <Button text="-" onClick={onRemoveColumn} />
            </div>
          </div>
          <Range onChange={setColumns} value={columns} max={MAX_COLUMNS} />
        </div>
        <div className="range-text">
          <div className="range-text-flex">
            <span> rows: </span>
            <div>
              <Number max={MAX_ROWS} value={rows} onChange={setRows} />
              <Button text="+" onClick={onAddRow} />
              <Button text="-" onClick={onRemoveRow} />
            </div>
          </div>
          <Range onChange={setRows} value={rows} max={MAX_ROWS} />
        </div>
      </div>
      <div className="container-x">
        <span>X:</span>
        <Number max={30} value={X} onChange={setX} />
      </div>
      <div className="container-matrix">
        <Matrix />
      </div>
    </section>
  );
};

export default Index;
