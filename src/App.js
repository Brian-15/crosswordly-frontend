import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Game from "./game/Game";
import UserView from "./user/UserView";
import GuestView from "./user/GuestView";
import { useState } from "react";
import UserContext from "./user/UserContext";
import GameContext from './game/GameContext';

const App = () => {
  const initialSetupFormData = {
    "maxWords": 5,
    "letters": "",
  };
  const [setupFormData, setSetupFormData] = useState(initialSetupFormData);
  const [gameStart, setGameStart] = useState(false);
  const [user, setUser] = useState();

  return (
    <div className="App">
      <h1 className="App-title mb-3 mt-3">CROSSWORDLY</h1>
      <UserContext.Provider value={{ user, setUser }}>
        <GameContext.Provider
          value={{
            gameStart,
            setGameStart,
            setupFormData,
            setSetupFormData
          }}
        >
          {gameStart
          ? <Game word={setupFormData.letters} maxWords={setupFormData.maxWords} />
          : user
            ? <UserView />
            : <GuestView />}
        </GameContext.Provider>
      </UserContext.Provider>
    </div>
  );
};

export default App;
