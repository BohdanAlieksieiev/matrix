import { useState, createContext, useCallback, useEffect } from "react";
import { debounce } from "../helpers/debounce";
import { Cell } from "../components/matrix/props";
import { generationDataTable, generationColumn } from "./generationDataTable";

interface Props {
  children: React.ReactNode;
}

const INIT_STATE = {
  columns: 5,
  rows: 5,
  matrix: [],
  nearest: 0,
  hover: undefined,
  nearests: [],
  MAX_COLUMNS: 100,
  MAX_ROWS: 100,
  setMatrix: (data: Cell[][]) => {},
  setRows: (rows: number) => {},
  setColumns: (columns: number) => {},
  setHover: (value: Hover | undefined) => {},
  updateCell: (id: number, amount: number) => {},
  setNearestAmount: (nearest: number | undefined) => {},
  getColumn: (index: number) => {},
  onAddRow: () => {},
  onRemoveRow: () => {},
  onAddColumn: () => {},
  onRemoveColumn: () => {},
  X: 0,
  setX: () => {},
};

interface Hover {
  row: number;
  sum: number;
}

interface MatrixState {
  columns: number;
  rows: number;
  matrix: Cell[][];
  hover?: Hover;
  nearestAmount?: number;
  nearests: Cell[];
  MAX_COLUMNS: number;
  MAX_ROWS: number;
  setMatrix: (data: Cell[][]) => void;
  setRows: (rows: number) => void;
  setColumns: (columns: number) => void;
  setHover: (value: Hover | undefined) => void;
  updateCell: (id: number, amount: number) => void;
  setNearestAmount: (nearest: number | undefined) => void;
  getColumn: (index: number) => void;
  onAddRow: () => void;
  onRemoveRow: () => void;
  onAddColumn: () => void;
  onRemoveColumn: () => void;
  X: number;
  setX: (value: number) => void
}

export const MatrixContext = createContext<MatrixState>(INIT_STATE);

export const AuthContextProvider = ({ children }: Props) => {
  const [rows, setRows] = useState<number>(INIT_STATE.rows);
  const [columns, setColumns] = useState<number>(INIT_STATE.columns);
  const [hover, setHover] = useState<Hover | undefined>();
  const [nearestAmount, setNearestAmount] = useState<number | undefined>(0);
  const [nearests, setNearests] = useState<Cell[]>([])
  const MAX_COLUMNS = INIT_STATE.MAX_COLUMNS
  const MAX_ROWS = INIT_STATE.MAX_ROWS
  const [matrix, setMatrix] = useState<Cell[][]>(
    generationDataTable(rows, columns)
  );
  const [ X, setX ] = useState<number>(0);

  useEffect(() => {
    findNearestAmount();
  }, [nearestAmount]);

  const minNumberNearest = () => {
    return matrix.length < matrix[0].length ? matrix.length : matrix[0].length // in exampe it is X
  }

  const findNearestAmount = () => {
    if (nearestAmount) {
      const countNearest = [];
      if (X > 0) {
        const sortFlatMatrix = matrix.flat().sort((a, b) => {
          return (
            Math.abs(nearestAmount - a.amount) -
            Math.abs(nearestAmount - b.amount)
          );
        });
        sortFlatMatrix.splice(0, 1)
        for (; countNearest.length !== X; ) {
          countNearest.push(sortFlatMatrix[0]);
          sortFlatMatrix.splice(0, 1)
        }
        // console.log(countNearest)
        setNearests(countNearest)
      }
    } else {
      setNearests([])
    }
  };

  const updateMatrix = useCallback(debounce(setMatrix, 1000), []);

  const updateCell = (id: number, amount: number) => {
    setMatrix(
      matrix.map((row) => row.map((column) => {
        if (column.id === id) {
          return {
            id,
            amount
          }
        } else {
          return column
        }
      }))
    )
  };

  const getColumn = (index: number) => {
    return matrix.map(row => row[index])
  }

  const onAddRow = () => {
    if ( matrix.length < MAX_ROWS ) {
      setMatrix([
        ...matrix,
        ...generationDataTable(1, matrix[0].length)
      ])
    }
  }

  const onRemoveRow = () => {
    if ( matrix.length > 1 ) {
      setMatrix([
        ...matrix.slice(0, matrix.length - 1)
      ])
    }
  }

  const onAddColumn = () => {
    if ( matrix[0].length < MAX_COLUMNS ) {
      setMatrix(
        matrix.map((row, rowIndex) => {
          return [
            ...row,
            generationColumn(rowIndex, row.length)
          ]
        })
      )
    }
  }

  const onRemoveColumn = () => {
    if ( columns > 1 ) {
      setMatrix(
        matrix.map((row) => {
          return [
            ...row.slice(0, row.length - 1)
          ]
        })
      )
    }
  }

  useEffect(() => {
    updateMatrix(generationDataTable(rows, columns));
    setX(minNumberNearest())
  }, [rows, columns]);

  return (
    <MatrixContext.Provider
      value={{
        matrix,
        rows,
        columns,
        setRows,
        setColumns,
        hover,
        setHover,
        updateCell,
        nearestAmount,
        setNearestAmount,
        nearests,
        getColumn,
        MAX_COLUMNS,
        MAX_ROWS,
        onAddRow,
        onRemoveRow,
        onAddColumn,
        onRemoveColumn,
        X,
        setX,
        setMatrix: updateMatrix,
      }}
    >
      {children}
    </MatrixContext.Provider>
  );
};
