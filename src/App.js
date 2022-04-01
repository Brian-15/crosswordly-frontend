import './App.css';
import Game from "./Game";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <Game word="likeable" />
    </div>
  );
};

export default App;
