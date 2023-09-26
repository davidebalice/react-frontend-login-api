import React, { useState, useEffect } from "react";
import { Container, Col, Row, Form, Button, Alert } from "react-bootstrap";
import ProductCard from "../components/Card/ProductCard";
import Detail from "../components/Card/Detail";
import Description from "../components/Home/Description";
import axios from "axios";
import { AiOutlineDatabase } from "react-icons/ai";
import { LuLayoutGrid } from "react-icons/lu";

axios.defaults.baseURL = "https://api-login-php.davidebalice.dev";
axios.defaults.headers.common["Content-Type"] = "application/json";

const Home = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("mariorossi");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [server, setServer] = useState("");
  const [id, setId] = useState(1);
  const [apiCall, setApiCall] = useState("login");
  const [backend, setBackend] = useState("php");
  const [endpoint, setEndpoint] = useState(
    "https://api-login-php.davidebalice.dev"
  );
  const [viewResult, setViewResult] = useState(false);
  const [viewDetail, setViewDetail] = useState(false);

  useEffect(() => {
    switch (backend) {
      case "php":
        setEndpoint("https://api-login-php.davidebalice.dev");
        break;
      case "laravel":
        setEndpoint("http://localhost:8000");
        break;
      case "node":
        setEndpoint("http://localhost:8000");
        break;
      default:
        break;
    }
  }, [backend]);

  axios.defaults.baseURL = endpoint;

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
        const server = apiResponse.data.server;
        setToken(token);
        setServer(server);
      } else {
        setToken("");
        setServer("");
      }

      setError(null);
    } catch (error) {
      setError("Error during API request: " + error);
      setResponse(null);
    }
  };

  const handleApiCall = async (event) => {
    event.preventDefault();
    const selectedValue = event.target.value;
    setApiCall(selectedValue);
  };

  const handleBackend = async (event) => {
    event.preventDefault();
    const selectedValue = event.target.value;
    setBackend(selectedValue);
  };

  const handleId = async (event) => {
    event.preventDefault();
    const selectedValue = event.target.value;
    setId(selectedValue);
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
      const response = await api.get(`/api/products/${id}`, {
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
    <>
      {" "}
      <Description />
      <Container className="mt-5">
        <Row className="pageRow">
          <Col md={5}>
            <p className="titleColumn">Request</p>

            <div className="box">
              <div className="p30 pt-1">
                <label className="label">Backend server</label>

                <Form.Select
                  custom
                  onChange={handleBackend}
                  value={backend}
                  className="input"
                >
                  <option value="php">PHP</option>
                  <option value="laravel">Laravel</option>
                  <option value="node">Node</option>
                </Form.Select>
              </div>
              <div className="line"></div>
              <div className="p30 pt-3">
                <label className="label">Api call</label>
                <Form.Select
                  custom
                  onChange={handleApiCall}
                  value={apiCall}
                  className="input"
                >
                  <option value="login">POST Login</option>
                  <option value="products">GET Products</option>
                  <option value="product">GET Product detail</option>
                </Form.Select>

                {apiCall === "product" && (
                  <Form.Select
                    custom
                    onChange={handleId}
                    value={id}
                    className="input2"
                  >
                    <option value="1">id: 1</option>
                    <option value="2">id: 2</option>
                    <option value="3">id: 3</option>
                    <option value="4">id: 4</option>
                  </Form.Select>
                )}
              </div>
            </div>

            {apiCall === "login" ? (
              <>
                <div className="box p30">
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
                      <label className="label">Username</label>
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
                      <label className="label">Password</label>
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
            ) : apiCall === "products" ? (
              <div>
                {token === "" ? (
                  <div className="mt-5">
                    <b>Login</b> to get the access <b>token</b>, then you can
                    make other API calls
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
            ) : apiCall === "product" ? (
              <div>
                {token === "" ? (
                  <div className="mt-5">
                    <b>Login</b> to get the access <b>token</b>, then you can
                    make other API calls
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
            {response ? (
              viewResult ? (
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
                <Alert className="responseContainer mb-0">
                  {JSON.stringify(response)}
                </Alert>
              )
            ) : (
              <div className="mb-5">
                <div className="tokenDescription">
                  <b>Login</b> to get the access <b>token</b>, then you can make
                  other API calls
                </div>
              </div>
            )}
            <div className="responseBottom">
              {server && (
                <>
                  <b>Backend server</b>: {server}
                  <br />
                </>
              )}
              {endpoint && (
                <>
                  <b>Endpoint</b>: {endpoint}
                  <br />
                </>
              )}
              {token && (
                <>
                  <b>Token</b>: {token}
                  <br />
                </>
              )}
            </div>
            {error && (
              <div className="mt-3">
                <Alert variant="danger">Error: {error}</Alert>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
