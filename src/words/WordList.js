import { Nav } from "react-bootstrap";
import { v4 as uuid } from "uuid";

const WordList = ({ words }) => (
  <>
    { words.map((word, idx) => (
      <Nav.Item key={ uuid() }>
        <Nav.Link eventKey={`def-${idx}`}>{ word }</Nav.Link>
      </Nav.Item>
    )) }
  </>
);

export default WordList;