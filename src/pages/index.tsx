import { useContext } from "react";
import { MatrixContext } from "../context/matrixContext";
import { Range, Matrix } from "../components";

const Index = () => {
  const { rows, columns, setColumns, setRows } = useContext(MatrixContext);
  return (
    <section className="flex flex-col items-center index-page-container">
      <div className="range-text">
        columns: {columns}
        <Range onChange={setColumns} value={columns} />
      </div>
      <div className="range-text">
        rows: {rows}
        <Range onChange={setRows} value={rows} />
      </div>
      <div>
        <Matrix />
      </div>
    </section>
  );
};

export default Index;
