import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Game from "./game/Game";
import GameSetupForm from "./forms/GameSetupForm";
import UserView from "./user/UserView";
import { useState } from "react";
import UserContext from "./user/UserContext";

const App = () => {
  const initialFormData = {
    "maxWords": 5,
    "letters": "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [gameStart, setGameStart] = useState(false);
  const [user, setUser] = useState();

  return (
    <div className="App">
      <h1 className="App-title mb-3 mt-3">CROSSWORDLY</h1>
      <UserContext.Provider value={{user, setUser}}>
      {gameStart
      ? <Game word={formData.letters} maxWords={formData.maxWords} />
      : <>
          <GameSetupForm
            setGameStart={setGameStart}
            formData={formData}
            setFormData={setFormData}
          />
          <UserView user={user} />
        </>}
      </UserContext.Provider>
    </div>
  );
};

export default App;
