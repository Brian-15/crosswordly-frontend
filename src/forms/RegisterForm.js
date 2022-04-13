import { useState } from "react";
import axios from "axios";
import { backendURL } from "../config";
import { Form, Row, Col, Button } from "react-bootstrap";
import "./Form.css";

const RegisterForm = ({ setUser }) => {
  const initialData = {
    username: "",
    displayName: "",
    password: "",
    confirmPwd: "",
  }
  const keys = Object.keys(initialData);
  const [formData, setFormData] = useState(initialData);

  const handleSubmit = async evt => {
    evt.preventDefault();
    if (!keys.every(key => formData[key] !== "")) return;
    if (formData.password !== formData.confirmPwd) return;
    
    // handle registration AJAX call here
    const { data } = await axios.post(process.env.NODE_ENV === "production"
      ? `${backendURL}/users`
      : "http://localhost:3001/users", formData);
    console.log(data);
    // TODO: add jwt validation here.
    setUser(data);
  };

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  return (
    <Form
      className="Form"
      onSubmit={handleSubmit}
      style={{ width: "30%" }}
    >
      <h2 className="text-center">Register</h2>
      <Form.Group>
        <Form.Label column htmlFor="username">
          Username
        </Form.Label>
        <input
          size="md"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <p className="text-muted">
          Only you will see this.
        </p>
      </Form.Group>
      <Form.Group>
        <Form.Label size="md" column sm={4} htmlFor="displayName">
          Display Name
        </Form.Label>
        <input
          size="md"
          type="text"
          name="displayName"
          value={formData.displayName}
          onChange={handleChange}
        />
        <p className="text-muted">
          Will be displayed on the high score table.
        </p>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="password">
          Password
        </Form.Label>
        <input
          size="md"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="confirmPwd">
          Confirm Password
        </Form.Label>
        <input
          size="md"
          type="password"
          name="confirmPwd"
          value={formData.confirmPwd}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <button type="submit">Register</button>
      </Form.Group>
    </Form>
  );
};

export default RegisterForm;