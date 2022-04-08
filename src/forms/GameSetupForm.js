import { Form, Button, Row, Col } from "react-bootstrap";
import "./Form.css";

const GameSetupForm = ({ setGameStart, formData, setFormData }) => {
  
  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value.toLowerCase() }));
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (!formData.letters || formData.maxWords <= 0) return;
    setGameStart(true);
  };

  return (
    <Form
      className="Form"
      onSubmit={handleSubmit}
      autoComplete="off">
      <Form.Group as={Row}>
        <Form.Label size="lg" column sm={2} htmlFor="letters">
          Seed
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            size="lg"
            type="text"
            name="letters"
            value={formData.letters}
            onChange={handleChange}
            placeholder="Example: hello" />
          <Form.Text className="text-muted">
            Words will only contain letters from the seed.
          </Form.Text>
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={2} htmlFor="maxWords">
          Word Limit
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            size="lg"
            type="number"
            name="maxWords"
            min="1"
            max="20"
            value={formData.maxWords}
            onChange={handleChange}/>
          <Form.Text className="text-muted">
            Maximum number of words allowed for crossword.
          </Form.Text>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 10, offset: 2 }}>
          <Button variant="primary" type="submit">Start</Button>
        </Col>
      </Form.Group>
    </Form>);

  // return (
  //   <form
  //     className="Form"
  //     onSubmit={handleSubmit}
  //     autoComplete="off">
  //     <div className="Form-field">
  //       <label className="Form-label" htmlFor="letters">
  //         Seed:
  //       </label>
  //       <input className="Form-input"
  //         type="text"
  //         name="letters"
  //         value={formData.letters}
  //         onChange={handleChange}/>
  //     </div>
  //     <div className="Form-field">
  //       <label className="Form-label" htmlFor="maxWords">
  //         Number of Words:
  //       </label>
  //       <input className="Form-input"
  //         type="number"
  //         name="maxWords"
  //         min="1"
  //         max="20"
  //         value={formData.maxWords}
  //         onChange={handleChange}/>
  //     </div>
  //     <Button className="Form-btn" type="submit">Start</Button>
  //   </form>);
};

export default GameSetupForm;