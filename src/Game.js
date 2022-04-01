import { useState, useEffect } from "react";
import axios from "axios";
import Board from "./Board";
import GuessForm from "./forms/GuessForm";
import { backendURL } from "./config";
import createLetterMap from "./helpers/createLetterMap";

const Game = ({ word }) => {
  const [gameData, setGameData] = useState(undefined);
  const [rootWord, setRootWord] = useState(word);
  const [wordsFound, setWordsFound] = useState({ numCrosswordsFound: 0 });
  const [guess, setGuess] = useState("");
  const [letterMap, setLetterMap] = useState(undefined);
  const [activeCells, setActiveCells] = useState(undefined);

  useEffect(() => {
    function fetchWord() {
      axios.get(backendURL + "/words/random")
        .then(async result => {
          setRootWord(result.data);
          await fetchBoard(result.data);
        });
    }

    async function fetchBoard(root) {
      const { data } = await axios.get(backendURL + `/boards/${root}`);
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
    console.log(gameData.words);
    if (!guess.length || guess.length < 3 || wordsFound[guess]) {
      setGuess("");
      return;
    }
    try {
      const { data } = await axios.get(backendURL + `/words`, { params: { term: guess } });
      if (gameData.words[guess]) {
        const { xi, xf, yi, yf } = gameData.words[guess];
        wordsFound[guess] = data.definitions;
        wordsFound.numCrosswordsFound++;
        setWordsFound(wordsFound);
        setActiveCells(cells => cells.map((row, rowIdx) => {
          if (rowIdx < xi || xf < rowIdx) return row;
          return row.map((cell, colIdx) => {
            if (colIdx < yi || yf < colIdx) return cell;
            return true;
          });
        }));
      } else {
        setWordsFound(wordsFoundData => ({
          ...wordsFoundData,
          [guess]: data.definitions
        }));
      }
    } catch (err) {
      console.log("invalid word, try again", err)
      return;
    } finally {
      setGuess("");
    }
  };
  // if (gameData) console.log(gameData.crossword);
  return <>
    {gameData && activeCells ? 
      <>
        <Board
          rows={gameData.crossword}
          words={gameData.words}
          activeCells={activeCells}
        />
        <h2>{rootWord.split("").sort().map(letter => letter + " ")}</h2>
        <GuessForm
          letters={rootWord}
          handleGuess={handleGuess}
          guess={guess}
          setGuess={setGuess}
          letterMap={letterMap}
          setLetterMap={setLetterMap}
        />
      </>
      :
      <h1>Loading...</h1>
    }
  </>
};

export default Game;