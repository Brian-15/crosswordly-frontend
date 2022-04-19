import { useState } from "react";
import axios from "axios";
import { backendURL } from "../config";
import { Form, FloatingLabel, Button, Row, Col } from "react-bootstrap";
import "./Form.css";

const RegisterForm = () => {
  const initialData = {
    username: "",
    displayName: "",
    password: "",
    confirmPwd: "",
  };
  const keys = Object.keys(initialData);
  const [formData, setFormData] = useState(initialData);

  const handleSubmit = async evt => {
    evt.preventDefault();
    if (!keys.every(key => formData[key] !== "")) return;
    if (formData.password !== formData.confirmPwd) return;
    
    // handle registration AJAX call here
    await axios.post(process.env.NODE_ENV === "production"
      ? `${backendURL}/users`
      : "http://localhost:3001/users", formData);
  };

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  return (
    <Form className="Form" onSubmit={handleSubmit}>
      <FloatingLabel label="Username">
        <Form.Control
          size="md"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          autoComplete="on"
        />
      </FloatingLabel>
      <p className="text-muted">
        Only you will see this.
      </p>
      <FloatingLabel label="Display Name">
        <Form.Control
          size="md"
          type="text"
          name="displayName"
          value={formData.displayName}
          onChange={handleChange}
          placeholder="Display Name"
        />
      </FloatingLabel>
      <p className="text-muted">
        Will be displayed on the high score table.
      </p>
      <Form.Group as={Row}>
        <Col>
          <FloatingLabel label="Password">
            <Form.Control
              size="md"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              autoComplete="on"
            />
          </FloatingLabel>
        </Col>
        <Col>
          <FloatingLabel column="true" label="Confirm Password">
            <Form.Control
              size="md"
              type="password"
              name="confirmPwd"
              value={formData.confirmPwd}
              onChange={handleChange}
              placeholder="Confirm Password"
              autoComplete="on"
            />
          </FloatingLabel>
        </Col>
      </Form.Group>
      <Button className="mt-3" type="submit">Register</Button>
    </Form>
  );
};

export default RegisterForm;