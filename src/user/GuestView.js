import { Tab, Row, Nav } from "react-bootstrap";
import GameSetupForm from "../forms/GameSetupForm";
import LoginForm from "../forms/LoginForm";
import RegisterForm from "../forms/RegisterForm";
import Instructions from "../game/Instructions";

const GuestView = () => (
  <Tab.Container defaultActiveKey="guest">
    <Row>
      <Nav variant="pills" className="mt-1 flex-row justify-content-center">
        <Nav.Item>
          <Nav.Link className="user-select-none" disabled>Play as:</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link role="button" className="user-select-none" eventKey="guest">Guest</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link role="button" className="user-select-none" eventKey="newUser">New User</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link role="button" className="user-select-none" eventKey="user">Returning User</Nav.Link>
        </Nav.Item>
      </Nav>
    </Row>
    <Row>
      <Tab.Content>
        <Tab.Pane eventKey="guest">
          <Instructions />
          <GameSetupForm />
        </Tab.Pane>
        <Tab.Pane eventKey="newUser">
          <RegisterForm />
        </Tab.Pane>
        <Tab.Pane eventKey="user">
          <LoginForm />
        </Tab.Pane>
      </Tab.Content>
    </Row>
  </Tab.Container>
);

export default GuestView;