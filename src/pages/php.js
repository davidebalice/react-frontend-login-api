import React, { useState } from "react";
import { Container, Col, Row, Form, Button, Alert } from "react-bootstrap";
import data from "../data/data.json";
import axios from "axios";

const Php = () => {
  const selectedLink = data.api.find((link) => link.route === "/php");

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [select, setSelect] = useState("login");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const api = axios.create({
      baseURL: "https://api-login-php.davidebalice.dev",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });

    try {
      const requestBody = {
        username: username,
        password: password,
      };
      const response = await api.post("/api/login", requestBody);
      setResponse(response.data);

      if ("token" in response.data) {
        const token = response.data.token;
        setToken(token);
      } else {
        setToken("");
      }

      setError(null);
    } catch (error) {
      setError("Error during API request: " + error);
      setResponse(null);
    }
  };

  const handleSelect = async (event) => {
    event.preventDefault();
    const selectedValue = event.target.value;
    setSelect(selectedValue);
  };

  const productsRequest = async () => {
    const api = axios.create({
      baseURL: "https://api-login-php.davidebalice.dev",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    });

    try {
      const requestBody = {
        Authorization: `Bearer ${token}`,
      };
      const response = await api.get("/api/products", requestBody);
      setResponse(response.data);

      /*
      if ("token" in response.data) {
        const token = response.data.token;
        setToken(token);
      } else {
        setToken("");
      }
*/
      setError(null);
    } catch (error) {
      setError("Error during API request: " + error);
      setResponse(null);
    }
  };

  return (
    <Container className="mt-5">
      <div>{selectedLink.name}</div>
      <div className="mb-5">{selectedLink.description}</div>
      <div className="mb-5">
        <div className="tokenDescription">
          Login to get the access token, then you can make other API calls
        </div>
        <div className="token">
          {token === "" ? (
            <span>
              <b class="red">Token not present</b> - <b class="black">Login</b>
            </span>
          ) : (
            <b>{token}</b>
          )}
        </div>
      </div>
      <Row className="pageRow">
        <Col md={5}>
          <p className="font-weight-bold">Request</p>

          <Form.Select
            custom
            onChange={handleSelect}
            value={select}
            className="input"
          >
            <option value="login">POST Login</option>
            <option value="products">GET Products</option>
            <option value="product">GET Product detail</option>
          </Form.Select>

          {select === "login" ? (
            <>
              <div className="loginContainer">
                <b class="loginTitle">Login</b>
                <div className="demoData">
                  <b>demo data</b>:
                  <br />
                  mariorossi
                  <br />
                  12345678
                </div>

                <Form onSubmit={handleSubmit} className="mt-5">
                  <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      required
                      className="input mb-3"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      required
                      className="input mb-3"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="mt-3">
                    Login
                  </Button>
                </Form>
              </div>
            </>
          ) : select === "products" ? (
            <div>
              {token === "" ? (
                <>token not present - Login</>
              ) : (
                <>
                  <Button
                    variant="primary"
                    className="mt-3"
                    onClick={() => productsRequest()}
                  >
                    Make request
                  </Button>
                </>
              )}
            </div>
          ) : select === "product" ? (
            <div>Altri casi</div>
          ) : (
            <></>
          )}
        </Col>

        <Col md={6}>
          <p className="font-weight-bold mb-3">Response</p>{" "}
          {response && (
            <Alert className="responseContainer">
              API response: {JSON.stringify(response)}
            </Alert>
          )}
          {error && (
            <div className="mt-3">
              <Alert variant="danger">Error: {error}</Alert>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Php;
