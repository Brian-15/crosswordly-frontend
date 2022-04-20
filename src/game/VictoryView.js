import Button from "react-bootstrap/Button";
import { useEffect, useContext } from "react";
import GameContext from "./GameContext";
import UserContext from "../user/UserContext";
import axios from "axios";
import { backendURL } from "../config";

const VictoryView = ({ score }) => {
  const { setGameStart } = useContext(GameContext);
  const { user, setUser } = useContext(UserContext);
  const handleClick = () => setGameStart(false);

  const achievedHighScore = user && user.highScore < score;
  
  useEffect(() => {
    async function patchHighScore(highScore) {
      const { data } = await axios
        .patch(`${backendURL}/users/${user.id}`,
        { highScore });
      
      user.highScore = data.highScore;
      setUser(user);
    }

    if (achievedHighScore) patchHighScore(score);
  });

  return (
    <>
      <h2>Victory!</h2>
      <p>You scored: {score} points.</p>
      {achievedHighScore ?
      <p><b>New High Score!</b></p> : undefined}
      <Button variant="success" onClick={handleClick}>Replay</Button>
    </>
  );
};

export default VictoryView;