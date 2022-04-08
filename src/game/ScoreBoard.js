import { useState } from "react";
import Table from "react-bootstrap/Table";
import "./ScoreBoard.css";

const ScoreBoard = ({ score, highScore=0 }) => {

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
          <td>{ score > highScore ? score : highScore }</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default ScoreBoard;