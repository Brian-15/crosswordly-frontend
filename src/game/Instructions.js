import Card from "react-bootstrap/Card";

const Instructions = () => (
  <Card className="m-auto mt-3" style={{ width: "30%" }}>
    <Card.Body>
      <Card.Title>How to Play</Card.Title>
      <Card.Text style={{ textAlign: "justify" }}>
        Choose a "seed", which contains all the letters allowed in the puzzle, including duplicates.<br/><br/>
        Seeds must be at least 3 letters in length.<br/><br/>
        Optionally, you may limit the amount of words the puzzle is allowed to use.<br/><br/>
        <i>Example:</i><br/>
        "hello" seed can generate words such as "leo", "hole", and "ell".
      </Card.Text>
    </Card.Body>
  </Card>
);

export default Instructions;