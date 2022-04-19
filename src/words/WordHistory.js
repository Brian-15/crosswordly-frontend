import { Tab, Nav, Col, Row } from "react-bootstrap";
import WordList from "./WordList";
import DefinitionList from "./DefinitionList";

const WordHistory = ({ words }) => (
  <>
    <h3>Word History</h3>
    {words.length ?
    <Tab.Container defaultActiveKey="0">
      <Row style={{ height: "100%" }}>
        <Col style={{ overflowX: "auto" }} sm={3}>
          <Nav variant="pills" className="d-flex justify-content-end flex-column-reverse" style={{ height: "50vh" }}>
            <WordList words={words.map(({ word }) => word)} />
          </Nav>
        </Col>
        <Col className="overflow-auto" >
          <Tab.Content style={{ height: "50vh" }}>
            <DefinitionList definitions={words.map(({ definitions }) => definitions)} />
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
    : <p>No words have been guessed yet.</p>}
  </>
);

export default WordHistory;