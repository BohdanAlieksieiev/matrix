export type CellId = number; // unique value for all table
export type CellValue = number; // three digit random number

export interface Cell {
  id: CellId,
  amount: CellValue
}

export interface Props {
    matrix: Cell[][]
}