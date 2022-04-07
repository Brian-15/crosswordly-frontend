import Cell from "./Cell";
import { v4 as uuid } from "uuid";
import "./Board.css";

const Board = ({ rows, activeCells }) => {
  const width = `${50 * rows[0].length}px`;

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