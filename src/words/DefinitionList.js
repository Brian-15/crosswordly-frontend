// import { useState, useEffect } from "react";
// import useCollapse from "react-collapsed";
import { Tab, ListGroup } from "react-bootstrap";
import { v4 as uuid } from "uuid";
import "./DefinitionList.css";

const DefinitionList = ({ definitions }) => (
  <>
    { definitions.map((meanings, idx) => (
      <Tab.Pane key={ uuid() } eventKey={idx}>
        {meanings
          ? <ListGroup as="ol" variant="flush" numbered>
            { meanings.map(({ category, definition, example }) => (
              <ListGroup.Item key={uuid()} as="li">
                <b>{category.name}</b>
                <p>{definition}</p>
                {example
                ? <p>Example:<br/>
                    <i>{example}</i>
                  </p>
                : undefined}
              </ListGroup.Item>))}
            </ListGroup>
          : <p>No definitions found</p>
        }
        
      </Tab.Pane>
    ))}
  </>
);

export default DefinitionList;