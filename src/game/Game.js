import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Row, Col, Button } from "react-bootstrap";
import VictoryView from "./VictoryView";
import Board from "./Board";
import ScoreBoard from "./ScoreBoard";
import GuessForm from "../forms/GuessForm";
import WordHistory from "../words/WordHistory";
import { backendURL, randomWordsAPI } from "../config";
import createLetterMap from "../helpers/createLetterMap";
import GameContext from "./GameContext";

const Game = ({ word, maxWords }) => {
  const [gameData, setGameData] = useState(undefined);
  const [rootWord, setRootWord] = useState(word);
  const [wordsFound, setWordsFound] = useState({ numCrosswordsFound: 0 });
  const [guess, setGuess] = useState("");
  const [letterMap, setLetterMap] = useState(undefined);
  const [activeCells, setActiveCells] = useState(undefined);
  const [wordHistory, setWordHistory] = useState([]);
  const [score, setScore] = useState(0);
  const { setGameStart } = useContext(GameContext);

  useEffect(() => {
    function fetchWord() {
      axios.get(randomWordsAPI)
        .then(async result => {
          setRootWord(result.data);
          await fetchBoard(result.data);
        }
      );
    }

    async function fetchBoard(root) {
      const { data } = await axios.get(backendURL + `/boards?letters=${root}&maxWords=${maxWords}`);
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

  const handleQuit = () => setGameStart(false);

  return <>
    {gameData && activeCells ? 
      <Row style={{ height: "100%" }}>
        <Col>
          <WordHistory words={wordHistory} />
        </Col>
        <Col className="d-flex flex-column justify-content-around">
          <Board
            rows={gameData.crossword}
            words={gameData.words}
            activeCells={activeCells}
          />
          <Button variant="danger" onClick={handleQuit}>Quit</Button>
        </Col>
        <Col>
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
        </Col>
      </Row>
      :
      <h1>Loading...</h1>
    }
  </>
};

export default Game;