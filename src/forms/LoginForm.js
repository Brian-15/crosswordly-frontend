import axios from "axios";
import UserContext from "../user/UserContext";
import { useState, useContext } from "react";
import { Form, FloatingLabel } from "react-bootstrap";
import { backendURL } from "../config";

const LoginForm = () => {
  const initialData = {
    username: "",
    password: ""
  };
  const [formData, setFormData] = useState(initialData);
  const { setUser } = useContext(UserContext);

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  };

  const handleSubmit = async () => {
    const { data } = await axios.post(process.env.NODE_ENV === "production"
      ? `${backendURL}/auth/token`
      : "http://localhost:3001/auth/token");
    console.log(data);
    // TODO: add jwt validation here
    setUser(data);
  };

  return (
    <Form className="Form" onSubmit={handleSubmit}>
      <h2>Log In</h2>
      <FloatingLabel
        label="Username"
        className="mb-3"
      >
        <Form.Control
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
      </FloatingLabel>
      <FloatingLabel
        label="Password"
        className="mb-3"
      >
        <Form.Control
          type="password"
          value={formData.password}
          placeholder="Password"
          onChange={handleChange}
        />
      </FloatingLabel>
    </Form>
  );
};

export default LoginForm;