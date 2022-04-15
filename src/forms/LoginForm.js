import axios from "axios";
import UserContext from "../user/UserContext";
import { useState, useContext } from "react";
import { Form, FloatingLabel, Button } from "react-bootstrap";
import { backendURL, SECRET_KEY } from "../config";
import { jwtVerify } from "jose";

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

  const handleSubmit = async evt => {
    evt.preventDefault();
    const { data } = await axios.post(process.env.NODE_ENV === "production"
      ? `${backendURL}/auth/token`
      : "http://localhost:3001/auth/token",
      { username: formData.username, password: formData.password });
    console.log(data);
    const { payload, protectedHeader } = await jwtVerify(data.token, SECRET_KEY);
    console.log({ payload, protectedHeader })
    setUser(payload.dataValues);
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
          name="username"
          value={formData.username}
          placeholder="Username"
          onChange={handleChange}
        />
      </FloatingLabel>
      <FloatingLabel
        label="Password"
        className="mb-3"
      >
        <Form.Control
          type="password"
          name="password"
          value={formData.password}
          placeholder="Password"
          onChange={handleChange}
        />
      </FloatingLabel>
      <Button className="mt-3" type="submit">Log In</Button>
    </Form>
  );
};

export default LoginForm;