import React, { useState } from "react";
import { Container, Col, Row, Form, Button, Alert } from "react-bootstrap";
import ProductCard from "../components/Card/ProductCard";
import Detail from "../components/Card/Detail";
import data from "../data/data.json";
import axios from "axios";
import { AiOutlineDatabase } from "react-icons/ai";
import { LuLayoutGrid } from "react-icons/lu";

axios.defaults.baseURL = "https://api-login-php.davidebalice.dev";
axios.defaults.headers.common["Content-Type"] = "application/json";

const Github = () => {
  const selectedLink = data.api.find((link) => link.route === "/api");

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("mariorossi");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [select, setSelect] = useState("login");
  const [viewResult, setViewResult] = useState(false);
  const [viewDetail, setViewDetail] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const api = axios.create({
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
      const apiResponse = await api.post("/api/login", requestBody);
      setResponse(apiResponse.data);
      setViewResult(false);
      setViewDetail(false);

      if ("token" in apiResponse.data) {
        const token = apiResponse.data.token;
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

  const productsRequest = async (view) => {
    const api = axios.create({
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    });

    try {
      const response = await api.get("/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResponse(response.data);
      setViewResult(view);
      setViewDetail(false);
      setError(null);
    } catch (error) {
      setError("Error during API request: " + error);
      setResponse(null);
    }
  };

  const detailRequest = async (view) => {
    const api = axios.create({
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    });

    try {
      const response = await api.get("/api/products/1", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResponse(response.data);
      setViewResult(false);
      setViewDetail(view);
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
          <b>Login</b> to get the access <b>token</b>, then you can make other
          API calls
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
          <p className="titleColumn">Request</p>

          <div className="box">
            <div className="boxHeader">
              <b class="loginTitle">Api call</b>
            </div>

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
          </div>

          {select === "login" ? (
            <>
              <div className="box">
                <div className="boxHeader">
                  <b class="loginTitle">Login</b>
                  {token && <b class="loginSuccess">Login successfully</b>}
                </div>

                <div className="demoData">
                  <b>demo data</b>:
                  <br />
                  mariorossi
                  <br />
                  12345678
                </div>

                <Form onSubmit={handleSubmit} className="mt-4">
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
                <div className="mt-5">
                  <b>Login</b> to get the access <b>token</b>, then you can make
                  other API calls
                </div>
              ) : (
                <div className="buttonRequestContainer">
                  <Button
                    className="buttonRequest mt-3"
                    onClick={() => productsRequest(false)}
                  >
                    <AiOutlineDatabase size={20} />
                    Make Api request
                  </Button>

                  <Button
                    className="buttonRequest mt-3"
                    onClick={() => productsRequest(true)}
                  >
                    <LuLayoutGrid size={18} />
                    View formatted result
                  </Button>
                </div>
              )}
            </div>
          ) : select === "product" ? (
            <div>
              {token === "" ? (
                <div className="mt-5">
                  <b>Login</b> to get the access <b>token</b>, then you can make
                  other API calls
                </div>
              ) : (
                <div className="buttonRequestContainer">
                  <Button
                    className="buttonRequest mt-3"
                    onClick={() => detailRequest(false)}
                  >
                    <AiOutlineDatabase size={20} />
                    Make Api request
                  </Button>

                  <Button
                    className="buttonRequest mt-3"
                    onClick={() => detailRequest(true)}
                  >
                    <LuLayoutGrid size={18} />
                    View formatted result
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <></>
          )}
        </Col>

        <Col md={6}>
          <p className="titleColumn mb-3">Response</p>{" "}
          {response &&
            (viewResult ? (
              <div className="productsCardContainer">
                {response.map((item) => (
                  <ProductCard
                    key={item.name}
                    name={item.name}
                    photo={item.photo}
                    price={item.price}
                  />
                ))}
              </div>
            ) : viewDetail ? (
              <Detail
                key={response.id}
                name={response.name}
                photo={response.photo}
                description={response.description}
                price={response.price}
              />
            ) : (
              <Alert className="responseContainer">
                {JSON.stringify(response)}
              </Alert>
            ))}
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

export default Github;
