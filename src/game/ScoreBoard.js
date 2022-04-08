import { useState } from "react";
import Table from "react-bootstrap/Table";
import "./ScoreBoard.css";

const ScoreBoard = ({}) => {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  return (
    <Table className="ScoreBoard mt-5 mb-3" bordered size="sm">
      <thead>
        <tr>
          <th>Score</th>
          <th>High Score</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{ score }</td>
          <td>{ highScore }</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default ScoreBoard;