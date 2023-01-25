import { useContext } from "react";
import { MatrixContext } from "../../../context/matrixContext";

interface Props {
    sum: number
    row: number
}

export const CellSum = ( { sum, row } : Props) => {
    const { setHover } = useContext(MatrixContext);
    return <td onMouseEnter={() => setHover({ row, sum  })} onMouseLeave={() => setHover(undefined)} >{sum}</td>
}