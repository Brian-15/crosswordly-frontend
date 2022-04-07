import { useEffect, useState } from "react";
import DefinitionList from "./DefinitionList";
import { v4 as uuid } from "uuid";
import useCollapse from "react-collapsed";
import ScrollableList from "react-scrollable-list";
import "./WordList.css";

const WordList = ({ words }) => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  const [expandedDefs, setExpandedDefs] = useState(words.map(() => false));
  useEffect(() => {
    expandedDefs.push(false);
    setExpandedDefs(expandedDefs)
  }, [words, expandedDefs])
  const handleExpansion = idx => {
    return () => {
      expandedDefs[idx] = expandedDefs[idx] ? false : true;
      setExpandedDefs(expandedDefs);
    }
  };
  return <div className="WordList-collapsible">
    <div
      className="WordList-btn"
      {...getToggleProps()}
    >
      { "Definitions " + (isExpanded ? "<" : ">") }
    </div>
    {words.length
    ? <ScrollableList
        className="WordList"
        {...getCollapseProps()}
        listItems={words.map(({ word, definitions }, idx) => ({
          id: uuid(),
          content: <DefinitionList
            word={word}
            definitions={definitions}
            isExpanded={expandedDefs[idx]}
            updateHook={handleExpansion(idx)}
          />
        }))}
        maxItemsToRender={5}
      />
      : <p {...getCollapseProps()}>No words in word history</p>
    }
  </div>;
};

export default WordList;