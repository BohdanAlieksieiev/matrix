import { useState, createContext, useCallback, useEffect } from "react";
import { debounce } from "../helpers/debounce";
import { Cell } from "../components/matrix/props";

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
  setMatrix: (data: Cell[][]) => {},
  setRows: (rows: number) => {},
  setColumns: (columns: number) => {},
  setHover: (value: Hover | undefined) => {},
  updateCell: (row: number, cell: number, amount: number) => {},
  setNearestAmount: (nearest: number | undefined) => {},
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
  setMatrix: (data: Cell[][]) => void;
  setRows: (rows: number) => void;
  setColumns: (columns: number) => void;
  setHover: (value: Hover | undefined) => void;
  updateCell: (row: number, cell: number, amount: number) => void;
  setNearestAmount: (nearest: number | undefined) => void;
}

export const MatrixContext = createContext<MatrixState>(INIT_STATE);

export const generationDataTable = (rows: number, columns: number) => {
  const emptyMatrix = new Array(rows).fill(new Array(columns).fill(0));
  return emptyMatrix.map((row, indexRow) =>
    row.map((_: number, indexCell: number) => {
      const maxNumberForAmount = Math.ceil(Math.sqrt(rows * columns)); // (Math.ceil(Math.random() * 10 ) % 2 === 2) ? rows : columns
      const amount = Math.ceil(Math.random() * maxNumberForAmount);
      return {
        id: Date.now() + Math.ceil(Math.random() * 999999),
        amount: amount,
      };
    })
  );
};

export const AuthContextProvider = ({ children }: Props) => {
  const [rows, setRows] = useState<number>(INIT_STATE.rows);
  const [columns, setColumns] = useState<number>(INIT_STATE.columns);
  const [hover, setHover] = useState<Hover | undefined>();
  const [nearestAmount, setNearestAmount] = useState<number | undefined>(0);
  const [nearests, setNearests] = useState<Cell[]>([])
  const [matrix, setMatrix] = useState<Cell[][]>(
    generationDataTable(rows, columns)
  );
  // console.log(matrix)

  useEffect(() => {
    findNearestAmount();
  }, [nearestAmount]);

  const minNumberNearest = () => {
    return matrix.length < matrix[0].length ? matrix.length : matrix[0].length // in exampe it is X
  }

  const findNearestAmount = () => {
    if (nearestAmount) {
      const countNearest = [];
      if (minNumberNearest() > 0) {
        const sortFlatMatrix = matrix.flat().sort((a, b) => {
          return (
            Math.abs(nearestAmount - a.amount) -
            Math.abs(nearestAmount - b.amount)
          );
        });
        sortFlatMatrix.splice(0, 1)
        for (; countNearest.length !== minNumberNearest(); ) {
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

  const updateCell = (row: number, cell: number, amount: number) => {
    setMatrix([
      ...matrix.slice(0, row),
      [
        ...matrix[row].slice(0, cell),
        {
          ...matrix[row][cell],
          amount,
        },
        ...matrix[row].slice(cell + 1, matrix[row].length),
      ],
      ...matrix.slice(row + 1, matrix.length),
    ]);
  };

  useEffect(() => {
    updateMatrix(generationDataTable(rows, columns));
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
        setMatrix: updateMatrix,
      }}
    >
      {children}
    </MatrixContext.Provider>
  );
};
