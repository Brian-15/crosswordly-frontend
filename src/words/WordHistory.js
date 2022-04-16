import { Accordion, Tab, Nav, Col, Row } from "react-bootstrap";
import WordList from "./WordList";
import DefinitionList from "./DefinitionList";

const WordHistory = ({ words }) => {
  console.log(words);
  return (
  <Accordion defaultActiveKey="0">
    <Accordion.Item eventKey="0">
      <Accordion.Header>Word History</Accordion.Header>
      <Accordion.Body>
        {words.length ? <Tab.Container defaultActiveKey="def-0">
          <Row className="overflow-auto" style={{ height: "100%" }}>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <WordList words={words.map(({ word }) => word)} />
              </Nav>
            </Col>
            <Col>
              <Tab.Content>
                <DefinitionList definitions={words.map(({ definitions }) => definitions)} />
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
        : <p>No words have been guessed yet.</p>}
      </Accordion.Body>
    </Accordion.Item>
  </Accordion>
);}

export default WordHistory;