import './App.css';
import Game from "./game/Game";
import GameSetupForm from "./forms/GameSetupForm";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

const App = () => {
  const initialFormData = {
    "maxWords": 5,
    "letters": "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [gameStart, setGameStart] = useState(false);

  return <div className="App">
    <h1 className="App-title">CROSSWORDLY</h1>
    {gameStart
      ? <Game word={formData.letters} maxWords={formData.maxWords} />
      : <>
          <GameSetupForm
            setGameStart={setGameStart}
            formData={formData}
            setFormData={setFormData}
          />
        </>
    } </div>;
  
  // return <Router>
  //   <div className="App">
  //     <Routes>
  //       <Route path="/" element={<Home />} />
  //       <Route path="/play" element={<Game word="likeable" />} />
  //       <Route path="*" element={}/>
  //     </Routes>
  //   </div>
  // </Router>;
};

export default App;
