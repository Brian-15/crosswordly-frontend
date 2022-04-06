import DefinitionList from "./DefinitionList";
import { backendURL } from "../config";
import { v4 as uuid } from "uuid";

const WordList = ({ words }) => {
  
  return <ul>
    {words.map(({ word, definitions }) => {
      return <li key={uuid()}>
        <h3>{word}</h3>
        <DefinitionList definitions={definitions} />
      </li>;
    })}
  </ul>
};

export default WordList;