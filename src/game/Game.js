import { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../user/UserContext";
import GameContext from "./GameContext";
import VictoryView from "./VictoryView";
import Board from "./Board";
import ScoreBoard from "./ScoreBoard";
import GuessForm from "../forms/GuessForm";
import WordList from "../words/WordList";
import { backendURL } from "../config";
import createLetterMap from "../helpers/createLetterMap";
import "./Game.css";

const Game = ({ word, maxWords }) => {
  const [gameData, setGameData] = useState(undefined);
  const [rootWord, setRootWord] = useState(word);
  const [wordsFound, setWordsFound] = useState({ numCrosswordsFound: 0 });
  const [guess, setGuess] = useState("");
  const [letterMap, setLetterMap] = useState(undefined);
  const [activeCells, setActiveCells] = useState(undefined);
  const [wordHistory, setWordHistory] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    function fetchWord() {
      axios.get(backendURL + "/words/random")
        .then(async result => {
          setRootWord(result.data);
          await fetchBoard(result.data);
        }
      );
    }

    async function fetchBoard(root) {
      const { data } = await axios.get(process.env.NODE_ENV === "production"
        ? backendURL + `/boards?letters=${root}`
        : `http://localhost:3001/boards?letters=${root}`);
      setGameData(data);
      setActiveCells(data.crossword.map(row => row.map(cell => {
        return cell ? false : null;
      })));
      setLetterMap(createLetterMap(root));
    }

    if (!rootWord) {
      fetchWord();
    }
    else fetchBoard(rootWord);
  }, [rootWord]);

  const handleGuess = async evt => {
    evt.preventDefault();
    setLetterMap(createLetterMap(rootWord));
    if (!guess.length || guess.length < 3 || wordsFound[guess]) {
      setGuess("");
      return;
    }
    try {
      const { data } = await axios.get(backendURL + `/words`, { params: { term: guess } });
      wordHistory.push(data);
      setWordHistory(wordHistory);
      // populate definitions for guessed words
      if (gameData.words[guess]) {
        setScore(score => score + 5);
        const { xi, xf, yi, yf } = gameData.words[guess];
        wordsFound.numCrosswordsFound++;
        setActiveCells(cells => cells.map((row, rowIdx) => {
          if (rowIdx < xi || xf < rowIdx) return row;
          return row.map((cell, colIdx) => {
            if (colIdx < yi || yf < colIdx) return cell;
            return true;
          });
        }));
      } else setScore(score => score + 1);
      wordsFound[guess] = true;
      setWordsFound(wordsFound);
    } catch (err) {
      console.log("invalid word, try again", err)
    } finally {
      setGuess("");
    }
  };
  return <>
    {gameData && activeCells ? 
      <>
        <WordList words={wordHistory} />
        <Board
          rows={gameData.crossword}
          words={gameData.words}
          activeCells={activeCells}
        />
        {wordsFound.numCrosswordsFound < gameData.numWords
          ? <>
              <ScoreBoard score={score} />
              <h2>{rootWord.split("").sort().map(letter => letter.toUpperCase() + " ")}</h2>
              <GuessForm
                letters={rootWord}
                handleGuess={handleGuess}
                guess={guess}
                setGuess={setGuess}
                letterMap={letterMap}
                setLetterMap={setLetterMap}
              />
            </>
          : <VictoryView score={score} />
        }
        
      </>
      :
      <h1>Loading...</h1>
    }
  </>
};

export default Game;