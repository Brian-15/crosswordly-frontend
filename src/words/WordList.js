import { Nav } from "react-bootstrap";
import { v4 as uuid } from "uuid";
import "./WordList.css";

const WordList = ({ words }) => (
  <>
    { words.map((word, idx) => (
      <Nav.Item key={ uuid() }>
        <Nav.Link className="WordList-btn" eventKey={idx}>{ word }</Nav.Link>
      </Nav.Item>
    )) }
  </>
);

export default WordList;