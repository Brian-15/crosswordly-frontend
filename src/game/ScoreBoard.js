import { useContext } from "react";
import Table from "react-bootstrap/Table";
import UserContext from "../user/UserContext";
import "./ScoreBoard.css";

const ScoreBoard = ({ score }) => {
  const { user } = useContext(UserContext);
  return (
    <Table className="ScoreBoard mt-5 mb-3" bordered size="sm">
      <thead>
        <tr>
          <th>Score</th>
          { user ? <th>High Score</th> : undefined }
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{ score }</td>
          { user ? <td>{ score > user.highScore ? score : user.highScore }</td> : undefined }
        </tr>
      </tbody>
    </Table>
  );
};

export default ScoreBoard;