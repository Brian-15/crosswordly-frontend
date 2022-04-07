import { useState } from "react";
import useCollapse from "react-collapsed";
import { v4 as uuid } from "uuid";
import "./DefinitionList.css";

const DefinitionList = ({ isExpanded, updateHook, word, definitions }) => {
  const [hasExpanded, setExpanded] = useState(isExpanded);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded: hasExpanded });
  const handleClick = () => {
    updateHook();
    setExpanded(val => !val);
  }
  return <>
    <h3 className="DefinitionList-word" {...getToggleProps({ onClick: handleClick })}>
      { `${word} ${hasExpanded ? "<" : ">"}` }
    </h3>
    {definitions
      ? <ol {...getCollapseProps()}>
        {definitions.map(({ definition, category, example }) => 
          <li key={uuid()}>
            <i>{ category.name }</i><br/>
            <p>{ definition }</p>
            { example
              ? <p>Example:<br/><i> {example} </i></p>
              : undefined }
          </li>
        )}
    </ol>
    : <p {...getCollapseProps()}>
      Crosswordly did not find definitions for {word}.<br/>
      Find the definitions&nbsp;
      <a target="_blank" rel="noreferrer" href={`https://www.google.com/search?q=define+${word}`}>
        here
      </a>
        &nbsp;on Google.
    </p>}
  </>
  
};

export default DefinitionList;