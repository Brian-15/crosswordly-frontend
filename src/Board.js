import { useState } from "react";
import Cell from "./Cell";
import { v4 as uuid } from "uuid";
import "./Board.css";

const Board = ({ rows, words }) => {
  console.log(rows, words)
  const [activeCells, setActiveCells] = useState(
    rows.map(row => row.map(cell => {
      return cell ? false : null;
    }))
  );
  const width = `${100 * rows[0].length}px`;

  return <table className="Board" style={{ width }}>
    <tbody>
    {rows.map((row, rowIdx) =>
      <tr
        key={uuid()}
        className="Board-row"
        style={{ width }}
      >
        {row.map((letter, colIdx) =>
          <Cell
            key={uuid()}
            isActive={activeCells[rowIdx][colIdx]}
            letter={letter}
          />
        )}
      </tr>
    )}
    </tbody>
  </table>
};

export default Board;