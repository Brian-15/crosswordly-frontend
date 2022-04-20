import Card from "react-bootstrap/Card";

const Instructions = () => (
  <Card style={{ width: "30%" }}>
    <Card.Body>
      <Card.Title>How to Play</Card.Title>
      <Card.Text>
        In Crosswordly, each puzzle only contains a specific set of letters!<br/>
        Choose a "seed", which contains all the letters allowed in the puzzle, including duplicates.<br/>
        Seeds cannot be under 3 letters length.

        Example:
        "hello" seed can generate words such as "leo", "hole", and "ell".

        Optionally, you may limit the amount of words the puzzle is allowed to use.
      </Card.Text>
    </Card.Body>
  </Card>
);

export default Instructions;