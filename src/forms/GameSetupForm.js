import { Form, Button, Row, Col } from "react-bootstrap";
import { useContext } from "react";
import GameContext from "../game/GameContext";
import "./Form.css";

const GameSetupForm = () => {
  const {
    setGameStart,
    setupFormData,
    setSetupFormData
  } = useContext(GameContext);
  
  const handleChange = evt => {
    const { name, value } = evt.target;
    setSetupFormData(data => ({ ...data, [name]: value.toLowerCase() }));
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (setupFormData.letters.length < 3 || setupFormData.maxWords <= 0) return;
    setGameStart(true);
  };

  return (
    <Form
      className="Form"
      onSubmit={handleSubmit}
      autoComplete="off">
      <Form.Group as={Row}>
        <Form.Label size="lg" column="true" sm={2} htmlFor="letters">
          Seed
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            size="lg"
            type="text"
            name="letters"
            value={setupFormData.letters}
            onChange={handleChange}
            placeholder="Example: hello" />
          <Form.Text className="text-muted">
            Words will only contain letters from the seed.
          </Form.Text>
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column="true" sm={2} htmlFor="maxWords">
          Word Limit
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            size="lg"
            type="number"
            name="maxWords"
            min="1"
            max="20"
            value={setupFormData.maxWords}
            onChange={handleChange}/>
          <Form.Text className="text-muted">
            Maximum number of words allowed for crossword.
          </Form.Text>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Col className="mt-3 d-flex justify-content-center">
          <Button variant="primary" type="submit">Start</Button>
        </Col>
      </Form.Group>
    </Form>);
};

export default GameSetupForm;