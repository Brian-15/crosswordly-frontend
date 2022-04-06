import { useState } from "react";
import DefinitionList from "./DefinitionList";
import { v4 as uuid } from "uuid";
import "./WordList.css";

const WordList = ({ words }) => {
  const [isShowing, setIsShowing] = useState(false);
  const handleClick = () => isShowing ? setIsShowing(false) : setIsShowing(true);
  return <>
    <button className="WordList-btn" onClick={handleClick}>{ isShowing ? "<" : ">" }</button>
    {words.length
    ? <ul className={`WordList ${isShowing ? "show" : "hide"}`}>
        {words.map(({ word, definitions }) => {
          return definitions
            ? <li key={uuid()}>
                <h3>{word}</h3>
                <DefinitionList definitions={definitions} />
              </li>
            : <p>
                Crosswordly did not find definitions for {word}.<br/>
                Find the definition
                <a href={`https://www.google.com/search?q=define+${word}`}>
                  here
                </a>
                on Google.
              </p>;
        })}</ul>
      : <p>No words in word history</p>}
  </>;
};

export default WordList;