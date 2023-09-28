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
  const [tecnology, setTecnology] = useState("Rest Api");
  const [token, setToken] = useState("");
  const [id, setId] = useState(1);
  const [apiCall, setApiCall] = useState("login");
  const [server, setServer] = useState("");
  const [serverUrl, setServerUrl] = useState("");
  const [backend, setBackend] = useState("php");
  const [endpoint, setEndpoint] = useState(
    "https://api-login-php.davidebalice.dev"
  );
  const [viewResult, setViewResult] = useState(false);
  const [viewDetail, setViewDetail] = useState(false);

  useEffect(() => {
    switch (apiCall) {
      case "login":
        setTecnology("Rest Api");
        setServerUrl("/api/login");
        break;
      case "products":
        setTecnology("Rest Api");
        setServerUrl("/api/products");
        break;
      case "product":
        setTecnology("Rest Api");
        setServerUrl("/api/product/" + id);
        break;
      case "loginGql":
        setTecnology("GraphQl");
        if (backend === "laravel") {
          setServerUrl("/graphql/public");
        }
        if (backend === "node") {
          setServerUrl("/graphql");
        }
        break;
      case "productsGql":
      case "productGql":
        setTecnology("GraphQl");
        setServerUrl("/graphql");
        break;
      default:
        break;
    }
  }, [backend, id, serverUrl, apiCall]);

  useEffect(() => {
    switch (backend) {
      case "php":
        setToken("");
        setEndpoint("https://api-login-php.davidebalice.dev");
        break;
      case "laravel":
        setToken("");
        setEndpoint("http://localhost:8000");
        break;
      case "node":
        setToken("");
        setEndpoint("http://localhost:8000");
        break;
      default:
        break;
    }
  }, [backend]);

  axios.defaults.baseURL = endpoint;

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

  const loginRequest = async (event) => {
    event.preventDefault();

    if (apiCall === "login") {
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
    } else if (apiCall === "loginGql") {
      try {
        let requestBody = "";

        if (backend === "laravel") {
          requestBody = {
            query: `
            mutation {
              login(username: "${username}", password: "${password}")
            }
          `,
            variables: {
              username: username,
              password: password,
            },
          };
        } else if (backend === "node") {
          requestBody = {
            query: `
            mutation {
              login(username: "${username}", password: "${password}")
              {
                status
                token
                server
              }
            }
          `,
            variables: {
              username: username,
              password: password,
            },
          };
        }

        const response = await axios.post(serverUrl, requestBody, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });

        let apiResponse = "";

        if (backend === "laravel") {
          const splitResponse = response.data.data.login.split("\r\n\r\n");
          apiResponse = JSON.parse(splitResponse[1]);
        } else if (backend === "node") {
          apiResponse = response.data.data.login;
        }

        setResponse(apiResponse);
        setViewResult(false);
        setViewDetail(false);

        if ("token" in apiResponse) {
          const token = apiResponse.token;
          const server = apiResponse.server;
          setToken(token);
          setServer(server);
        } else {
          setToken("");
          setServer("");
        }

        setError(null);
      } catch (error) {
        console.error("Errore nella richiesta Axios:", error);
        setError("Error during API request: " + error);
        setResponse(null);
      }
    }
  };

  const productsRequest = async (view) => {
    if (apiCall === "products") {
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
    } else if (apiCall === "productsGql") {
      try {
        let requestBody = "";

        if (backend === "laravel") {
          requestBody = {
            query: `
            query Products {
                products
            }
          `,
          };
        } else if (backend === "node") {
          requestBody = {
            query: `
            query Products {
              products {
                id
                name
                photo
                price
              }
            }
          `,
          };
        }

        const response = await axios.post("/graphql", requestBody, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        });

        let apiResponse = "";

        if (backend === "laravel") {
          apiResponse = response.data.data.products.map((productStr) =>
            JSON.parse(productStr)
          );
        } else if (backend === "node") {
          apiResponse = response.data.data.products;
        }

        setResponse(apiResponse);
        setViewResult(view);
        setViewDetail(false);
        setError(null);
      } catch (error) {
        setError("Error during API request: " + error);
        setResponse(null);
      }
    }
  };

  const productRequest = async (view) => {
    if (apiCall === "product") {
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
    } else if (apiCall === "productGql") {
      try {
        let requestBody = "";

        if (backend === "laravel") {
          requestBody = {
            query: `
            query Products {
              product(id:${id})
          }
          `,
          };
        } else if (backend === "node") {
          requestBody = {
            query: `
            query Product {
              product(id:${id}) {
              id
              name
              photo
              price
              description
            }
          }          
          `,
          };
        }

        const response = await axios.post("/graphql", requestBody, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        });

        let apiResponse;

        if (backend === "laravel") {
          apiResponse = JSON.parse(response.data.data.product);
        } else if (backend === "node") {
          apiResponse = response.data.data.product;
        }

        setResponse(apiResponse);
        setViewResult(false);
        setViewDetail(view);
        setError(null);
      } catch (error) {
        setError("Error during API request: " + error);
        setResponse(null);
      }
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
                <label className="label">
                  Call (<span className="tecnology">{tecnology})</span>
                </label>
                <Form.Select
                  custom
                  onChange={handleApiCall}
                  value={apiCall}
                  className="input"
                >
                  <optgroup label="Rest Api">
                    <option value="login">POST Login</option>
                    <option value="products">GET Products</option>
                    <option value="product">GET Product</option>
                  </optgroup>
                  <optgroup label="GraphQL">
                    <option value="loginGql">POST Login</option>
                    <option value="productsGql">POST Products</option>
                    <option value="productGql">POST Product</option>
                  </optgroup>
                </Form.Select>

                {apiCall === "product" ||
                  (apiCall === "productGql" && (
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
                  ))}
              </div>
            </div>

            {apiCall === "login" || apiCall === "loginGql" ? (
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

                  <Form onSubmit={loginRequest} className="mt-4">
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
            ) : apiCall === "products" || apiCall === "productsGql" ? (
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
            ) : apiCall === "product" || apiCall === "productGql" ? (
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
                      onClick={() => productRequest(false)}
                    >
                      <AiOutlineDatabase size={20} />
                      Make Api request
                    </Button>

                    <Button
                      className="buttonRequest mt-3"
                      onClick={() => productRequest(true)}
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
            <p className="titleColumn mb-3">Response</p>
            <div className="responseBottom">
              {server && (
                <>
                  <b>Backend server</b>: {server}
                  <br />
                </>
              )}
              {endpoint && (
                <>
                  <b>Endpoint</b>: {`${endpoint}${serverUrl}`}
                  <br />
                </>
              )}
              {token && (
                <>
                  <b>Token</b>: {token.substring(0, 70) + "..."}
                  <br />
                </>
              )}
            </div>
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
